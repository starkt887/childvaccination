import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonLoading, IonRouterOutlet, IonToast, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Dashboard from './pages/Dashboard';
import Router from './router/Router';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { resetToast } from './features/toast/toastSlice';


const App = () => {

  const { isOpen, toast, interval } = useAppSelector(state => state.toastReducer)
  const dispatch = useAppDispatch()
const loading=useAppSelector(state=>state.loaderReducer.loading)

  return (
    <IonApp>
      <Router />
      <IonToast
        isOpen={isOpen}
        message={toast.msg}
        // onDidDismiss={() => setisOpen(false)}
        color={toast.color}
        duration={interval}
        onDidDismiss={() => dispatch(resetToast())}
      ></IonToast>
         <IonLoading  
         className='custom_loader'
         isOpen={loading}
         />
 
    </IonApp>
  )
}

export default App;
