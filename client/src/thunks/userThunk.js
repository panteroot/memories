import { createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const userSignup = createAsyncThunk('userSlice/userSignupData', async(user) => {
    try{       
        const { data } = await api.userSignup(user);
        localStorage.setItem('user', JSON.stringify(data))
        return data;
    }catch(e){
        console.log(e);
    }
});

export const userLogin = createAsyncThunk('userSlice/userLoginData', async(user) => {
    try{
        const { data } = await api.userLogin(user);
        localStorage.setItem('user', JSON.stringify(data))
        return data;
    }catch(e){
        console.log(e);
    }
});