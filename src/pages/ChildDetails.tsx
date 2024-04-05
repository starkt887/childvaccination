import { IonAccordion, IonAccordionGroup, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonIcon, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonText, IonThumbnail } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { pencil as editIcon, warning as warningIcon, checkbox as checkboxIcon } from 'ionicons/icons'
import classes from './ChildDetails.module.css'
import VaccineList from './VaccineList'
import VaccineGroup from '../components/VaccineGroup'
import { vaccineData } from '../modals/data'
import { IVaccinModal } from '../modals/vaccineModal'
import AddEditChild from '../components/AddEditChild'
import { useParams } from 'react-router'
import { IChildModal } from '../modals/childModal'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setCurrentChild } from '../features/children/childrenSlice'
import { getMyVaccineList } from '../features/vaccine/vaccineSlice'

type Params = {
  id: string
}

const ChildDetails = () => {

  const { id } = useParams<Params>()
  const currentChild = useAppSelector<IChildModal>(state => state.childrenReducer.currentChild)
  const myChildVaccineList = useAppSelector<IVaccinModal[][]>(state => state.vaccineReducer.childVaccineList!)
  const dispatch = useAppDispatch()

  const [isEditChildOpen, setIsEditChildOpen] = useState(false)
  useEffect(() => {
    // console.log("Params:", id)
    dispatch(setCurrentChild(id))
    dispatch(getMyVaccineList(id))
  }, [])

  return (
    <IonPage >
      <Header title='Child Details' />
      <IonContent fullscreen class='ion-padding'>
        <AddEditChild childDetails={currentChild!} isModalOpen={isEditChildOpen} setIsModalOpen={(isOpen) => setIsEditChildOpen(isOpen)} />
        <IonCard>
          <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/card-media.png" />
          <IonCardHeader>
            <IonCardTitle>{currentChild?.name}</IonCardTitle>
            <IonCardSubtitle>{currentChild?.dob}</IonCardSubtitle>
            <div className={classes.cardinfo}>
              <IonCardSubtitle>{currentChild?.gender}</IonCardSubtitle>
              <IonButton onClick={() => setIsEditChildOpen(true)} fill="solid">
                Edit
                <IonIcon icon={editIcon} slot='start' />
              </IonButton>
            </div>
          </IonCardHeader>
        </IonCard>

        <IonText>
          <h5>Vaccines</h5>
        </IonText>

        <IonAccordionGroup expand="inset">
          {
            myChildVaccineList.map((vaccineGroup: IVaccinModal[]) => {
              return <VaccineGroup
                readOnly={false}
                key={vaccineGroup.at(0)?.id}
                id={vaccineGroup.at(0)?.id!}
                vaccineGroup={vaccineGroup}
                dob={currentChild.dob} />
            })
          }

        </IonAccordionGroup>
      </IonContent>
    </IonPage>
  )
}

export default ChildDetails