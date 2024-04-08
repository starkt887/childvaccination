import { createSlice } from "@reduxjs/toolkit"

type loaderType = {
    loading: boolean
    msg?: string
    duration?: number
}
const initialState: loaderType = {
    loading: false,
    msg: "",

}

export const loaderSlice = createSlice({
    name: "loaderSlice",
    initialState,
    reducers: {
        loadPending: (state) => {
            state.loading = true;
        },
        loadDone: (state) => {
            state.loading = false;
        }
    }
})

export const { loadPending, loadDone } = loaderSlice.actions

export default loaderSlice.reducer