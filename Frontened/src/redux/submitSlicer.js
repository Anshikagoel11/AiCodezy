import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

// redux API handling
export const submitProblem = createAsyncThunk(
  "submit/submitProblem", 
  async ({submitCode, id}, { rejectWithValue }) => {
  // console.log(submitCode.language)
    try {
      const response = await axiosClient.post(`submission/submit/${id}` , submitCode);
      console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to submit problem",
        status: error.response?.status,
        showToUser: true,
      });
    }
  }
);

// Initial state
const initialState = {
  submitResult: null,  
  loading: false,
  error: null,
  waiting:true
};

// Creating slice
const submitSlice = createSlice({
  name: "submit", 
  initialState,
  reducers: {
    resetSubmitState: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitProblem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.waiting=true
      })
      .addCase(submitProblem.fulfilled, (state, action) => {
        state.loading = false;
        state.submitResult = action.payload;
        state.waiting=false
      })

      .addCase(submitProblem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to submit problem";
        state.waiting=false
      });
  },
});

// Export actions and reducer
export const { resetSubmitState } = submitSlice.actions;
export default submitSlice.reducer;