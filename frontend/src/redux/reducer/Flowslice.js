import { createSlice } from "@reduxjs/toolkit";

const Flowslice = createSlice({
  name: "FlowSlice",
  initialState: { show: false, id: 0, subcourse: false },
  reducers: {
    setFlow(state, action) {
      state.show = action.payload.show;
      state.subcourse = action.payload.subcourse;
      state.id = action.payload.id;
    },
    reset(state, action) {
      state.show = false;
      state.subcourse = false;
      state.id = 0;
    },
  },
});

export const flowAction = Flowslice.actions;
export default Flowslice.reducer;
