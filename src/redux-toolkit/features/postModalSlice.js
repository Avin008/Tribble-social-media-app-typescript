import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  postData: {},
};

const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    openPostModal: (state, action) => {
      state.isModalOpen = true;
      state.postData = action.payload;
    },
    closePostModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const { openPostModal, closePostModal } = postModalSlice.actions;
export default postModalSlice.reducer;
