import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IHospitalModal } from "../../modals/hospitalModal"
import { collection, getDocs, query } from "firebase/firestore"
import { firestoreDb } from "../../services/firebaseService"
import { AsyncThunkConfig, GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk"
import { loadDone, loadPending } from "../loader/loaderSlice"


interface IHospitalSliceModal {
    hospitalList: IHospitalModal[]
    error: string
}

const initialState: IHospitalSliceModal = {
    hospitalList: [],
    error: ""
}

export const getHosipitalList = createAsyncThunk(("hospitalSlice/getHosipitalList"),
    async (arg,thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
        thunkAPI.dispatch(loadPending())
        const hospitalQ = query(collection(firestoreDb, "hospital"))
        const hospitalDocs = (await getDocs(hospitalQ)).docs
        let hospitalList: IHospitalModal[] = hospitalDocs.map((hospital) =>
            ({ id: hospital.id, ...hospital.data() } as IHospitalModal))
        thunkAPI.dispatch(loadDone())
        return hospitalList
    })

const hospitalSlice = createSlice({
    name: "hospitalSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // .addCase(getHosipitalList.pending, (state) => {
            //     state.loading = true;
            // })
            .addCase(getHosipitalList.fulfilled, (state, action: PayloadAction<IHospitalModal[]>) => {
                state.hospitalList = action.payload
            })
            // .addCase(getHosipitalList.rejected, (state, action: any) => {
            //     state.loading = false;
            //     state.error = action.payload
            // })
    }
})

export const { } = hospitalSlice.actions

export default hospitalSlice.reducer