import { IonAvatar, IonButton, IonCol, IonContent, IonGrid, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonList, IonRow, IonTextarea, IonThumbnail, isPlatform } from '@ionic/react'
import React, { ChangeEvent, useRef, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useUserService } from '../services/userService'
import { getUserProfile, userInformation } from '../features/auth/authSlice'
import { showToast } from '../features/toast/toastSlice'
import { addCircle as editIcon } from 'ionicons/icons'
import { Camera, CameraResultType } from '@capacitor/camera'
import { loadDone, loadPending } from '../features/loader/loaderSlice'



const MyProfile = () => {

    const userInfo = useAppSelector(state => state.userReducer.userInfo)
    const dispatch = useAppDispatch()
    const { updateProfile } = useUserService()
    const inputRef = useRef<HTMLInputElement>(null)

    const [name, setName] = useState<string>(userInfo.name)
    const [email, setEmail] = useState<string>(userInfo.email)
    const [mobile, setMobile] = useState<string>(userInfo.mobile!)
    const [address, setAddress] = useState<string>(userInfo.address!)
    const [selectedImage, setSelectedImage] = useState<string>(userInfo.profilepic!)

    const [nameError, setNameError] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [mobileError, setMobileError] = useState<string>("")


    const isFormValid = () => {
        let isValid = true;
        if (!name) {
            setNameError("Please enter you name")
            isValid = false;
        }
        if (!email) {
            setEmailError("Please enter you email")
            isValid = false;
        }
        else {
            if (!email.includes("@") || !email.includes(".")) {
                setEmailError("Please enter valid email")
                isValid = false;
            }
        }
        if (!mobile) {
            setMobileError("Please enter you mobile no")
            isValid = false;
        }
        else {
            let m = parseInt(mobile)
            if (m.toString().length != 10) {
                setMobileError("Please enter valid mobile no")
                isValid = false;
            }
        }
        if (isValid) {
            setNameError("")
            setEmailError("")
            setMobileError("")
        }
        return isValid
    }

    const submitProfileUpdates = async () => {
        if (isFormValid()) {
            dispatch(loadPending())
            let user: userInformation = {
                uid: userInfo.uid,
                name,
                email,
                mobile,
                address: address ? address : "",
            }

            const result = await Promise.resolve(updateProfile(user, selectedImage!))
            if (result) {
                dispatch(loadDone())
                dispatch(getUserProfile(userInfo.uid))
                dispatch(showToast({ msg: "Profile Update....Success!", color: "success" }))
                return;
            }
            dispatch(loadDone())
            dispatch(showToast({ msg: "Profile Update....Failed!", color: "danger" }))
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
        <IonContent class='ion-padding'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "20px",
                    cursor: "pointer"
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
            <IonList >
                <p style={{
                    fontSize: "12px",
                    color: "red",
                    marginBottom: "1px",
                    fontWeight: "bold",
                }}>{nameError}</p>
                <IonItem>
                    <IonInput
                        label="Name"
                        labelPlacement="floating"
                        placeholder='Enter your name'
                        type="text"
                        value={name}
                        onIonChange={(e) => setName(e.detail.value!)}
                    />
                </IonItem>
                <p style={{
                    fontSize: "12px",
                    color: "red",
                    marginBottom: "1px",
                    fontWeight: "bold",
                }}>{emailError}</p>
                <IonItem>
                    <IonInput
                        label="Email"
                        labelPlacement="floating"
                        placeholder='Enter your email'
                        type="text"
                        value={email}
                        onIonChange={(e) => setEmail(e.detail.value!)}
                    />
                </IonItem>
                <p style={{
                    fontSize: "12px",
                    color: "red",
                    marginBottom: "1px",
                    fontWeight: "bold",
                }}>{mobileError}</p>
                <IonItem>
                    <IonInput
                        label="Mobile"
                        labelPlacement="floating"
                        placeholder='Enter mobile no'
                        type="text"
                        value={mobile}
                        onIonChange={(e) => setMobile(e.detail.value!)}
                    />
                </IonItem>
                <IonItem>
                    <IonTextarea
                        label="Address"
                        labelPlacement="floating"
                        placeholder="Enter your address"
                        autoGrow
                        value={address}
                        onIonChange={(e) => setAddress(e.detail.value!)}
                    />

                </IonItem>
            </IonList>
            <IonButton expand="block" onClick={submitProfileUpdates}>
                Submit
            </IonButton>
        </IonContent>
    )
}

export default MyProfile