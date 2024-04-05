import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { loginUser } from "../auth/authSlice"


type toastBasic = {
    msg: string
    color: string
}

export interface toast {
    toast: toastBasic
    isOpen: boolean
    interval: number
}

const initialState: toast = {
    toast: {
        msg: '',
        color: 'dark'
    },
    isOpen: false,
    interval: 3000
}

export const toastSlice = createSlice({
    name: 'toastSlice',
    initialState,
    reducers: {
        showToast: (state, action: PayloadAction<toastBasic>) => {
            state.toast.msg = action.payload.msg
            state.toast.color = action.payload.color
            state.isOpen = true

        },
        showCustomToast: (state, action: PayloadAction<toast>) => {
            state = { ...action.payload }
        },
        resetToast: (state) => {
            // console.log("resetting to initial state")
            state.toast.msg = ""
            state.toast.color = "dark"
            state.isOpen = false
        }
    }

})

export const { showToast, showCustomToast, resetToast } = toastSlice.actions
export default toastSlice.reducer