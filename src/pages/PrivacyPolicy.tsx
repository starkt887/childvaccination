import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

type Props = {}

const PrivacyPolicy = (props: Props) => {
  return (
    <IonPage >
      <Header title='Privacy Policy' />
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  )
}

export default PrivacyPolicy