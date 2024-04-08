import { IonContent, IonItem, IonItemDivider, IonItemGroup, IonLabel, IonList, IonPage, IonSelect, IonSelectOption, IonText } from '@ionic/react'
import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { collection, onSnapshot, query, where } from 'firebase/firestore'
import { firestoreDb } from '../services/firebaseService'
import { useAppSelector } from '../app/hooks'
import { formatDate } from '../utlils/dateFormater'
import { IVaccinModal } from '../modals/vaccineModal'
import { useNotificationService } from '../services/notificationService'
import { ReminderModal } from '../modals/childModal'
import { IonSelectCustomEvent, SelectChangeEventDetail } from '@ionic/core'

const Notifications = () => {

  const vaccinesForToday = useAppSelector(state => state.vaccineReducer.vaccinesForToday)
  const children = useAppSelector(state => state.childrenReducer.children)
  const { getCompletedVaccines } = useNotificationService()
  const [filterOption, setFilterOption] = useState<string>("Todays Vaccines")
  const [reminders, setReminders] = useState<ReminderModal[]>([])
  useEffect(() => {
    setReminders(vaccinesForToday!)
  }, [])

  const onFilterChange = async (e: IonSelectCustomEvent<SelectChangeEventDetail<any>>) => {
    setFilterOption(e.detail.value.toString())
    if (e.detail.value === "Completed") {
      let vaccinesCompleted = await Promise.resolve(getCompletedVaccines(children))
      console.log(vaccinesCompleted)
      setReminders(vaccinesCompleted)
      return
    }
    setReminders(vaccinesForToday!)

  }


  return (
    <IonPage>
      <Header title='Notifications' hideNotificaiton={true} />
      <IonContent fullscreen className='ion-padding'>
        {/* list of all the shloks */}
        <IonList>
          <IonItem>

            <IonSelect
              value={filterOption}
              onIonChange={(e) => onFilterChange(e)}
              label='Filter by'
              placeholder="Select Filter"
            >

              <IonSelectOption key="todaysVaccines" value="Todays Vaccines">Todays Vaccines</IonSelectOption>
              <IonSelectOption key="completed" value="Completed">Completed</IonSelectOption>
            </IonSelect>
          </IonItem>

          {reminders &&
            reminders.map((reminder: ReminderModal) => {
              return <IonItemGroup key={reminder.childData.name} >
                <IonItemDivider>
                  <IonLabel>Child: {reminder.childData.name}</IonLabel>
                </IonItemDivider>
                {reminder.vaccines.map((vaccine) => {
                  return <IonItem key={vaccine.id}>
                    <IonLabel>
                      <h3>{vaccine.title}</h3>
                      <p className='ion-text-nowrap' style={{
                        width: "150px",
                        overflow: "hidden",
                        textOverflow: "ellipsis"
                      }}>{vaccine.scheduleDate}</p>
                    </IonLabel>
                    <IonText>
                      <p style={{ fontSize: "12px" }}>{vaccine.status}</p>
                    </IonText>
                  </IonItem>
                })}


              </IonItemGroup>
            })}

        </IonList>

      </IonContent>
    </IonPage>
  )
}

export default Notifications