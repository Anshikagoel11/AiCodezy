import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlicer'
import problemReducer from '../redux/problemSlicer'
import submitReducer from '../redux/submitSlicer'
import runReducer from '../redux/runsSlicer'

const store = configureStore({
    reducer:{
        auth:authReducer,
        problem:problemReducer,
        submit:submitReducer,
        run:runReducer
    }
})

export default store;