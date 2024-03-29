import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import Home from '../pages/Home'
import { Redirect, Route } from 'react-router'
import NotFound from '../pages/NotFound'
import Register from '../pages/Register'

type Props = {}

const ExternalRouter = (props: Props) => {
    return (
        <IonRouterOutlet>
            <Route exact path="/" component={Home} />
            <Route exact path="/register" component={Register} />
            <Route path="/auth">
                <Redirect to="/" />
            </Route>
            <Route component={NotFound} />
        </IonRouterOutlet>

    )
}

export default ExternalRouter