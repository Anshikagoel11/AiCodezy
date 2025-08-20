import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

// Async thunk
export const fetchAiResponse = createAsyncThunk(
  "aiResponse/fetchAiResponse",
  async ({ chatHistory, problemDetails }, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post("ai/chat", {
        chatHistory,
        problemDetails,
      });
      return response.data; // Must be { role: "model", parts: [{ text: "..." }] }
    } catch (error) {
      return rejectWithValue({
        message:
          error.response?.data?.message ||
          "Server down! Please wait OR try again later",
        status: error.response?.status,
        showToUser: true,
      });
    }
  }
);

const initialState = {
  chatHistory: [],
  loading: false,
  error: null,
  problemId:null
};

const aiChatSlice = createSlice({
  name: "aiResponse",
  initialState,
  reducers: {
    resetChat: (state) => {
      state.chatHistory = [];
      state.error = null;
    },
    updateChat: (state, action) => {
      state.chatHistory = [...state.chatHistory, action.payload];
    },
    trackId : (state,action)=>{
      state.problemId = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAiResponse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAiResponse.fulfilled, (state, action) => {
        state.loading = false;
        state.chatHistory = [...state.chatHistory, action.payload];
      })
      .addCase(fetchAiResponse.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          "Server down! Please wait OR try again later";
      });
  },
});

export const { resetChat, updateChat ,trackId } = aiChatSlice.actions;
export default aiChatSlice.reducer;
