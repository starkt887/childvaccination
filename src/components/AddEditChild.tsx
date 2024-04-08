import { IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonList, IonModal, IonSelect, IonSelectOption, IonTitle, IonToolbar, isPlatform } from '@ionic/react'
import { OverlayEventDetail } from '@ionic/react/dist/types/components/react-component-lib/interfaces';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { formatDate, formatTOISO } from '../utlils/dateFormater';
import { useChildService } from '../services/childService';
import { IChildModal } from '../modals/childModal';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { resetToast, showToast } from '../features/toast/toastSlice';
import { getMyChildrenAT, setCurrentChild } from '../features/children/childrenSlice';
import { IVaccinModal } from '../modals/vaccineModal';
import { addCircle as editIcon } from 'ionicons/icons'
import { Camera, CameraResultType } from '@capacitor/camera';
import { loadDone, loadPending } from '../features/loader/loaderSlice';

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
    const [selectedImage, setSelectedImage] = useState<string>("")
    const inputRef = useRef<HTMLInputElement>(null)



    async function submit() {
        let childData: IChildModal = {
            name,
            dob: formatDate(dob),
            gender,
            hospital,
            location,
            parentId: uid
        }
        dispatch(loadPending())
        if (childDetails) {
            console.log('editing done:', childDetails)
            let status = await Promise.resolve(updateChild(childData, selectedImage, childDetails.id!))
            postAddUpdateChild(status, "update")
            return;
        }
        console.log('Added new child')
        let status = await Promise.resolve(addNewChild(childData, selectedImage, vaccineList))
        postAddUpdateChild(status, "add")
    }

    const postAddUpdateChild = (status: boolean, operation: string) => {
        if (status) {
            dispatch(loadDone())
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

    const fillData = () => {
        if (childDetails) {
            setName(childDetails.name)
            setDob(formatTOISO(childDetails.dob))
            setGender(childDetails.gender)
            setHospital(childDetails.hospital)
            setLocation(childDetails.location)
            setSelectedImage(childDetails.profilepic ? childDetails.profilepic : "https://ionicframework.com/docs/img/demos/thumbnail.svg")
        }
        else {
            setSelectedImage("https://ionicframework.com/docs/img/demos/thumbnail.svg")
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

    const selectFile = async () => {
        if (isPlatform('capacitor')) //android & ios
        {
            try {
                const photo = await Camera.getPhoto({
                    resultType: CameraResultType.Uri,
                    quality: 70,
                })
                setSelectedImage(photo.webPath!)
                console.log("Camera photo:", photo.webPath)
            } catch (error) {
                console.log("Error:", error)
            }
        }
        else
            inputRef.current!.click()
    }
    const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            console.log(e.target.files[0]);
            if (selectedImage) {
                URL.revokeObjectURL(selectedImage)
            }
            let fileUrl = URL.createObjectURL(e.target.files[0])
            setSelectedImage(fileUrl)
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
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{
                        width: "100px",
                        height: "100px",
                        borderRadius: "20px",
                        cursor: "pointer",
                        objectFit: "cover"
                    }}
                        src={selectedImage}
                        onClick={(e) => selectFile()}
                    />
                    <IonIcon style={{
                        position: "absolute",
                        top: "90px",
                        right: "35%",
                        background: "#e9f7ca",
                        padding: "5px",
                        borderRadius: " 50px",
                        boxShadow: "0px 0px 10px #000000, 0 0 10px #ffffff"
                    }} icon={editIcon} color="tertiary" />
                    <input ref={inputRef} type='file' onChange={(e) => onFileChange(e)} hidden />
                </div>
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