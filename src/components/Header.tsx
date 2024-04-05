import { IonBackButton, IonBadge, IonButton, IonButtons, IonChip, IonHeader, IonIcon, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react'
import React from 'react'
import { notificationsSharp as notificationIcon } from 'ionicons/icons'
import { useAppSelector } from '../app/hooks'

type Props = {
    title: string
    hideNotificaiton?: boolean
}

const Header = ({ title, hideNotificaiton = false }: Props) => {
    const vaccinesForTodayLength = useAppSelector(state => state.vaccineReducer.vaccinesForTodayLength)
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
                    {!hideNotificaiton &&
                        <IonButton routerLink='/auth/notifications' >
                            <IonChip>
                                <IonIcon icon={notificationIcon}></IonIcon>
                                {vaccinesForTodayLength !== 0 &&
                                    <IonBadge color="primary">{vaccinesForTodayLength}</IonBadge>}

                            </IonChip>
                        </IonButton>}

                </IonButtons>
                <IonTitle>{title}</IonTitle>
            </IonToolbar>
        </IonHeader>
    )
}

export default Header