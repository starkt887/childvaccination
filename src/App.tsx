import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Dashboard from './pages/Dashboard';
import Router from './router/Router';

const App = () => {



  return (
    <IonApp>
      <Router/>
    </IonApp>
  )
}

export default App;
