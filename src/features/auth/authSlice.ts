import { Draft, PayloadAction, createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser, updatePhoneNumber, updateProfile } from "firebase/auth"
import { auth } from "../../services/firebaseService"
import { useAppDispatch } from "../../app/hooks"
import { useDispatch } from "react-redux"
import { showToast, toast } from "../toast/toastSlice"


export type userLogin = {
    email: string
    password: string
}
type userAuthentication = {
    uid: string
    isAuth: boolean
}
type userInformation = {
    name: string
    email: string
    mobile?: string
    // address?: string//optionals
    password?: string//optionals
}
export interface user {
    userInfo: userInformation
    userAuth: userAuthentication
    error?: string
}

const initialState: user = {
    userInfo: {
        name: '',
        email: '',
        mobile: '',
    },
    userAuth: {
        uid: '',
        isAuth: false
    },
    error: ''
}



export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        // registerUser: (state, action: PayloadAction<userInformation>) => {
        //     console.log(action.payload)
        //     registerUserUp(action.payload)

        // },
        loginUser: (state, action: PayloadAction<user>) => {
            console.log(action.payload)
            state.userInfo = action.payload.userInfo
            state.userAuth = action.payload.userAuth
        },
        logoutUser: (state) => {

            state.userAuth = {
                uid: '',
                isAuth: false
            }
            state.userInfo = {
                name: '',
                email: '',
                mobile: '',
            }
            state.error = ''
        }
    },

})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer