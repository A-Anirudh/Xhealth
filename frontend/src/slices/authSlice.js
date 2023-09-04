import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  doctorInfo: localStorage.getItem('doctorInfo')
    ? JSON.parse(localStorage.getItem('doctorInfo'))
    : null,
  hospitalInfo: localStorage.getItem('hospitalInfo')
    ? JSON.parse(localStorage.getItem('hospitalInfo'))
    : null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
    },
    userLogout: (state, action) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
    },
    setDoctorCredentials: (state, action) => {
      state.doctorInfo = action.payload;
      localStorage.setItem('doctorInfo', JSON.stringify(action.payload));
    },
    doctorLogout: (state, action) => {
      state.doctorInfo = null;
      localStorage.removeItem('doctorInfo');
      localStorage.removeItem('reason');
    },
    setHospitalCredentials: (state, action) => {
      state.hospitalInfo = action.payload;
      localStorage.setItem('hospitalInfo', JSON.stringify(action.payload));
    },
    hospitalLogout: (state, action) => {
      state.hospitalInfo = null;
      localStorage.removeItem('hospitalInfo');
    },
  },
});

export const { setUserCredentials, userLogout, setDoctorCredentials, doctorLogout, hospitalLogout, setHospitalCredentials } = authSlice.actions;

export default authSlice.reducer;
