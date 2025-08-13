import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlicer'
import problemReducer from '../redux/problemSlicer'
const store = configureStore({
    reducer:{
        auth:authReducer,
        problem:problemReducer
    }
})

export default store;