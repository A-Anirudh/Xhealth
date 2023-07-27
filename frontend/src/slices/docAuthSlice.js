import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  docInfo: localStorage.getItem('docInfo')
    ? JSON.parse(localStorage.getItem('docInfo'))
    : null,
};

const docAuthSlice = createSlice({
  name: 'docAuth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.docInfo = action.payload;
      localStorage.setItem('docInfo', JSON.stringify(action.payload));
    },
    logout: (state, action) => {
      state.docInfo = null;
      localStorage.removeItem('docInfo');
    },
  },
});

export const { setCredentials, logout } = docAuthSlice.actions;

export default docAuthSlice.reducer;
