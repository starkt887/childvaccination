import { IonRouterOutlet } from '@ionic/react'
import { IonReactRouter } from '@ionic/react-router'
import React from 'react'
import { Route } from 'react-router'
import Dashboard from '../../pages/Dashboard'
import ChildDetails from '../../pages/ChildDetails'
import VaccineSchedule from '../../pages/VaccineSchedule'

type Props = {}

const DashboardChildRouter = (props: Props) => {
  return (
    <>
      <Route exact path="/auth/dashboard/child/:id" component={ChildDetails} />
      <Route exact path="/auth/dashboard/child/vaccineschedule/:id" component={VaccineSchedule} />
    </>
  )
}

export default DashboardChildRouter

// we removed the ionrouter outlet coz of a bug, where you keep all the routes related/accessible 
// in one ionrouter IonRouterOutlet, adding sub routes in different IonRouterOutlet will create new 
// instanceof router and will disconnect it from its parent and will create problem in switching between
// related routes. That is whe we removed below logic with the current one
{/* <IonRouterOutlet>
<Route exact path="/auth/dashboard" component={Dashboard} />
<Route exact path="/auth/dashboard/kid/:id" component={ChildDetails} />
<Route exact path="/auth/dashboard/kid/vaccineschedule/:id" component={VaccineSchedule} />
<IonRouterOutlet/> */}


//one more thing, subroute should be little different then parent route eg.
// /auth/dashboard -> Dashboard (If this route is a parent then)

// give a child_path_keyword to make child paths different than parent path, here are the eg.
// 1. /auth/dashboard/{child_path_keyword}/{sub_route} -> 
// 2. /auth/dashboard/{child_path_keyword}/{:sub_route_id} ->
// 3. /auth/dashboard/{child_path_keyword}/{sub_route}/{:sub_route_id} ->


//bad practice
// 1. keeping the parent path and child path together on one path without differentiation
// 2. Creating a new IonRouterOutlet for child paths that are related to all the other internal routes


