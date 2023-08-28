import { createSlice } from "@reduxjs/toolkit";

const initialState = null ; // You can set it to null initially if it's a single patient ID

const patientIdSlice = createSlice({
  name: "patientId",
  initialState,
  reducers: {
    setPatientId: (state, action) => {
      return action.payload; // Update the state by returning the new value
    },
  },
});

export const { setPatientId } = patientIdSlice.actions;
export default patientIdSlice.reducer;
