import { configureStore } from "@reduxjs/toolkit";
import postSlice from "./postSlice";
import userSlice from "./userSlice";

export default configureStore({
    reducer: {
        postReducer: postSlice,
        userReducer: userSlice
    }
});
