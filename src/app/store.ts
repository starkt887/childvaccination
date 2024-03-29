import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../features/auth/authSlice"
import toastReducer from "../features/toast/toastSlice"
import childrenReducer from "../features/children/childrenSlice"
import vaccineReducer from "../features/vaccine/vaccineSlice"

export const store = configureStore({
    reducer: {
        userReducer,
        toastReducer,
        childrenReducer,
        vaccineReducer
    }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch