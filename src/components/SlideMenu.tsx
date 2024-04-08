import {
    IonButton, IonButtons,
    IonContent, IonHeader,
    IonIcon, IonItem,
    IonItemDivider, IonItemGroup,
    IonLabel, IonList, IonMenu,
    IonMenuToggle,
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
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { logoutUser } from '../features/auth/authSlice'
import { signOut } from 'firebase/auth'
import { auth } from '../services/firebaseService'

const SlideMenu = () => {
    const { name, email, profilepic } = useAppSelector(state => state.userReducer.userInfo)
    const dispatch = useAppDispatch()

    const logout = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            dispatch(logoutUser())
        }).catch((error) => {
            // An error happened.
        });


    }

    return (
        <IonMenu contentId="ion-router-outlet">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Menu</IonTitle>
                    {/* <IonButtons slot='end'>
                        <IonButton fill='solid' shape='round'>
                            <IonIcon icon={logoutIcon} />
                        </IonButton>
                    </IonButtons> */}
                </IonToolbar>
            </IonHeader>
            <IonContent >
                <IonMenuToggle>
                    <IonList>

                        <IonItemDivider>
                            <IonThumbnail slot="start">
                                <img alt="Silhouette of mountains" src={profilepic} />
                            </IonThumbnail>
                            <IonLabel>
                                <h2>{name}</h2>
                                <h3>{email}</h3>
                            </IonLabel>
                        </IonItemDivider>

                        <IonItem button lines='full' routerLink='/auth/dashboard' routerDirection='none'>
                            <IonIcon icon={homeIcon} slot='start' />
                            <IonLabel>
                                Dashboard
                            </IonLabel>
                        </IonItem>

                        {/* <IonItem button lines='full' routerLink='/auth/reports' routerDirection='none'>
                            <IonIcon icon={reportIcon} slot='start' />
                            <IonLabel>
                                Reports
                            </IonLabel>
                        </IonItem> */}
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
                </IonMenuToggle>
            </IonContent>
        </IonMenu>
    )
}

export default SlideMenu