import { IonContent, IonLabel, IonPage } from '@ionic/react'
import React from 'react'

type Props = {}

const NotFound = (props: Props) => {
    return (
        <IonPage>
            <IonContent fullscreen>
                <IonLabel>
                    <h2>
                        Page Not Found
                    </h2>
                </IonLabel>
            </IonContent>
        </IonPage>
    )
}

export default NotFound