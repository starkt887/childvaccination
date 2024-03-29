import {
    IonButton, IonButtons,
    IonContent, IonHeader,
    IonIcon, IonItem,
    IonItemDivider, IonItemGroup,
    IonLabel, IonList, IonMenu,
    IonThumbnail, IonTitle, IonToolbar
} from '@ionic/react'
import {
    home as homeIcon,
    document as reportIcon,
    list as listIcon,
    notifications as notificationIcon,
    informationCircle as aboutIcon,
    call as contactIcon,
    lockClosed as privacyIcon,
    share as shareIcon,
    starHalf as rateIcon,
    power as logoutIcon,
    person as profileIcon
} from 'ionicons/icons'
import { useAppDispatch } from '../app/hooks'
import { logoutUser } from '../features/auth/authSlice'

const SlideMenu = () => {

    const dispatch = useAppDispatch()

    const logout = () => {
        dispatch(logoutUser())
    }

    return (
        <IonMenu contentId="ion-router-outlet">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu Content</IonTitle>
                    <IonButtons slot='end'>
                        <IonButton fill='solid' shape='round'>
                            <IonIcon icon={logoutIcon} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent >
                <IonList>

                    <IonItemDivider>
                        <IonThumbnail slot="start">
                            <img alt="Silhouette of mountains" src="https://ionicframework.com/docs/img/demos/thumbnail.svg" />
                        </IonThumbnail>
                        <IonLabel>
                            <h2>Name</h2>
                            <h3>email</h3>
                        </IonLabel>
                    </IonItemDivider>

                    <IonItem button lines='full' routerLink='/auth/dashboard' routerDirection='none'>
                        <IonIcon icon={homeIcon} slot='start' />
                        <IonLabel>
                            Dashboard
                        </IonLabel>
                    </IonItem>

                    <IonItem button lines='full' routerLink='/auth/reports' routerDirection='none'>
                        <IonIcon icon={reportIcon} slot='start' />
                        <IonLabel>
                            Reports
                        </IonLabel>
                    </IonItem>
                    <IonItem button lines='full' routerLink='/auth/vaccinationlist' routerDirection='none'>
                        <IonIcon icon={listIcon} slot='start' />
                        <IonLabel>
                            Vaccine List
                        </IonLabel>
                    </IonItem>
                    <IonItem button lines='full' routerLink='/auth/notifications' routerDirection='none'>
                        <IonIcon icon={notificationIcon} slot='start' />
                        <IonLabel>
                            Notifications
                        </IonLabel>
                    </IonItem>
                    <IonItem button lines='full' routerLink='/auth/profile' routerDirection='none'>
                        <IonIcon icon={profileIcon} slot='start' />
                        <IonLabel>
                            Profile
                        </IonLabel>
                    </IonItem>
                    <IonItem button lines='full' onClick={logout}>
                        <IonIcon icon={logoutIcon} slot='start' />
                        <IonLabel>
                            Logout
                        </IonLabel>
                    </IonItem>
                    {/* Information links */}
                    {/* <IonItemGroup>
                        <IonItemDivider>
                            <IonLabel>Information</IonLabel>
                        </IonItemDivider>

                        <IonItem button lines='full' routerLink='/auth/about' routerDirection='none'>
                            <IonIcon icon={aboutIcon} slot='start' />
                            <IonLabel>
                                About
                            </IonLabel>
                        </IonItem>
                        <IonItem button lines='full' routerLink='/auth/contact' routerDirection='none'>
                            <IonIcon icon={contactIcon} slot='start' />
                            <IonLabel>
                                Contact
                            </IonLabel>
                        </IonItem>
                        <IonItem button lines='full' routerLink='/auth/privacypolicy' routerDirection='none'>
                            <IonIcon icon={privacyIcon} slot='start' />
                            <IonLabel>
                                Privacy Policy
                            </IonLabel>
                        </IonItem>
                    </IonItemGroup> */}
                    {/* Other Links */}
                    {/* <IonItemGroup>
                        <IonItemDivider>
                            <IonLabel>Other</IonLabel>
                        </IonItemDivider>

                        <IonItem button lines='full'>
                            <IonIcon icon={shareIcon} slot='start' />
                            <IonLabel>
                                Share
                            </IonLabel>
                        </IonItem>
                        <IonItem button lines='full'>
                            <IonIcon icon={rateIcon} slot='start' />
                            <IonLabel>
                                Rate Us
                            </IonLabel>
                        </IonItem>
                    </IonItemGroup> */}
                </IonList>
            </IonContent>
        </IonMenu>
    )
}

export default SlideMenu