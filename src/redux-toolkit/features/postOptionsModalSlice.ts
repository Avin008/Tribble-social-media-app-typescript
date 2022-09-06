import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isPostOptionsModalOpen: boolean;
  userID: string;
  postID: string;
  postData: any;
};

const initialState: InitialState = {
  isPostOptionsModalOpen: false,
  userID: "",
  postID: "",
  postData: {},
};

const postOptionsModalSlice = createSlice({
  name: "postOptionsModal",
  initialState,
  reducers: {
    openPostOptionsModal: (state, action) => {
      state.isPostOptionsModalOpen = true;
      state.userID = action.payload.userID;
      state.postID = action.payload.postID;
      state.postData = action.payload.postData;
    },
    closePostOptionsModal: (state) => {
      state.isPostOptionsModalOpen = false;
    },
  },
});

export const { openPostOptionsModal, closePostOptionsModal } =
  postOptionsModalSlice.actions;

export default postOptionsModalSlice.reducer;
