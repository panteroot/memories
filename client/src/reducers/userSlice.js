import { createSlice } from "@reduxjs/toolkit";
import { userSignup, userLogin } from "../thunks/userThunk";


const userSlice = createSlice({
    name: 'userSlice',
    initialState: {
        user: []
    },
    reducers: {
        loginGoogle: (state, action) => {
            state.user = action.payload
            localStorage.setItem('user', JSON.stringify(action.payload))
        },
        logout: (state) => {
            state.user = null
            localStorage.removeItem('user')
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(userSignup.fulfilled, (state, action) => {
                state.user = action.payload  
            })
            .addCase(userLogin.fulfilled, (state, action) => {
                state.user = action.payload
            })
    }
});

export const { loginGoogle, logout } = userSlice.actions;

export default userSlice.reducer;