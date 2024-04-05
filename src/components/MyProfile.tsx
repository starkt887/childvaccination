import { IonButton, IonContent, IonImg, IonInput, IonItem, IonList, IonTextarea, IonThumbnail } from '@ionic/react'
import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { useUserService } from '../services/userService'
import { getUserProfile, userInformation } from '../features/auth/authSlice'
import { showToast } from '../features/toast/toastSlice'



const MyProfile = () => {

    const userInfo = useAppSelector(state => state.userReducer.userInfo)
    const dispatch = useAppDispatch()
    const { updateProfile } = useUserService()


    const [name, setName] = useState<string>(userInfo.name)
    const [email, setEmail] = useState<string>(userInfo.email)
    const [mobile, setMobile] = useState<string>(userInfo.mobile!)
    const [address, setAddress] = useState<string>(userInfo.address!)

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
            let user: userInformation = {
                uid: userInfo.uid,
                name,
                email,
                mobile,
                address: address ? address : "",
            }
            const result = await Promise.resolve(updateProfile(user))
            if (result) {
                dispatch(getUserProfile(userInfo.uid))
                dispatch(showToast({ msg: "Profile Update....Success!", color: "success" }))
                return;
            }
            dispatch(showToast({ msg: "Profile Update....Failed!", color: "danger" }))
        }
    }

    return (
        <IonContent class='ion-padding'>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <IonThumbnail style={{ height: '100px', width: '100px' }}>
                    <IonImg
                        src="https://ionic-docs-demo-v7.vercel.app/assets/madison.jpg"
                        alt="The Wisconsin State Capitol building in Madison, WI at night"
                    />
                </IonThumbnail>
            </div>
            <IonList>
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