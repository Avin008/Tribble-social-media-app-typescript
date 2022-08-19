import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPostOptionsModalOpen: false,
};

const postOptionsModalSlice = createSlice({
  name: "postOptionsModal",
  initialState,
  reducers: {
    openPostOptionsModal: (state) => {
      state.isPostOptionsModalOpen = true;
    },
    closePostOptionsModal: (state) => {
      state.isPostOptionsModalOpen = false;
    },
  },
});

export const { openPostOptionsModal, closePostOptionsModal } =
  postOptionsModalSlice.actions;

export default postOptionsModalSlice.reducer;
