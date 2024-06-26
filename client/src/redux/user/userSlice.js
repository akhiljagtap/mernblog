import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentUser: null,
    loading: false,
    error: null

}
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        signInStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        signInSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.loading = false;
            state.error = null;
        },
        signInFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        updateStart: (state) => {
            state.error = null;
            state.loading = true;

        },
        updateSuccess: (state, action) => {
            state.currentUser = action.payload;
            state.error = null;
            state.loading = false;

        },
        updateFailure: (state, action) => {
            state.error = action.payload;
            state.loading = false;
        },
        deleteStart: (state) => {
            state.loading = true;
            state.error = null;
        },
        deleteSuccess: (state) => {
            state.currentUser = null;
            state.error = null;
            state.loading = false;

        },
        deleteFailure: (state, action) => {
            state.error = action.payload;
            state.loading = null;
        },
        signoutSuccess: (state, action) => {
            state.currentUser = null;
            state.loading = false;
            state.error = null

        }






    }
})

export const
    { signInStart, signInSuccess, signInFailure,
        updateStart, updateSuccess, updateFailure,
        deleteStart, deleteSuccess, deleteFailure, signoutSuccess } = userSlice.actions
export default userSlice.reducer
