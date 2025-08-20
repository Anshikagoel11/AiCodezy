import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../redux/authSlicer'
import problemReducer from '../redux/problemSlicer'
import submitReducer from '../redux/submitSlicer'
import runReducer from '../redux/runsSlicer'
import solvedProblemsReducer from '../redux/problemSolvedslicer'
import dailyProblemReducer from '../redux/dailyproblemSlicer'
import aiChatReducer from '../redux/aiChatslicer'

const store = configureStore({
    reducer:{
        auth:authReducer,
        problem:problemReducer,
        submit:submitReducer,
        run:runReducer,
        solvedProblems:solvedProblemsReducer,
        dailyProblem : dailyProblemReducer,
        aiChat : aiChatReducer
    }
})

export default store;