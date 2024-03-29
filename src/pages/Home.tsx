import { IonButton, IonContent, IonImg, IonInput, IonItem, IonList, IonPage, IonText } from '@ionic/react'
import React, { useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { loginUser, user, userLogin } from '../features/auth/authSlice'
import { User, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebaseService'
import { showToast } from '../features/toast/toastSlice'

type Props = {}

const Home = (props: Props) => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")

  const dispatch = useAppDispatch()

  const formatUser = (firebaseUser: User): user => {
    let userData: user = {
      userInfo: {
        name: firebaseUser.displayName!,
        email: firebaseUser.email!,
        mobile: firebaseUser.phoneNumber!,
      },
      userAuth: {
        uid: firebaseUser.uid,
        isAuth: true
      },
    }
    return userData
  }

  auth.onAuthStateChanged(async (firebaseuser) => {
    if (firebaseuser) {
      let userData = formatUser(firebaseuser)
      dispatch(loginUser(userData))
    }
  })
  const login = () => {
    let userCreds: userLogin = {
      email: email,
      password: password,
    }

    console.log(userCreds)
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 

        const user = userCredential.user;
        console.log(user)
        let userData = formatUser(user)
        dispatch(loginUser(userData))
        dispatch(showToast({ msg: 'Logged in....Success!', color: 'success' }))
        // ...

      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage)
      });

  }


  return (
    <IonPage >
      <IonContent fullscreen >
        <div style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          flexDirection: "column",
          padding: "16px",
          background: "linear-gradient(180deg, rgba(195,60,84,1) 35%, rgba(0,0,0,1) 100%)",
        }}>
          <img src='https://picsum.photos/500/500' width="100" height="100" style={{
            marginBottom: "30px"
          }} />
          <div style={{
            width: "100%",
          }}>
            <IonInput
              label="Email"
              labelPlacement="floating"
              fill="outline"
              type='text'
              placeholder="Enter email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />

            <IonInput
              className='ion-margin-top'
              label="Password"
              labelPlacement="floating"
              fill='outline'
              type="password"
              placeholder="Enter passsowrd"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
            />
            <IonButton expand='block' onClick={login}>
              Login
            </IonButton>
            <IonText class='ion-text-center' color='light' >

              <Link to='/register' style={{
                textDecoration: "none",
                fontSize: "12px",
                color: "white"
              }}>
                <p>New Here? Create Account</p>
              </Link>
            </IonText>
          </div>


        </div>

      </IonContent>
    </IonPage>
  )
}

export default Home