import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

// redux API handling
export const fetchDailyProblem = createAsyncThunk(
  "dailyProblem/fetchDailyProblem", 
  async (_,{ rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`problem/dailyProblem`);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch daily problem",
        status: error.response?.status,
        showToUser: true,
      });
    }
  }
);

// Initial state
const initialState = {
  dailyProblem: null,  
  loading: false,
  error: null,
};

// Creating slice
const dailyProblemSlice = createSlice({
  name: "dailyProblem", 
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchDailyProblem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDailyProblem.fulfilled, (state, action) => {
        state.loading = false;
        state.dailyProblem = action.payload;
      })
      .addCase(fetchDailyProblem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch problem";
      });
  },
});


export default dailyProblemSlice.reducer;