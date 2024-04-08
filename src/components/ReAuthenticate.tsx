import { IonButton, IonButtons, IonContent, IonHeader, IonInput, IonModal, IonTitle, IonToolbar } from '@ionic/react'
import { AuthCredential, EmailAuthCredential, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth'
import React, { useState } from 'react'
import { auth } from '../services/firebaseService'


type Props = {
    isModalOpen: boolean
    setIsModalOpen(isOpen: boolean): void
    authenticateAndRun(isReAuth:boolean): void
}


const ReAuthenticate = ({ isModalOpen, setIsModalOpen, authenticateAndRun }: Props) => {
    const [password, setPassword] = useState<string>()
    const [passwordError, setPasswordError] = useState<string>("")
    const isFormValid = () => {
        let isValid = true;

        if (!password) {
            setPasswordError("Please enter password")
            isValid = false;
        }

        if (isValid) {
            setPasswordError("")
        }
        return isValid
    }
    const submit = async () => {
        if (isFormValid()) {
            console.log(password);
            
            const user = auth.currentUser;
            const credential = EmailAuthProvider.credential(user?.email!, password!);
            reauthenticateWithCredential(auth.currentUser!, credential).then(() => {
                // User re-authenticated.
                authenticateAndRun(true)
                setIsModalOpen(false)
            }).catch((error) => {
                // An error ocurred
                // ...
                authenticateAndRun(false)
                console.log("Authendication error:", error!);
            });

        }
    }

    return (
        <IonModal isOpen={isModalOpen}>
            <IonHeader>
                <IonToolbar>

                    <IonTitle >Re-Authenticate</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={() => setIsModalOpen(false)}>Cancel</IonButton>
                    </IonButtons>

                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <p style={{
                    fontSize: "12px",
                    color: "red",
                    marginBottom: "1px",
                    fontWeight: "bold"
                }}>{passwordError}</p>
                <IonInput
                    class='ion-margin-bottom'
                    label="Current Password"
                    labelPlacement="floating"
                    fill="outline"
                    type='password'
                    placeholder="Enter current password"
                    value={password}
                    onIonChange={(e) => setPassword(e.detail.value!)} />
                <IonButton expand="block" onClick={submit}>
                    Re-Authenticate
                </IonButton>
            </IonContent>
        </IonModal>
    )
}

export default ReAuthenticate