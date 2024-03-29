import { IonButton, IonContent, IonImg, IonInput, IonItem, IonList, IonPage, IonTextarea, IonThumbnail } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'

type Props = {}

const Profile = (props: Props) => {
  return (
    <IonPage >
      <Header title='Profile' />
      <IonContent fullscreen class='ion-padding'>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <IonThumbnail style={{ height: '100px', width: '100px' }}>
            <IonImg
              src="https://ionic-docs-demo-v7.vercel.app/assets/madison.jpg"
              alt="The Wisconsin State Capitol building in Madison, WI at night"
            />
          </IonThumbnail>
        </div>
        <IonList>

          <IonItem>
            <IonInput
              label="Name"
              labelPlacement="floating"
              placeholder='Enter your name'
              type="text"
              readonly
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Email"
              labelPlacement="floating"
              placeholder='Enter your email'
              type="text"
              readonly
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Mobile"
              labelPlacement="floating"
              placeholder='Enter mobile no'
              type="text"
              readonly
              helperText='Enter valid mobileno'
            />
          </IonItem>
          <IonItem>
            <IonTextarea
              label="Address"
              labelPlacement="floating"
              placeholder="Enter your address"
              autoGrow />

          </IonItem>
        </IonList>
        <IonButton expand="block">
          Submit
        </IonButton>
      </IonContent>
    </IonPage>
  )
}

export default Profile