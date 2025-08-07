import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

// redux API handling
export const registerUser = createAsyncThunk(
  "auth/register", //  slicename/actiontype
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("user/register", userData);
      return response.data.user;
    } catch (error) {
      console.log(error)
      return rejectWithValue({
        message: error?.response?.data?.message || "Something Went Wrong",
        code: error.code,
        showToUser:true
      });
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("user/login", credentials);
      return response.data.user;
    } catch (error) {
      // console.log(error)
      return rejectWithValue({
       message: error?.response?.data?.message || "Something Went Wrong",
        code: error.code,
      });
    }
  }
);

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post("user/logout");
      return null;
    } catch (error) {
      return rejectWithValue({
       message: error?.response?.data?.message || "Something Went Wrong",
        code: error.code,
      });
    }
  }
);

export const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("user/checkAuth");
      return response.data.user;
    } catch (error) {
      return rejectWithValue({
       message: error?.response?.data?.message || "Something Went Wrong",
        code: error.code,
      });
    }
  }
);

//creating slice
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null,
  },
  reducers: {
    clearError : (state)=> {state.error =  null}
  },
  extraReducers: (builder) => {
    builder

      //register  cases
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error =null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload; // to handel edge cases - if somehow data is missing in response
        state.user = action.payload;
        state.error=null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";  //rejectWithValue se bheja hua object action.payload me aata h
        state.isAuthenticated = false;
        state.user = null;
      })

      //login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        state.isAuthenticated = false;
        state.user = null;
      })

      //logout cases
      .addCase(logoutUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.loading = false;
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        state.isAuthenticated = false;
        state.user = null;
      })

      //checkAuth cases
      .addCase(checkAuth.pending, (state) => {
        state.loading=true
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        // state.error = action.payload?.message;  // user unauthentication is not need to show to user , just redirect to auth page
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
export const  {clearError} = authSlice.actions
