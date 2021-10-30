import { createSlice } from "@reduxjs/toolkit";

const Flowslice = createSlice({
  name: "FlowSlice",
  initialState: { updateCourseList: null },
  reducers: {
    setFlow(state, action) {
      state.updateCourseList = action.payload.courseAdd;
    },
    reset(state, action) {
      state.updateCourseList = null;
    },
  },
});

export const flowAction = Flowslice.actions;
export default Flowslice.reducer;
