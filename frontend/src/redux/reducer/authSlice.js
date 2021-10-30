import { createSlice } from "@reduxjs/toolkit";
const jwt = require("jsonwebtoken");

const authSlice = createSlice({
  name: "authSlice",
  initialState: {
    token: localStorage.getItem("token"),
    // isValid: jwt.verify(localStorage.getItem("token"), "SECRET_KEY") || false,
  },
  reducers: {
    setAuth(state, action) {
      // state.user = action.payload.user;
      state.token = localStorage.getItem("token") || "";
    },
    logout(state, action) {
      // state.user = null;
      // state.isValid = false;
      state.token = localStorage.removeItem("token");
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
