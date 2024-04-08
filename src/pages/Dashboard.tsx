import { IonButton, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonPage, IonRow, IonText, IonThumbnail, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/Header';
import SlideMenu from '../components/SlideMenu';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router';
import {
  arrowBack as arrowIcon,
  add as addIcon
} from 'ionicons/icons';
import classes from './Dashboard.module.css'
import AddEditChild from '../components/AddEditChild';
import { useChildService } from '../services/childService';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getMyChildrenAT } from '../features/children/childrenSlice';
import { showToast } from '../features/toast/toastSlice';
import { IChildModal } from '../modals/childModal';
import { getVaccineList, setTodaysVaccines } from '../features/vaccine/vaccineSlice';
import { IVaccinModal } from '../modals/vaccineModal';
import { useNotificationService } from '../services/notificationService';
import { collection, onSnapshot, query, where } from 'firebase/firestore';
import { firestoreDb } from '../services/firebaseService';
import { formatDate } from '../utlils/dateFormater';

const Dashboard: React.FC = () => {

  const uid = useAppSelector<string>(state => state.userReducer.userInfo.uid)
  const children = useAppSelector(state => state.childrenReducer.children)
  const vaccineList = useAppSelector(state => state.vaccineReducer.vaccineList)
  const [totalVaccines, setTotalVaccines] = useState(0)

  const dispatch = useAppDispatch()
  const [isAddChildOpen, setIsAddChildOpen] = useState(false)

  const { vaccineReminders, subscribeToTodaysVaccineDate } = useNotificationService()

  useEffect(() => {
    // console.log("UID:",uid);

    dispatch(getMyChildrenAT(uid)).unwrap()
      .then((responseChidlren) => {
        console.log("Children loaded", responseChidlren)
        subscribeToTodaysVaccineDate(responseChidlren)//notification listener
      }).catch((error) => {
        console.log("unwrap catch:");
        console.log(error);
        dispatch(showToast({ msg: "Unable to load children", color: "danger" }))
      })

    dispatch(getVaccineList()).unwrap().then((resp) => {
      console.log(resp)
      setTotalVaccines(resp.flat(1).length)
    }).catch((error: any) => {
      console.log(error)
    })

  }, [uid])

  useEffect(() => {
    console.log("Vaccine reminders", vaccineReminders)
    // as soon as listener initilizes the vaccineReminders, settle in with vaccineSlice
    dispatch(setTodaysVaccines(vaccineReminders))

  }, [vaccineReminders])





  return (
    <>
      {/* <SlideMenu /> */}
      <IonPage >
        <Header title='Dashboard' />
        <IonContent fullscreen class='ion-padding'>

          <IonGrid >
            <IonRow class='ion-justify-content-spacebetween'>
              <IonCol className={classes.col}>

                <IonLabel className={classes.labelflex}>
                  Total
                  <IonIcon size='large' icon={arrowIcon} />
                </IonLabel>
                <IonLabel>
                  <h2 className={classes.labeltitle}>Children</h2>
                </IonLabel>
                <IonLabel>
                  <h2 className={classes.labelvalue}>{children.length}</h2>
                </IonLabel>
              </IonCol>
              <IonCol className={classes.col}>

                <IonLabel className={classes.labelflex}>
                  Total
                  <IonIcon size='large' icon={arrowIcon} />
                </IonLabel>
                <IonLabel>
                  <h2 className={classes.labeltitle}>Vaccines</h2>
                </IonLabel>
                <IonLabel>
                  <h2 className={classes.labelvalue}>{totalVaccines}</h2>
                </IonLabel>
              </IonCol>
            </IonRow>
          </IonGrid>


          <IonText>
            <h5>Children list</h5>
          </IonText>

          <IonList>
            {children.map((child: IChildModal) => {
              return <IonItem key={child.id} detail button routerLink={`/auth/dashboard/child/${child.id}`} >
                <IonThumbnail slot="start">
                  <img alt="Silhouette of mountains" src={child.profilepic} />
                </IonThumbnail>
                <IonLabel>
                  {child.name}
                  <IonText>
                    <p>{child.dob}</p>
                  </IonText>
                </IonLabel>
              </IonItem>
            })}

          </IonList>

          <AddEditChild isModalOpen={isAddChildOpen} setIsModalOpen={(isOpen) => setIsAddChildOpen(isOpen)} />
          <IonFab slot='fixed' vertical='bottom' horizontal='end'>
            <IonFabButton onClick={() => setIsAddChildOpen(true)} size='small'>
              <IonIcon icon={addIcon} />
            </IonFabButton>
          </IonFab>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Dashboard;

// <IonButton routerLink='/auth/reports' routerDirection='none'>Goto Reports</IonButton>
// <IonButton routerLink='/auth/dashboard/child/12' routerDirection='none'>Goto Kid Details</IonButton>
// <IonButton routerLink='/auth/dashboard/child/vaccineschedule/12' routerDirection='none'>Goto Vaccine Schedule</IonButton>