import { IonButton, IonContent, IonInput } from '@ionic/react'
import React, { useState } from 'react'
import { useUserService } from '../services/userService'
import { useAppDispatch } from '../app/hooks'
import { showToast } from '../features/toast/toastSlice'
import { reauthenticateWithCredential } from 'firebase/auth'
import { auth } from '../services/firebaseService'
import ReAuthenticate from './ReAuthenticate'
import { loadDone, loadPending } from '../features/loader/loaderSlice'

type Props = {}

const MySecurity = (props: Props) => {
  const { updatePass } = useUserService()
  const dispatch = useAppDispatch()

  const [rePassword, setRePassword] = useState<string>("")
  const [password, setPassword] = useState<string>()
  const [passwordError, setPasswordError] = useState<string>("")
  const [rePasswordError, setRePasswordError] = useState<string>("")

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const isFormValid = () => {
    let isValid = true;

    if (!password) {
      setPasswordError("Please enter password")
      isValid = false;
    }
    if (!rePassword) {
      setRePasswordError("Please enter password")
      isValid = false;
    }
    if (password != rePassword) {
      setRePasswordError("Passwords doesnt match")
      isValid = false;
    }
    if (isValid) {
      setPasswordError("")
      setRePasswordError("")
    }
    return isValid
  }

  const promptToReauthenticate = () => {
    if (isFormValid()) {
      setIsModalOpen(true)
    }
  }
  const changePassword = async (isReAuth: boolean) => {
    if (isReAuth) {
      dispatch(loadPending())
      const result = await updatePass(password!)
      if (result) {
        setPassword("")
        setRePassword("")
        dispatch(loadDone())
        dispatch(showToast({ msg: "Password Update....Success!", color: "success" }))
        return
      }
      dispatch(loadDone())
      dispatch(showToast({ msg: "Password Update....Failed!", color: "danger" }))
      return
    }
    dispatch(loadDone())
    dispatch(showToast({ msg: "Wrong Password entered!", color: "danger" }))
    return

  }

  return (
    <IonContent class='ion-padding'>
      <p style={{
        fontSize: "12px",
        color: "red",
        marginBottom: "1px",
        fontWeight: "bold"
      }}>{passwordError}</p>
      <IonInput
        class='ion-margin-bottom'
        label="Password"
        labelPlacement="floating"
        fill="outline"
        type='password'
        placeholder="Enter password"
        value={password}
        onIonChange={(e) => setPassword(e.detail.value!)} />
      <p style={{
        fontSize: "12px",
        color: "red",
        marginBottom: "1px",
        fontWeight: "bold"
      }}>{rePasswordError}</p>
      <IonInput
        class='ion-margin-bottom'
        label="Re-Enter Password"
        labelPlacement="floating"
        fill="outline"
        type='password'
        placeholder="Re-Enter password"
        value={rePassword}
        onIonChange={(e) => setRePassword(e.detail.value!)} />
      <IonButton expand='block' onClick={promptToReauthenticate}>
        Change Password
      </IonButton>
      <ReAuthenticate
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        authenticateAndRun={changePassword} />
    </IonContent>
  )
}

export default MySecurity