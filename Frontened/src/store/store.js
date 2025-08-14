import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlicer'
import problemReducer from '../redux/problemSlicer'
import submitReducer from '../redux/submitSlicer'
const store = configureStore({
    reducer:{
        auth:authReducer,
        problem:problemReducer,
        submit:submitReducer
    }
})

export default store;