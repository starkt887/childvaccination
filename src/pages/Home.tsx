import { IonButton, IonContent, IonImg, IonInput, IonItem, IonList, IonPage, IonText } from '@ionic/react'
import React, { useState } from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'
import { getUserProfile, loginUser, user, userLogin } from '../features/auth/authSlice'
import { User, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebaseService'
import { showToast } from '../features/toast/toastSlice'
import homelogo from "../assets/homelogo.png"
import { useUserService } from '../services/userService'

type Props = {}

const Home = (props: Props) => {

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [emailError, setEmailError] = useState<string>("")
  const [passwordError, setPasswordError] = useState<string>("")

  const dispatch = useAppDispatch()

  // const formatUser = (firebaseUser: User): user => {
  //   let userData: user = {
  //     userInfo: {
  //       uid: firebaseUser.uid,
  //       name: firebaseUser.displayName!,
  //       email: firebaseUser.email!,
  //       mobile: firebaseUser.phoneNumber!,
  //     },
  //     userAuth: {
  //       isAuth: true
  //     },
  //   }
  //   return userData
  // }


  const isFormValid = () => {
    let isValid = true;
    if (!email) {
      setEmailError("Please enter you email")
      isValid = false;
    }
    else {
      if (!email.includes("@") || !email.includes(".")) {
        setEmailError("Please enter valid email")
        isValid = false;
      }
    }

    if (!password) {
      setPasswordError("Please enter password")
      isValid = false;
    }
    if (isValid) {
      setEmailError("")
      setPasswordError("")
    }
    return isValid
  }

  //keep user logged in based on local storage :Observer
  auth.onAuthStateChanged(async (firebaseuser) => {
    if (firebaseuser) {
      dispatch(loginUser({ isAuth: true }))
      dispatch(getUserProfile(firebaseuser.uid))
    }
  })

  const login = () => {
    if (isFormValid()) {
      signInWithEmailAndPassword(auth, email, password)
        .then(async (userCredential) => {
          // Signed in 

          const user = userCredential.user;
          console.log(user)
          dispatch(loginUser({ isAuth: true }))
          dispatch(getUserProfile(user.uid))
          dispatch(showToast({ msg: 'Logged in....Success!', color: 'success' }))
          // ...

        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorCode, errorMessage)
          dispatch(showToast({ msg: 'Username/Password is wrong!', color: 'danger' }))
        });
    }
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
          // background: `url(${appback})`,
          // backgroundPosition: "right"
        }}>
          <img src={homelogo} width="100" height="100" />
          <IonText class='ion-text-center' style={{
            marginBottom: "10px"
          }}>
            <h3 style={{ marginBottom: "5px" }}>Child Vaccination</h3>
            <p style={{ fontSize: "12px", color: "#f9a03f", marginTop: "5px" }}>Necessity for healthy life</p>
          </IonText>
          <div style={{
            width: "100%",
          }}>
            <p style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "1px",
              fontWeight: "bold"
            }}>{emailError}</p>
            <IonInput
              label="Email"
              labelPlacement="floating"
              fill="outline"
              type='text'
              placeholder="Enter email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
            />
            <p style={{
              fontSize: "12px",
              color: "red",
              marginBottom: "1px",
              fontWeight: "bold"
            }}>{passwordError}</p>
            <IonInput

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
                color: "black"
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