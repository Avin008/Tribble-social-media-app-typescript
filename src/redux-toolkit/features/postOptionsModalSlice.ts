import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../types/type";

type InitialState = {
  isPostOptionsModalOpen: boolean;
  userID: string;
  postID: string;
  postData: User;
};

const initialState: InitialState = {
  isPostOptionsModalOpen: false,
  userID: "",
  postID: "",
  postData: {
    userId: "",
    username: "",
    profileImg: "",
    fullname: "",
    emailAddress: "",
    bio: "",
    portfolio: "",
    following: [],
    followers: [],
    savedPost: [],
    dateCreated: null,
  },
};

const postOptionsModalSlice = createSlice({
  name: "postOptionsModal",
  initialState,
  reducers: {
    openPostOptionsModal: (state, action: PayloadAction<InitialState>) => {
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
