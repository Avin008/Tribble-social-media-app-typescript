import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  collectionModal: boolean;
};

const initialState: InitialState = {
  collectionModal: false,
};

const collectionModalSlice = createSlice({
  name: "collectionModal",
  initialState,
  reducers: {
    openCollectionModal: (state) => {
      state.collectionModal = true;
    },
    closeCollectionModal: (state) => {
      state.collectionModal = false;
    },
  },
});

export const { openCollectionModal, closeCollectionModal } =
  collectionModalSlice.actions;

export default collectionModalSlice.reducer;
