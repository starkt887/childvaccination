import { IonButton, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import Header from '../components/Header';
import SlideMenu from '../components/SlideMenu';
import { useEffect } from 'react';
import { useLocation } from 'react-router';

const Dashboard: React.FC = () => {

  const { pathname } = useLocation()
  useEffect(() => {
    console.log(pathname + " is here")
  }, [pathname])

  return (
    <>
      {/* <SlideMenu /> */}
      <IonPage >
        <Header title='Dashboard' />
        <IonContent fullscreen>
          <IonButton routerLink='/auth/reports' routerDirection='none'>Goto Reports</IonButton>
          <IonButton routerLink='/auth/dashboard/child/12' routerDirection='none'>Goto Kid Details</IonButton>
          <IonButton routerLink='/auth/dashboard/child/vaccineschedule/12' routerDirection='none'>Goto Vaccine Schedule</IonButton>
        </IonContent>
      </IonPage>
    </>
  );
};

export default Dashboard;
