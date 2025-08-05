import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlicer'

const store = configureStore({
    reducer:{
        auth:authReducer
    }
})

export default store;