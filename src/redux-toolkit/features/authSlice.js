import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  authStatus: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action) => {
      state.authStatus = action.payload.authStatus;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token);
    },
    removeAuth: (state) => {
      state.authStatus = false;
      state.token = "";
      localStorage.removeItem("token");
    },
  },
});

export const { addAuth, removeAuth } = authSlice.actions;
export default authSlice.reducer;
