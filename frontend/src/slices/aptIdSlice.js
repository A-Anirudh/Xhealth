import { createSlice } from "@reduxjs/toolkit";

const initialState = null ; // You can set it to null initially if it's a single apt ID

const aptIdSlice = createSlice({
  name: "aptId",
  initialState,
  reducers: {
    setAptId: (state, action) => {
      return action.payload; // Update the state by returning the new value
    },
  },
});

export const { setAptId } = aptIdSlice.actions;
export default aptIdSlice.reducer;
