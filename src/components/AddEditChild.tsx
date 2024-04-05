import { IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import React, { useEffect, useRef, useState } from 'react'
import { formatDate, formatTOISO } from '../utlils/dateFormater';
import { useChildService } from '../services/childService';
import { IChildModal } from '../modals/childModal';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetToast, showToast } from '../features/toast/toastSlice';
import { getMyChildrenAT, setCurrentChild } from '../features/children/childrenSlice';
import { IVaccinModal } from '../modals/vaccineModal';

type Props = {
    childDetails?: IChildModal
    isModalOpen: boolean
    setIsModalOpen(isOpen: boolean): void
}

const AddEditChild = ({ childDetails, isModalOpen, setIsModalOpen }: Props) => {

    // const modal = useRef<HTMLIonModalElement>(null);
    // const input = useRef<HTMLIonInputElement>(null);
    const { addNewChild, updateChild } = useChildService()
    const uid = useAppSelector<string>(state => state.userReducer.userInfo.uid)
    const vaccineList = useAppSelector<IVaccinModal[][]>(state => state.vaccineReducer.vaccineList)
    const dispatch = useAppDispatch()
    const [name, setName] = useState<string>("")
    const [dob, setDob] = useState<string>(new Date().toISOString())
    const [gender, setGender] = useState<string>("")
    const [hospital, setHospital] = useState<string>("")
    const [location, setLocation] = useState<string>("")




    async function submit() {
        let childData: IChildModal = {
            name,
            dob: formatDate(dob),
            gender,
            hospital,
            location,
            parentId: uid
        }
        if (childDetails) {
            console.log('editing done:', childDetails)
            let status = await Promise.resolve(updateChild(childData, childDetails.id!))
            postAddUpdateChild(status, "update")
            return;
        }
        console.log('Added new child')
        let status = await Promise.resolve(addNewChild(childData, vaccineList))
        postAddUpdateChild(status, "add")
    }

    const postAddUpdateChild = (status: boolean, operation: string) => {
        if (status) {
            console.log(`Child ${operation} Success`)
            dispatch(showToast({ msg: `Child ${operation} Success`, color: "success" }))
            dispatch(getMyChildrenAT(uid)).unwrap().then((res) => {
                if (childDetails)
                    dispatch(setCurrentChild(childDetails?.id!))
            }) //refresh children state and set current child
            resetData()
            setIsModalOpen(false)
            return
        }
        dispatch(showToast({ msg: `Child ${operation} Failure!`, color: "danger" }))
    }


    // function onWillDismiss(ev: CustomEvent<OverlayEventDetail>) {
    //     if (ev.detail.role === 'confirm') {
    //         setMessage(`Hello, ${ev.detail.data}!`);
    //     }
    // }
    const fillData = () => {
        if (childDetails) {
            setName(childDetails.name)
            setDob(formatTOISO(childDetails.dob))
            setGender(childDetails.gender)
            setHospital(childDetails.hospital)
            setLocation(childDetails.location)
        }
    }
    const resetData = () => {
        if (childDetails) {
            setName("")
            setDob(new Date().toDateString())
            setGender("")
            setHospital("")
            setLocation("")
        }
    }


    return (
        <IonModal isOpen={isModalOpen} onDidPresent={fillData}>
            <IonHeader>
                <IonToolbar>

                    <IonTitle >Child Details</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
                    </IonButtons>
                    {/* <IonButtons slot="end">
                        <IonButton strong={true} onClick={() => confirm()}>
                            Confirm
                        </IonButton>
                    </IonButtons> */}
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonList lines="inset">
                    <IonItem>
                        <IonInput
                            label="Enter child name"
                            labelPlacement="floating"
                            type="text"
                            placeholder="Child name"
                            value={name}
                            onIonChange={(e) => setName(e.detail.value!)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel>
                            Select DOB
                        </IonLabel>
                        <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
                        <IonModal keepContentsMounted={true}>
                            <IonDatetime
                                value={dob}
                                onIonChange={(e) => {

                                    setDob(e.detail.value?.toString()!)
                                }} id="datetime"
                                presentation='date'
                                preferWheel
                                showDefaultButtons />
                        </IonModal>
                    </IonItem>
                    <IonItem>
                        <IonSelect
                            label="Gender"
                            placeholder="Select Gender"
                            value={gender}
                            onIonChange={(e) => setGender(e.detail.value)}>
                            <IonSelectOption value="male">Male</IonSelectOption>
                            <IonSelectOption value="female">Female</IonSelectOption>
                        </IonSelect>
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Enter hospital"
                            labelPlacement="floating"
                            type="text"
                            placeholder="Hospital name"
                            value={hospital}
                            onIonChange={(e) => setHospital(e.detail.value!)}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput
                            label="Enter location"
                            labelPlacement="floating"
                            type="text"
                            placeholder="Location name"
                            value={location}
                            onIonChange={(e) => setLocation(e.detail.value!)}
                        />
                    </IonItem>
                </IonList>
                <IonButton expand="block" onClick={submit}>
                    Submit
                </IonButton>
            </IonContent>
        </IonModal>
    )
}

export default AddEditChild