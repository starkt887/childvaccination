import React from 'react'
import Header from '../components/Header'
import { IonContent, IonPage } from '@ionic/react'

type Props = {}

const Contact = (props: Props) => {
  return (
    <IonPage >
      <Header title='Contact' />
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  )
}

export default Contact