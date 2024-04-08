import { IonButton, IonButtons, IonContent, IonDatetime, IonDatetimeButton, IonInput, IonItem, IonLabel, IonList, IonModal, IonPage, IonSelect, IonSelectOption, IonText } from '@ionic/react'
import React, { useEffect, useRef, useState } from 'react'
import Header from '../components/Header'
import { addIntervalToDOB, formatDate, formatDateToCalendar, formatTOISO, intoDaysMonthsYear, isScheduleDateValid, subInteralToScheduleDay } from '../utlils/dateFormater'
import { useParams } from 'react-router'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { IVaccinModal } from '../modals/vaccineModal'
import { IChildModal } from '../modals/childModal'
import { getHosipitalList } from '../features/hosipital/hospitalSlice'
import { IHospitalModal } from '../modals/hospitalModal'
import { useChildService } from '../services/childService'
import { showToast } from '../features/toast/toastSlice'
import { getMyVaccineList } from '../features/vaccine/vaccineSlice'
import AddOnData from '../components/AddOnData'
import { AddToCalendarButton } from 'add-to-calendar-button-react'
import { loadDone, loadPending } from '../features/loader/loaderSlice'


type Params = {
  id: string
}

const VaccineSchedule = () => {

  const { id } = useParams<Params>()
  const dispatch = useAppDispatch()
  const { scheduleVaccine, markAsComplete } = useChildService()



  const userInfo = useAppSelector(state => state.userReducer.userInfo)
  const childVaccineList = useAppSelector<IVaccinModal[][]>(state => state.vaccineReducer.childVaccineList!)
  const hospitalList = useAppSelector<IHospitalModal[]>(state => state.hospitalReducer.hospitalList)
  const currentChild = useAppSelector<IChildModal>(state => state.childrenReducer.currentChild)


  const [selectedVaccine, setSelectedVaccine] = useState<IVaccinModal>()
  const [scheduleDate, setScheduleDate] = useState(formatTOISO(selectedVaccine?.scheduleDate!))
  const [hospital, setHospital] = useState<string>(selectedVaccine?.hospitalId!)
  const [charges, setCharges] = useState<number>(selectedVaccine?.charges!)

  useEffect(() => {
    console.log('Getting Hospital List')
    console.log('Vaccine Selected:', id);
    dispatch(getHosipitalList())
  }, [])


  //we are refreshing the childVaccine list in postoperations
  useEffect(() => {
    console.log('Filtering the selected vaccine')
    filterMyId()
  }, [childVaccineList])

  useEffect(() => {
    if (selectedVaccine?.status === "Approved")
      syncWithGoogleCalendar()
  }, [selectedVaccine])


  const filterMyId = () => {
    let vaccine
    childVaccineList.some((vaccineGroup: IVaccinModal[]) => {
      vaccine = vaccineGroup.find((vaccine: IVaccinModal) => (vaccine.id == id))
      console.log(vaccine)
      if (vaccine)
        return true;

    })
    // console.log(vaccine!)
    setSelectedVaccine(vaccine)
    setScheduleDate(formatTOISO(vaccine!.scheduleDate))
    setHospital(vaccine!.hospitalId)
    setCharges(vaccine!.charges)
    // console.log(currentChild);

  }

  const isFormValid = (): boolean => {
    if (!isScheduleDateValid(scheduleDate)) {
      dispatch(showToast({ msg: "Please choose date atleast 24-hours before", color: "warning" }))
      return false;
    }
    if (!hospital) {
      dispatch(showToast({ msg: "Please choose hospital", color: "warning" }))
      return false;
    }
    return true;
  }

  const schedule = async () => {
    if (isFormValid()) {
      dispatch(loadPending())
      let status = await Promise.resolve(scheduleVaccine(
        userInfo,
        currentChild,
        {
          ...selectedVaccine!,
          scheduleDate: formatDate(scheduleDate),
          hospitalId: hospital
        }))
       
      postOperations(status, "Vaccination Date Schedule")
    }

  }
  const markComplete = async () => {
    let status = await Promise.resolve(markAsComplete(currentChild, selectedVaccine!))
    postOperations(status, "Vaccination Complete")

  }

  const postOperations = (status: boolean, operation: string) => {
    if (status) {
      dispatch(loadDone())
      console.log(`${operation} success!`)
      dispatch(showToast({ msg: `${operation} success!`, color: "success" }))
      dispatch(getMyVaccineList(currentChild.id!)) //refresh children state and set current child
      return
    }
    dispatch(showToast({ msg: `${operation} failed!`, color: "danger" }))
  }

  const [calendarSync, setCaledarSync] = useState({
    name: "",
    options: ['Apple', 'Google'],
    location: "",
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
    timeZone: "Asia/Kolkata",
  })

  useEffect(() => {
    console.log(calendarSync);

  }, [calendarSync])


  const syncWithGoogleCalendar = () => {
    let name = `${currentChild.name} Vaccination: ${selectedVaccine?.title}`
    let startDate = subInteralToScheduleDay(scheduleDate)
    let startTime = "09:00"
    let endDate = formatDateToCalendar(scheduleDate)
    let endTime = "23:59"
    let location = hospitalList.find((hosp) => hosp.id == hospital)?.name!
    setCaledarSync({
      ...calendarSync,
      name,
      startDate,
      startTime,
      endDate,
      endTime,
      location,
    })
  }

  const getActionBasedOnStatus = () => {
    if (selectedVaccine?.status) {
      if (selectedVaccine.status === 'Waiting') {
        return;
      }
      if (selectedVaccine.status === "Approved") {
        return <>

          <div style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>

            <AddToCalendarButton
              name={calendarSync.name}
              options={["Apple", "Google"]}
              location={calendarSync.location}
              startDate={calendarSync.startDate}
              endDate={calendarSync.endDate}
              startTime={calendarSync.startTime}
              endTime={calendarSync.endTime}
              timeZone={calendarSync.timeZone}
              lightMode="dark"
              size='3'
              trigger='click'
              buttonStyle="3d"
              label='Set a reminder'
              listStyle="dropdown" />
            <IonButton expand='block' onClick={markComplete} color="success">Mark Complete</IonButton>
          </div>


        </>
      }
      else
        return

    }
    return <IonButton expand='block' onClick={schedule}>Schedule</IonButton>
  }





  return (
    <IonPage >
      <Header title='Vaccine Schedule' />
      <IonContent fullscreen class='ion-padding'>



        {/* Basic child& vaccination information */}
        <IonList>
          <IonItem>
            <IonInput
              label="Name:"
              labelPlacement="fixed"
              type="text"
              readonly
              value={currentChild && currentChild?.name}
            />

          </IonItem>
          <IonItem>
            <IonInput
              label="DOB:"
              labelPlacement="fixed"
              type="text"
              readonly
              value={currentChild && currentChild?.dob}
            />

          </IonItem>
          <IonItem>
            <IonInput
              label="Vaccine:"
              labelPlacement="fixed"
              type="text"
              readonly
              value={selectedVaccine && selectedVaccine?.title}
            />

          </IonItem>
          <IonItem>
            <IonInput
              label="Preferred:"
              labelPlacement="fixed"
              type="text"
              readonly
              value={selectedVaccine && intoDaysMonthsYear(selectedVaccine?.afterdays!)}
            />
          </IonItem>
        </IonList>
        <IonList>
          <IonItem>
            <IonLabel>
              Select Date*
            </IonLabel>
            <IonDatetimeButton datetime="datetime"></IonDatetimeButton>
            <IonModal keepContentsMounted={true}>
              <IonDatetime
                value={scheduleDate}
                onIonChange={(e) => {
                  let date = e.detail.value?.toString()!
                  setScheduleDate(date)
                }} id="datetime" presentation='date'
                min="2015-03-01T00:00:00"
                max="2100-01-01T23:59:59"
                preferWheel
                showDefaultButtons
                disabled={selectedVaccine?.status === "Waiting" ||
                  selectedVaccine?.status === "Approved" ||
                  selectedVaccine?.status === "Completed"}
              />
            </IonModal>
          </IonItem>
          <IonItem>
            <IonSelect
              value={hospital}
              onIonChange={(e) => {
                console.log(e.detail.value)
                setHospital(e.detail.value)
              }}
              label="Hospital*"
              placeholder="Select Hospital"
              disabled={selectedVaccine?.status === "Waiting" ||
                selectedVaccine?.status === "Approved" ||
                selectedVaccine?.status === "Completed"}>
              {hospitalList.map((hospital) =>
                (<IonSelectOption key={hospital.id} value={hospital.id}>{hospital.name}</IonSelectOption>)
              )}
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonInput
              label="Charges:"
              labelPlacement="fixed"
              type="text"
              readonly
              value={charges}
            />
          </IonItem>
          <IonItem>
            <IonInput
              label="Status:"
              labelPlacement="fixed"
              type="text"
              readonly
              value={selectedVaccine?.status}
            />

          </IonItem>
        </IonList>

        {/* Look and feel of the receipt */}
        {selectedVaccine &&
          selectedVaccine.status &&
          selectedVaccine.status === "Completed" &&
          <AddOnData selectedVaccine={selectedVaccine!} />
        }

        {getActionBasedOnStatus()}

      </IonContent>
    </IonPage >
  )
}

export default VaccineSchedule