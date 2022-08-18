import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import collectionModalSlice from "./features/collectionModalSlice";
import postModalSlice from "./features/postModalSlice";
import userSlice from "./features/userSlice";
export const store = configureStore({
  reducer: {
    authSlice,
    postModalSlice,
    userSlice,
    collectionModalSlice,
  },
});
