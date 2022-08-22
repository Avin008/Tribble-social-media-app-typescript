import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPostOptionsModalOpen: false,
  userID: "",
  postID: "",
  userData: {},
};

const postOptionsModalSlice = createSlice({
  name: "postOptionsModal",
  initialState,
  reducers: {
    openPostOptionsModal: (state, action) => {
      state.isPostOptionsModalOpen = true;
      state.userID = action.payload.userID;
      state.postID = action.payload.postID;
      state.userData = action.payload.userData;
    },
    closePostOptionsModal: (state) => {
      state.isPostOptionsModalOpen = false;
    },
  },
});

export const { openPostOptionsModal, closePostOptionsModal } =
  postOptionsModalSlice.actions;

export default postOptionsModalSlice.reducer;
