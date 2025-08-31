import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosClient from "../utils/axiosClient";

// Async thunk
export const fetchAiResponse = createAsyncThunk(
  "aiResponse/fetchAiResponse",
  async ({ chatHistory, problemDetails }, { rejectWithValue, dispatch }) => {
    try {
    
      const response = await fetch(`${axiosClient.defaults.baseURL}ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          chatHistory,
          problemDetails,
        }),
        credentials:'include'
      });

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedText = '';
      
      // Create a placeholder for the streaming message
      const messageId = Date.now();
      dispatch(addStreamingMessage({ id: messageId, role: "model", parts: [{ text: "" }] }));
      
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        const chunk = decoder.decode(value);
        const lines = chunk.split('\n');
        
        for (const line of lines) {
          if (line.startsWith('data: ')) {
            const data = line.substring(6);
            
            if (data === '[DONE]') {
              // Streaming complete
              dispatch(completeStreamingMessage({ id: messageId }));
              return;
            }
            
            try {
              const parsed = JSON.parse(data);
              
              if (parsed.error) {
                throw new Error(parsed.error);
              }
              
              if (parsed.text) {
                accumulatedText += parsed.text;
                dispatch(updateStreamingMessage({ 
                  id: messageId, 
                  text: accumulatedText 
                }));
              }
            } catch (e) {
              console.error('Error parsing SSE data:', e);
            }
          }
        }
      }
      
      return { role: "model", parts: [{ text: accumulatedText }] };
    } catch (error) {
      return rejectWithValue({
        message:
          error.message ||
          "Server down! Please wait OR try again later",
        showToUser: true,
      });
    }
  }
);

const initialState = {
  chatHistory: [],
  loading: false,
  error: null,
  problemId: null
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
    trackId: (state, action) => {
      state.problemId = action.payload;
    },
    addStreamingMessage: (state, action) => {
      state.chatHistory = [...state.chatHistory, { ...action.payload, streaming: true }];
    },
    updateStreamingMessage: (state, action) => {
      const { id, text } = action.payload;
      state.chatHistory = state.chatHistory.map(msg => 
        msg.id === id ? { ...msg, parts: [{ text }] } : msg
      );
    },
    completeStreamingMessage: (state, action) => {
      const { id } = action.payload;
      state.chatHistory = state.chatHistory.map(msg => 
        msg.id === id ? { ...msg, streaming: false } : msg
      );
    },
    appendToLastMessage: (state, action) => {
      if (state.chatHistory.length > 0) {
        const lastMessage = state.chatHistory[state.chatHistory.length - 1];
        if (lastMessage.role === "model") {
          lastMessage.parts[0].text += action.payload;
        }
      }
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
        // If we didn't use streaming, add the response
        if (action.payload) {
          state.chatHistory = [...state.chatHistory, action.payload];
        }
      })
      .addCase(fetchAiResponse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Server down! Please wait OR try again later";
        // Remove any streaming messages on error
        state.chatHistory = state.chatHistory.filter(msg => !msg.streaming);
      });
  },
});

export const { 
  resetChat, 
  updateChat, 
  trackId, 
  addStreamingMessage, 
  updateStreamingMessage, 
  completeStreamingMessage,
  appendToLastMessage 
} = aiChatSlice.actions;
export default aiChatSlice.reducer;