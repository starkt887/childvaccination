import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IVaccinModal } from "../../modals/vaccineModal";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { firestoreDb } from "../../services/firebaseService";
import { build } from "ionicons/icons";
import { ReminderModal } from "../../modals/childModal";
import { AsyncThunkConfig, GetThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { loadDone, loadPending } from "../loader/loaderSlice";


interface IVaccineState {
    vaccineList: IVaccinModal[][]
    childVaccineList?: IVaccinModal[][]
    vaccinesForToday?: ReminderModal[]
    vaccinesForTodayLength?: number
    loading: boolean
    error: string
}

const initialState: IVaccineState = {
    vaccineList: [],
    childVaccineList: [],
    vaccinesForToday: [],
    vaccinesForTodayLength: 0,
    loading: false,
    error: '',
}

function formatVaccinesInGroups(vaccineDocs: IVaccinModal[]): IVaccinModal[][] {
    let dayIntervals = vaccineDocs.reduce((dayIntervals: number[], current) => {
        if (!dayIntervals.includes(current.afterdays)) {
            dayIntervals.push(current.afterdays)
        }
        return dayIntervals
    }, [])
    let vaccineGroup: IVaccinModal[][] = dayIntervals.map((dayInterval) =>
        (vaccineDocs.filter((vaccine) => vaccine.afterdays === dayInterval))
    )
    return vaccineGroup
}
export const getVaccineList = createAsyncThunk("vaccineSlice/getVaccineList",
    async (arg, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
        thunkAPI.dispatch(loadPending())
        const vaccineQuery = query(collection(firestoreDb, "vaccinelist"), orderBy("afterdays"))
        const vaccineSnapshot = await (await getDocs(vaccineQuery)).docs
        let vaccineDocs: IVaccinModal[] = vaccineSnapshot.map(vaccine => ({ id: vaccine.id, ...vaccine.data() } as IVaccinModal))
        // console.log(vaccineDocs)

        //grouping the vaccines based on dayIntervals
        let vaccineGroup = formatVaccinesInGroups(vaccineDocs)
        thunkAPI.dispatch(loadDone())
        return vaccineGroup;
    })

export const getMyVaccineList = createAsyncThunk("vaccineSlice/getMyVaccineList",
    async (childId: string, thunkAPI: GetThunkAPI<AsyncThunkConfig>) => {
        // console.log(childId)
        thunkAPI.dispatch(loadPending())
        const vaccineQuery = query(collection(firestoreDb, "children", childId, "vaccinelist"), orderBy("afterdays"))
        const vaccineSnapshot = await (await getDocs(vaccineQuery)).docs
        let vaccineDocs: IVaccinModal[] = vaccineSnapshot.map(vaccine => ({ id: vaccine.id, ...vaccine.data() } as IVaccinModal))
        //  console.log(vaccineDocs)

        //grouping the vaccines based on dayIntervals
        let vaccineGroup = formatVaccinesInGroups(vaccineDocs)
        thunkAPI.dispatch(loadDone())
        return vaccineGroup;
    })

export const vaccineSlice = createSlice({
    name: "vaccineSlice",
    initialState,
    reducers: {
        setTodaysVaccines: (state, action: PayloadAction<ReminderModal[]>) => {

            if (action.payload.length > 0) {
                state.vaccinesForToday = action.payload

                let vaccineCntPerChildren = (action.payload.map((child) => child.vaccines.length))
                let totalVaccineRemindersCnt = vaccineCntPerChildren.reduce((sum, current) => sum + current)
                state.vaccinesForTodayLength = totalVaccineRemindersCnt
            }
        }
    },
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
            .addCase(getMyVaccineList.pending, (state) => {
                state.loading = true
            })
            .addCase(getMyVaccineList.fulfilled, (state, action: PayloadAction<IVaccinModal[][]>) => {
                state.loading = false
                state.childVaccineList = action.payload
            })
            .addCase(getMyVaccineList.rejected, (state, action) => {
                state.loading = false
            })
    }
})

export const { setTodaysVaccines } = vaccineSlice.actions;
export default vaccineSlice.reducer