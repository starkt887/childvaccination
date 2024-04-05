import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IHospitalModal } from "../../modals/hospitalModal"
import { collection, getDocs, query } from "firebase/firestore"
import { firestoreDb } from "../../services/firebaseService"


interface IHospitalSliceModal {
    hospitalList: IHospitalModal[]
    loading: boolean
    error: string
}

const initialState: IHospitalSliceModal = {
    hospitalList: [],
    loading: false,
    error: ""
}

export const getHosipitalList = createAsyncThunk(("hospitalSlice/getHosipitalList"),
    async () => {
        const hospitalQ = query(collection(firestoreDb, "hospital"))
        const hospitalDocs = (await getDocs(hospitalQ)).docs
        let hospitalList: IHospitalModal[] = hospitalDocs.map((hospital) =>
            ({ id: hospital.id, ...hospital.data() } as IHospitalModal))
        return hospitalList
    })

const hospitalSlice = createSlice({
    name: "hospitalSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getHosipitalList.pending, (state) => {
                state.loading = true;
            })
            .addCase(getHosipitalList.fulfilled, (state, action: PayloadAction<IHospitalModal[]>) => {
                state.loading = false;
                state.hospitalList = action.payload
            })
            .addCase(getHosipitalList.rejected, (state, action: any) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})

export const { } = hospitalSlice.actions

export default hospitalSlice.reducer