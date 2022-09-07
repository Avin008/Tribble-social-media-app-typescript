import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  isUpdatePostModalOpen: boolean;
};

const initialState: InitialState = {
  isUpdatePostModalOpen: false,
};

const updatePostModalSlice = createSlice({
  name: "updatePostModal",
  initialState,
  reducers: {
    openUpdatePostModal: (state) => {
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
