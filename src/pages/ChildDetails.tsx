import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

type Props = {}

const ChildDetails = (props: Props) => {
  return (
    <IonPage >
      <Header title='Child Details' />
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  )
}

export default ChildDetails