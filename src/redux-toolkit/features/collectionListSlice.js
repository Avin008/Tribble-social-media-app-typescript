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
    toggleCollectionList: (state) => {
      state.isCollectionListOpen = !state.isCollectionListOpen;
    },
  },
});

export const { openCollectionList, closeCollectionList, toggleCollectionList } =
  collectionListSlice.actions;

export default collectionListSlice.reducer;
