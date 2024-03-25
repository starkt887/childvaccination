import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

type Props = {}

const VaccineList = (props: Props) => {
  return (
    <IonPage >
      <Header title='Vaccine List' />
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  )
}

export default VaccineList