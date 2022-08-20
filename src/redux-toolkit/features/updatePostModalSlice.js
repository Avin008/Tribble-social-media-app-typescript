import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUpdatePostModalOpen: false,
};

const updatePostModalSlice = createSlice({
  name: "updatePostModal",
  initialState,
  reducers: {
    openUpdatePostModal: (state, action) => {
      state.isUpdatePostModalOpen = true;
    },
    closeUpdatePostModal: (state) => {
      state.isUpdatePostModalOpen = false;
    },
  },
});

export const { openUpdatePostModal, closeUpdatePostModal } =
  updatePostModalSlice.actions;

export default updatePostModalSlice.reducer;
