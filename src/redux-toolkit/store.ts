import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/authSlice";
import collectionListSlice from "./features/collectionListSlice";
import collectionModalSlice from "./features/collectionModalSlice";
import createPostModalSlice from "./features/createPostModalSlice";
import postModalSlice from "./features/postModalSlice";
import postOptionsModalSlice from "./features/postOptionsModalSlice";
import updatePostModalSlice from "./features/updatePostModalSlice";
import userSlice from "./features/userSlice";

export const store = configureStore({
  reducer: {
    authSlice,
    postModalSlice,
    userSlice,
    collectionModalSlice,
    postOptionsModalSlice,
    collectionListSlice,
    createPostModalSlice,
    updatePostModalSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
