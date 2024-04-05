import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Redirect, Route } from 'react-router'
import VaccineList from '../pages/VaccineList'
import Reports from '../pages/Reports'
import About from '../pages/About'
import Contact from '../pages/Contact'
import PrivacyPolicy from '../pages/PrivacyPolicy'
import Notifications from '../pages/Notifications'
import NotFound from '../pages/NotFound'
import SlideMenu from '../components/SlideMenu'
import Profile from '../pages/Profile'
import VaccineSchedule from '../pages/VaccineSchedule'
import Dashboard from '../pages/Dashboard'
import ChildDetails from '../pages/ChildDetails'

type Props = {}

const InternalRouter = (props: Props) => {
    return (
        <>
            <SlideMenu />
            <IonRouterOutlet id='ion-router-outlet'>
                <Route exact path="/auth/dashboard" component={Dashboard} />
                <Route exact path="/auth/dashboard/child/:id" component={ChildDetails} />
                <Route exact path="/auth/dashboard/child/vaccineschedule/:id" component={VaccineSchedule} />
            
                <Route exact path="/auth/vaccinationlist" component={VaccineList} />
                <Route exact path="/auth/reports" component={Reports} />
                <Route exact path="/auth/about" component={About} />
                <Route exact path="/auth/contact" component={Contact} />
                <Route exact path="/auth/privacypolicy" component={PrivacyPolicy} />
                <Route exact path="/auth/notifications" component={Notifications} />
                <Route exact path="/auth/profile" component={Profile} />
                <Route exact path="/">
                    <Redirect to="/auth/dashboard" />
                </Route>
                <Route component={NotFound} />
            </IonRouterOutlet>


        </>

    )
}

export default InternalRouter