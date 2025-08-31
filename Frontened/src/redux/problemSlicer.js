import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

// redux API handling
export const fetchProblem = createAsyncThunk(
  "problem/fetchProblem", 
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`problem/problemById/${id}`);
      // console.log(response.data)
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch problem",
        status: error.response?.status,
        showToUser: true,
      });
    }
  }
);

// Initial state
const initialState = {
  problem: null,  
  loading: false,
  error: null,
};

// Creating slice
const problemSlice = createSlice({
  name: "problem", 
  initialState,
//   reducers: {
//     // You can add other synchronous reducers here if needed
//     clearProblem: (state) => {
//       state.problem = null;
//       state.error = null;
//     }
//   },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProblem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProblem.fulfilled, (state, action) => {
        state.loading = false;
        state.problem = action.payload;
      })
      .addCase(fetchProblem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to fetch problem";
      });
  },
});

// Export actions and reducer
export const { clearProblem } = problemSlice.actions;
export default problemSlice.reducer;