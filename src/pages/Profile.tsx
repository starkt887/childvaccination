import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

type Props = {}

const Profile = (props: Props) => {
  return (
    <IonPage >
      <Header title='Profile' />
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  )
}

export default Profile