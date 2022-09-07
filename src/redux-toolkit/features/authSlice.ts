import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  authStatus: boolean;
  token: string | null;
};

const initialState: InitialState = {
  authStatus: localStorage.getItem("token") ? true : false,
  token: localStorage.getItem("token"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    addAuth: (state, action: PayloadAction<InitialState>) => {
      state.authStatus = action.payload.authStatus;
      state.token = action.payload.token;
      localStorage.setItem("token", action.payload.token!);
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
