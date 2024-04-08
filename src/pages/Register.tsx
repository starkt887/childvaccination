import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonText, IonToast } from '@ionic/react'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../services/firebaseService'
import { useAppDispatch } from '../app/hooks'
import { showToast } from '../features/toast/toastSlice'
import { useUserService } from '../services/userService'
import { userInformation } from '../features/auth/authSlice'
import appback from "../assets/appback.jpg"
import { loadDone, loadPending } from '../features/loader/loaderSlice'

type Props = {}

const Register = (props: Props) => {
    const dispatch = useAppDispatch()
    const { createProfile } = useUserService()
    const history = useHistory();

    const [name, setName] = useState<string>()
    const [email, setEmail] = useState<string>()
    const [mobile, setMobile] = useState<string>()
    const [password, setPassword] = useState<string>()

    const [nameError, setNameError] = useState<string>("")
    const [emailError, setEmailError] = useState<string>("")
    const [mobileError, setMobileError] = useState<string>("")
    const [passwordError, setPasswordError] = useState<string>("")

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
        if (!password) {
            setPasswordError("Please enter password")
            isValid = false;
        }
        if (isValid) {
            setNameError("")
            setEmailError("")
            setMobileError("")
            setPasswordError("")
        }
        return isValid
    }

    const register = () => {
        if (isFormValid()) {
            dispatch(loadPending())
            createUserWithEmailAndPassword(auth, email!, password!)
                .then(async (userCredential) => {
                    // Signed up 
                    const Ruser = userCredential.user;
                    console.log(Ruser)
                    let user: userInformation = {
                        uid: Ruser.uid,
                        name: name!,
                        email: email!,
                        mobile: mobile,
                    }
                    const result = await Promise.resolve(createProfile(user))
                    if (result) {
                        dispatch(loadDone())
                        dispatch(showToast({ msg: 'Registered User Success!', color: "success" }))
                        setTimeout(() => history.goBack(), 3000)
                        return
                    }
                    dispatch(loadDone())
                    dispatch(showToast({ msg: 'Registered User Failure!', color: "danger" }))
                })
                .catch((error: any) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(errorCode, errorMessage)
                    // ..
                    dispatch(loadDone())
                });
        }
    }

    return (
        <IonPage >
            <IonContent fullscreen >
                <div style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%",
                    flexDirection: "column",
                    padding: "16px",
                    background: "linear-gradient(#e9f7ca 60%, white)",

                }}>
                    <IonText class='ion-text-center' >
                        <h3>Create Account</h3>
                    </IonText>
                    <div style={{
                        width: "100%",
                    }}>
                        <p style={{
                            fontSize: "12px",
                            color: "red",
                            marginBottom: "1px",
                            fontWeight: "bold",
                        }}>{nameError}</p>
                        <IonInput
                            class='ion-margin-bottom'
                            label="Name"
                            labelPlacement="floating"
                            fill="outline"
                            type='text'
                            placeholder="Enter name"
                            value={name}
                            onIonChange={(e) => setName(e.detail.value!)}
                        />
                        <p style={{
                            fontSize: "12px",
                            color: "red",
                            marginBottom: "1px",
                            fontWeight: "bold"
                        }}>{emailError}</p>
                        <IonInput
                            class='ion-margin-bottom'
                            label="Email"
                            labelPlacement="floating"
                            fill="outline"
                            type='text'
                            placeholder="Enter email"
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value!)} />
                        <p style={{
                            fontSize: "12px",
                            color: "red",
                            marginBottom: "1px",
                            fontWeight: "bold"
                        }}>{mobileError}</p>
                        <IonInput
                            class='ion-margin-bottom'
                            label="Mobile"
                            labelPlacement="floating"
                            fill="outline"
                            type='text'
                            placeholder="Enter mobile"
                            value={mobile}
                            onIonChange={(e) => setMobile(e.detail.value!)} />
                        <p style={{
                            fontSize: "12px",
                            color: "red",
                            marginBottom: "1px",
                            fontWeight: "bold"
                        }}>{passwordError}</p>
                        <IonInput
                            class='ion-margin-bottom'
                            label="Password"
                            labelPlacement="floating"
                            fill="outline"
                            type='password'
                            placeholder="Enter password"
                            value={password}
                            onIonChange={(e) => setPassword(e.detail.value!)} />
                        <IonButton expand='block' onClick={register}>
                            Register
                        </IonButton>
                        <IonText class='ion-text-center' color='light' >
                            <Link to='/' style={{
                                textDecoration: "none",
                                fontSize: "12px",
                                color: 'black'
                            }}>
                                <p >Already registered? Login</p>
                            </Link>
                        </IonText>
                    </div>
                </div>

            </IonContent>
        </IonPage>
    )
}

export default Register