import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { IChildModal } from "../../modals/childModal"
import { collection, getDocs, orderBy, query, where } from "firebase/firestore"
import { firestoreDb } from "../../services/firebaseService"


interface IChildren {
    children: IChildModal[]
    currentChild: IChildModal
    loading: boolean
    error: string
}

const initialState: IChildren = {
    children: [],
    currentChild: {
        id: "",
        name: "",
        dob: "",
        gender: "",
        hospital: "",
        location: "",
        parentId: "",
    },
    loading: false,
    error: ''
}

export const getMyChildrenAT = createAsyncThunk('childrenSlice/getMyChildren',
    async (uid: string): Promise<IChildModal[]> => {
        const childrenQuery = query(collection(firestoreDb, "children"), where("parentId", "==", uid))
        const childrenSnapshot = await (await getDocs(childrenQuery)).docs
        let childrenDocs: IChildModal[] = childrenSnapshot.map(child => ({ id: child.id, ...child.data() } as IChildModal))
        // console.log(childrenDocs)
        return childrenDocs;
    })

export const childrenSlice = createSlice({
    name: 'childrenSlice',
    initialState,
    reducers: {
        setCurrentChild: (state, action: PayloadAction<string>) => {
            let child = state.children.find((child) => child.id == action.payload)
            state.currentChild = child!
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getMyChildrenAT.pending, (state) => {
                state.loading = true
            })
            .addCase(getMyChildrenAT.fulfilled, (state, action: PayloadAction<any>) => {
                state.children = action.payload
                state.error = ''
                state.loading = false
            })
            .addCase(getMyChildrenAT.rejected, (state, action) => {
                state.error = `Unable to load children:${action.payload}`
                state.loading = false
            })
    }
})

export const { setCurrentChild } = childrenSlice.actions

export default childrenSlice.reducer