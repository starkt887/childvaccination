import { IonButton, IonContent, IonImg, IonInput, IonItem, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTextarea, IonThumbnail } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { useAppSelector } from '../app/hooks'
import { IonSegmentCustomEvent, SegmentChangeEventDetail } from '@ionic/core'
import MyProfile from '../components/MyProfile'
import MySecurity from '../components/MySecurity'

type Props = {}

const Profile = (props: Props) => {
  const userInfo = useAppSelector(state => state.userReducer.userInfo)

  const [segment, setSegment] = useState<string>("profile")


  const changeView = (e: IonSegmentCustomEvent<SegmentChangeEventDetail>) => {
    setSegment(e.detail.value?.toString()!)
  }

  return (
    <IonPage >
      <Header title='Profile' />

      <IonContent fullscreen >
        <IonSegment value={segment} color="tertiary" onIonChange={(e) => changeView(e)}>
          <IonSegmentButton value="profile">
            <IonLabel>Profile</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="security">
            <IonLabel>Security</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {segment === "profile" ?
          <MyProfile /> :
          <MySecurity />}

      </IonContent>
    </IonPage>
  )
}

export default Profile