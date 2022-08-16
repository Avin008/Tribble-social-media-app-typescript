import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import postModalSlice from "./features/postModalSlice";
export const store = configureStore({
  reducer: {
    authSlice,
    postModalSlice,
  },
});
