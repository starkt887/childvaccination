import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React, { useState } from 'react'
import { Route } from 'react-router'
import Dashboard from '../pages/Dashboard'
import DashboardChildRouter from './internalsubroutes/DashboardChildRouter'
import InternalRouter from './InternalRouter'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import ExternalRouter from './ExternalRouter'

type Props = {}

const Router = (props: Props) => {

    const [isAuth, setIsAuth] = useState<boolean>(true)

    return (
        <IonReactRouter>
            
            <IonRouterOutlet>
                <Route path='/' render={(props) => (
                    isAuth ? <InternalRouter /> : <ExternalRouter />
                )} />
                {/* <Route path="/dashboard" component={DashboardChildRouter} /> */}
                {/* <Route exact path="/">
                    <Redirect to="/home" />
                    </Route> */}
                {/* <Route component={NotFound}/> */}
            </IonRouterOutlet>
        </IonReactRouter>
    )
}

export default Router