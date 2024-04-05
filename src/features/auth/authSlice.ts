import { Draft, PayloadAction, createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateCurrentUser, updatePhoneNumber, updateProfile } from "firebase/auth"
import { auth, firestoreDb } from "../../services/firebaseService"
import { useAppDispatch } from "../../app/hooks"
import { useDispatch } from "react-redux"
import { showToast, toast } from "../toast/toastSlice"
import { doc, getDoc } from "firebase/firestore"


export type userLogin = {
    email: string
    password: string
}
type userAuthentication = {
    isAuth: boolean
}
export type userInformation = {
    uid: string
    name: string
    email: string
    mobile?: string
    address?: string//optionals
    password?: string//only used for registration
}
export interface user {
    userInfo: userInformation
    userAuth: userAuthentication
    error?: string
    loading?: boolean
}

const initialState: user = {
    userInfo: {
        uid: '',
        name: '',
        email: '',
        mobile: '',
        address: ''
    },
    userAuth: {
        isAuth: false
    },
    error: '',
    loading: false
}

export const getUserProfile = createAsyncThunk("userSlice/getUserProfile", async (uid: string) => {

    const userRef = doc(firestoreDb, "users", uid)
    const userSnap = await getDoc(userRef);
    let userData = {
        ...userSnap.data() as userInformation
    }
    return userData
})


export const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        // registerUser: (state, action: PayloadAction<userInformation>) => {
        //     console.log(action.payload)
        //     registerUserUp(action.payload)

        // },
        loginUser: (state, action: PayloadAction<userAuthentication>) => {
            // console.log(action.payload)
            state.userAuth = action.payload
        },
        updateProfile: (state, action: PayloadAction<userInformation>) => {
            state.userInfo = { ...state.userInfo, ...action.payload }
        },
        logoutUser: (state) => {

            state.userAuth = {
                isAuth: false
            }
            state.userInfo = {
                uid: '',
                name: '',
                email: '',
                mobile: '',
                address: ''
            }
            state.error = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getUserProfile.pending, (state) => {
                state.loading = true
            })
            .addCase(getUserProfile.fulfilled, (state, action: PayloadAction<userInformation>) => {
                state.userInfo = action.payload
                state.loading = false
            })
            .addCase(getUserProfile.rejected, (state) => {
                state.loading = false
            })
    }

})

export const { loginUser, logoutUser } = userSlice.actions
export default userSlice.reducer