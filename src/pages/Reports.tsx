import { IonAccordionGroup, IonButton, IonContent, IonPage } from '@ionic/react'
import React from 'react'
import Header from '../components/Header'
import { vaccineData } from '../modals/data'
import { IVaccinModal } from '../modals/vaccineModal'
import VaccineGroup from '../components/VaccineGroup'

type Props = {}

const Reports = (props: Props) => {
  return (
    <IonPage >
      <Header title='Reports' />
      <IonContent fullscreen>

        show the vaccine schedule page in readonly format
        <IonAccordionGroup expand="inset">
          {
            vaccineData.map((vaccineGroup: IVaccinModal[]) => {
              return <VaccineGroup key={vaccineGroup.at(0)?.id} id={vaccineGroup.at(0)?.id!} vaccineGroup={vaccineGroup} />
            })
          }
        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  )
}

export default Reports