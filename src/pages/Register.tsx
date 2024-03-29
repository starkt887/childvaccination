import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonText, IonToast } from '@ionic/react'
import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../services/firebaseService'
import { useAppDispatch } from '../app/hooks'
import { showToast } from '../features/toast/toastSlice'

type Props = {}

const Register = (props: Props) => {


    const [name, setName] = useState<string>("")
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    const dispatch = useAppDispatch()

    const history = useHistory();


    const register = () => {
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed up 
                const Ruser = userCredential.user;
                console.log(Ruser)
                updateProfile(Ruser, {
                    displayName: name,
                }).then((res) => {
                    console.log("profile update")
                    dispatch(showToast({ msg: 'Registered User Success!', color: "success" }))
                    setTimeout(() => history.goBack(), 3000)

                }).catch((error) => {
                    console.log(error)
                });

            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                // ..
            });

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
                    background: "linear-gradient(180deg, rgba(195,60,84,1) 35%, rgba(0,0,0,1) 100%)",
                }}>
                    <IonText class='ion-text-center' >
                        <h3>Create Account</h3>
                    </IonText>
                    <div style={{
                        width: "100%",
                    }}>
                        <IonInput
                            class='ion-margin-bottom'
                            label="Name"
                            labelPlacement="floating"
                            fill="outline"
                            type='text'
                            placeholder="Enter name"
                            value={name}
                            onIonChange={(e) => setName(e.detail.value!)} />
                        <IonInput
                            class='ion-margin-bottom'
                            label="Email"
                            labelPlacement="floating"
                            fill="outline"
                            type='text'
                            placeholder="Enter email"
                            value={email}
                            onIonChange={(e) => setEmail(e.detail.value!)} />
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
                                color: 'white'
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