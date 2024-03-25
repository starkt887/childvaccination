import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

type Props = {}

const Notifications = (props: Props) => {
  return (
    <IonPage >
      <Header title='Notifications' />
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  )
}

export default Notifications