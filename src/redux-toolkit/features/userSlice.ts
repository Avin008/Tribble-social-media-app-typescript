import { createSlice } from "@reduxjs/toolkit";
import { User } from "../../types/type";

type InitialState = {
  loggedInUser: User;
};

const initialState: InitialState = {
  loggedInUser: {
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

const userSlice = createSlice({
  name: "userInfo",
  initialState,
  reducers: {
    initiateUserData: (state, action) => {
      state.loggedInUser = action.payload.userInfo;
    },
  },
});

export const { initiateUserData } = userSlice.actions;
export default userSlice.reducer;
