import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVaccinModal } from "../../modals/vaccineModal";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestoreDb } from "../../services/firebaseService";
import { build } from "ionicons/icons";


interface IVaccineState {
    vaccineList: IVaccinModal[][],
    loading: boolean
    error: string
}

const initialState: IVaccineState = {
    vaccineList: [],
    loading: false,
    error: '',
}

export const getVaccineList = createAsyncThunk("vaccineSlice/getVaccineList",
    async () => {
        const vaccineQuery = query(collection(firestoreDb, "vaccinelist"), orderBy("afterdays"))
        const vaccineSnapshot = await (await getDocs(vaccineQuery)).docs
        let vaccineDocs: IVaccinModal[] = vaccineSnapshot.map(vaccine => ({ id: vaccine.id, ...vaccine.data() } as IVaccinModal))
        // console.log(vaccineDocs)

        //grouping the vaccines based on dayIntervals
        let dayIntervals = vaccineDocs.reduce((dayIntervals: number[], current) => {
            if (!dayIntervals.includes(current.afterdays)) {
                dayIntervals.push(current.afterdays)
            }
            return dayIntervals
        }, [])
        let vaccineGroup: IVaccinModal[][] = dayIntervals.map((dayInterval) =>
            (vaccineDocs.filter((vaccine) => vaccine.afterdays === dayInterval))
        )
        return vaccineGroup;
    })

export const vaccineSlice = createSlice({
    name: "vaccineSlice",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getVaccineList.pending, (state) => {
                state.loading = true
            })
            .addCase(getVaccineList.fulfilled, (state, action: PayloadAction<IVaccinModal[][]>) => {
                state.loading = false
                state.vaccineList = action.payload
            })
            .addCase(getVaccineList.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export const { } = vaccineSlice.actions;
export default vaccineSlice.reducer