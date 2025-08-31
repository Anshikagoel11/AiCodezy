import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

// redux API handling
export const fetchSolvedProblems = createAsyncThunk(
  "solvedProblems/fetchSolvedProblems",

  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get(`submission/ProblemsSolvedByUser`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          "Failed to fetch problem solved by user",
        status: error.response?.status,
        showToUser: true,
      });
    }
  }
);

// Initial state
const initialState = {
  solvedproblems: null,
  loading: false,
  error: null,
};

// Creating slice
const solvedProblemsSlice = createSlice({
  name: "solvedProblems",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchSolvedProblems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSolvedProblems.fulfilled, (state, action) => {
        state.loading = false;
        state.solvedproblems = action.payload;
      })
      .addCase(fetchSolvedProblems.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message || "Failed to fetch problems solved by user";
      });
  },
});

// Export actions and reducer
export default solvedProblemsSlice.reducer;
