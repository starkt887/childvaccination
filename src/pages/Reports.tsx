import { IonButton, IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

type Props = {}

const Reports = (props: Props) => {
  return (
    <IonPage >
      <Header title='Reports' />
      <IonContent fullscreen>
        <IonButton routerLink='/auth/dashboard' routerDirection='none'>Goto Dashboard</IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Reports