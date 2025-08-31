import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

// redux API handling
export const runProblem = createAsyncThunk(
  "run/runProblem", 
  async ({runCode, id}, { rejectWithValue }) => {
  
    try {
      
      const response = await axiosClient.post(`submission/run/${id}` , runCode);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to run problem",
        status: error.response?.status,
        showToUser: true,
      });
    }
  }
);

// Initial state
const initialState = {
  runResult: null,  
  loading: false,
  error: null,
  waiting:true
};

// Creating slice
const runSlice = createSlice({
  name: "run", 
  initialState,
  reducers: {
    resetRunState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(runProblem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.waiting=true
      })
      .addCase(runProblem.fulfilled, (state, action) => {
        state.loading = false;
        state.runResult = action.payload;
        state.waiting=false
      })

      .addCase(runProblem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to run problem";
        state.waiting=false
      });
  },
});

// Export actions and reducer
export const { resetRunState } = runSlice.actions;
export default runSlice.reducer;