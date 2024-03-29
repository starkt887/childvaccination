import { IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonText } from '@ionic/react'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import { formatDate } from '../utlils/dateFormater'

type Props = {}

const VaccineSchedule = (props: Props) => {
  useEffect(() => {
    console.log('Vaccine schedule loaded')
  }, [])

  return (
    <IonPage >
      <Header title='Vaccine Schedule' />
      <IonContent fullscreen class='ion-padding'>
        <IonText>
          <h2>Title</h2>
        </IonText>
        <IonText>
          <h3>subTitle</h3>
        </IonText>

        <IonText>
          <p>This is the description of this vaccine</p>
        </IonText>
        <IonList>
          <IonItem>
            <IonLabel>
              Select DOB
            </IonLabel>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime onIonChange={(e) => {
                let date = e.detail.value?.toString()!
                formatDate(date)
              }} id="datetime" presentation='date' preferWheel showDefaultButtons> </IonDatetime>
            </IonModal>
          </IonItem>
          <IonItem>
            <IonSelect onIonChange={(e) => {
              console.log(e.detail.value)
            }} label="Hospital" placeholder="Select Hospital">
              <IonSelectOption value="hosp1">Hospital 1</IonSelectOption>
              <IonSelectOption value="hosp2">Hospital 2</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput
              label="Charges"
              labelPlacement="floating"
              type="text"
              readonly
            />
          </IonItem>
          <IonItem>
            <IonLabel>Status:</IonLabel>

            change color based on status 
            <IonLabel> Sceduled/Canceled/Completed</IonLabel>
          </IonItem>
        </IonList>

        <IonButton expand='block'>Schedule</IonButton>
        <IonButton expand='block'>Mark Complete</IonButton>
        <IonButton expand='block'>Show Report</IonButton>

      </IonContent>
    </IonPage>
  )
}

export default VaccineSchedule