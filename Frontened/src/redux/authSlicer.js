import axiosClient from "../../utils/axiosClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/register", userData);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("/user/login", credentials);
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axiosClient.post("/user/login");
      return null;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const checkAuth = createAsyncThunk(
  "auth/check",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/user/login");
      return response.data.user;
    } catch (error) {
      return rejectWithValue(error);
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
  reducers: {},
  extraReducers: (builder) => {
    builder

      //register user cases
      .addCase(registerUser.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.pending = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Something went wrong";
        state.isAuthenticated = false;
        state.user = null;
      })

      //login cases
      .addCase(loginUser.pending, (state) => {
        state.pending = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.pending = false;
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
        (state.loading = true), (state.error = null);
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.error = action.payload?.message;
        state.user = null;
        state.loading = false;
        state.isAuthenticated = false;
      });
  },
});

export default authSlice.reducer;
