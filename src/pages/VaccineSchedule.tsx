import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

type Props = {}

const VaccineSchedule = (props: Props) => {
  return (
    <IonPage >
      <Header title='Vaccine Schedule' />
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  )
}

export default VaccineSchedule