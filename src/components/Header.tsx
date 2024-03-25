import { IonBackButton, IonButton, IonButtons, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { notificationsSharp as notificationIcon } from 'ionicons/icons'

type Props = {
    title: string
}

const Header = ({ title }: Props) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot='start' >
                    <IonBackButton color='dark' />
                </IonButtons>
                <IonButtons slot="start">
                    <IonMenuButton></IonMenuButton>
                </IonButtons>
                <IonButtons slot='end'>
                    <IonButton >
                        <IonIcon icon={notificationIcon} />
                    </IonButton>
                </IonButtons>
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header