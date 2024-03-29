import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React, { useState } from 'react'
import { Route } from 'react-router'
import Dashboard from '../pages/Dashboard'
import InternalRouter from './InternalRouter'
import Home from '../pages/Home'
import NotFound from '../pages/NotFound'
import ExternalRouter from './ExternalRouter'
import { useAppSelector } from '../app/hooks'

type Props = {}

const Router = (props: Props) => {

    const { isAuth } = useAppSelector(state => state.userReducer.userAuth)

    return (
        <IonReactRouter>
            <IonRouterOutlet>
                <Route path='/' render={(props) => (
                    isAuth ? <InternalRouter /> : <ExternalRouter />
                )} />
            </IonRouterOutlet>
        </IonReactRouter>
    )
}

export default Router