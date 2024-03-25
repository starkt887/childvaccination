import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import Home from '../pages/Home'
import { Route } from 'react-router'
import NotFound from '../pages/NotFound'

type Props = {}

const ExternalRouter = (props: Props) => {
    return (

        <IonRouterOutlet>

            <Route exact path="/" component={Home} />
            {/* <Route exact path="/">
            <Redirect to="/home" />
            </Route> */}
            <Route component={NotFound} />
        </IonRouterOutlet>

    )
}

export default ExternalRouter