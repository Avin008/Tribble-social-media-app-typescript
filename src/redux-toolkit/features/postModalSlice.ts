import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  isModalOpen: boolean;
  postID: string;
};

const initialState: InitialState = {
  isModalOpen: false,
  postID: "",
};

const postModalSlice = createSlice({
  name: "postModal",
  initialState,
  reducers: {
    openPostModal: (state, action: PayloadAction<InitialState>) => {
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
