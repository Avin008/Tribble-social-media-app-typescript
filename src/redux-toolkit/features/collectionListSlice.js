import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCollectionListOpen: false,
};

const collectionListSlice = createSlice({
  name: "collectionList",
  initialState,
  reducers: {
    openCollectionList: (state) => {
      state.isCollectionListOpen = true;
    },
    closeCollectionList: (state) => {
      state.isCollectionListOpen = false;
    },
  },
});

export const { openCollectionList, closeCollectionList } =
  collectionListSlice.actions;

export default collectionListSlice.reducer;
