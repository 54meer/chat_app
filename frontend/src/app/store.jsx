import { configureStore } from "@reduxjs/toolkit";
import authReducer from '../features/auth/authSlice';
import chatReducer from '../features/chat/chatSlice';
import themeReducer from '../features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
    theme: themeReducer,
  },
});