import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./reducer/authSlice";
import Flowslice from "./reducer/Flowslice";

const store = configureStore({
  reducer: { flowReducer: Flowslice, authReducer: authSlice },
});
export default store;
