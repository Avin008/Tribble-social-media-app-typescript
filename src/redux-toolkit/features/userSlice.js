import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
