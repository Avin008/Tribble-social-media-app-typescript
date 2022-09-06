import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  postID: "",
};

const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    openPostModal: (state, action) => {
      state.isModalOpen = true;
      state.postID = action.payload.postID;
    },
    closePostModal: (state) => {
      state.isModalOpen = false;
      state.postID = "";
    },
  },
});

export const { openPostModal, closePostModal } = postModalSlice.actions;
export default postModalSlice.reducer;
