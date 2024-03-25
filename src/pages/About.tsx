import { IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

type Props = {}

const About = (props: Props) => {
  return (
    <IonPage >
      <Header title='About' />
      <IonContent fullscreen>
      </IonContent>
    </IonPage>
  )
}

export default About