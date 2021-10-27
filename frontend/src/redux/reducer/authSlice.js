import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "authSlice",
  initialState: { token: localStorage.getItem("token") || null },
  reducers: {
    setAuth(state, action) {
      // state.user = action.payload.user;
      state.token = localStorage.getItem("token");
    },
    logout(state, action) {
      // state.user = null;
      state.token = localStorage.removeItem("token");
    },
  },
});

export const authAction = authSlice.actions;
export default authSlice.reducer;
