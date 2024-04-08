import { IonAccordionGroup, IonContent, IonPage } from '@ionic/react'
import React, { useEffect } from 'react'
import Header from '../components/Header'
import VaccineGroup from '../components/VaccineGroup'
import { IVaccinModal } from '../modals/vaccineModal'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { getVaccineList } from '../features/vaccine/vaccineSlice'
import { intoDaysMonthsYear } from '../utlils/dateFormater'

type Props = {}

const VaccineList = (props: Props) => {

  const vaccineList = useAppSelector(state => state.vaccineReducer.vaccineList)
  const dispatch = useAppDispatch()


  useEffect(() => {
    dispatch(getVaccineList()).unwrap().then((resp) => {
      console.log(resp)
    }).catch((error: any) => {
      console.log(error)
    })
  }, [])

  return (
    <IonPage >
      <Header title='Vaccine List' />
      <IonContent fullscreen class='ion-padding'>
        <IonAccordionGroup expand="inset">
          {
            vaccineList.map((vaccineGroup: IVaccinModal[]) => {
              return <VaccineGroup
                readOnly={true}
                key={vaccineGroup.at(0)?.id}
                id={vaccineGroup.at(0)?.id!}
                vaccineGroup={vaccineGroup} />
            })
          }

        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  )
}

export default VaccineList