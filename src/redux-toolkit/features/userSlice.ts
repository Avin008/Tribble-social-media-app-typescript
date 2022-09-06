import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  loggedInUser: any;
};

const initialState: InitialState = {
  loggedInUser: {},
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
