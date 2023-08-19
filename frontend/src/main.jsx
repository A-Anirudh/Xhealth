import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { ThemeProvider, createTheme } from '@mui/material';
import { LoginUser, DashboardUser, DashboardDoctor, LoginDoctor, LoginHospital, SignupUser, Appointments, LandingPage, DoctorRecommendation, PersonalHealthRecords, UserProfile, BookAppointment } from './screens';
import { DoctorPrivateRoutes, UserPrivateRoutes } from './components';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = createTheme({
  patient: {
    background: "#EDC8FF",
    primary: "#804980",
    inputDefault: "#C767C7",
    inputActive: "#804980",
  },
  doctor: {
    background: "#CFC3FF",
    primary: "#5642AA",
    inputDefault: "#ACA2D5",
    inputActive: "#5642AA",
  },
  hospital: {
    background: "#CCFFDE",
    primary: "#1DB954",
    inputDefault: "#9AE1B3",
    inputActive: "#35C367",
  },
  'purple-500': "#5642AA",
  'purple-100': "#DDCDF2",
  'purple-150': "#804980",
  'blue-100': "#F2F6FE",
  'blue-150': "#4145D1",
  'blue-500': "#272848",
  'green-olive': "#79AC6E",
  'green-150': "#AAFF98",
  'gray-200': "#7A7575",
  'yellow-200': "#FFFB93",
  'Completed': "#939EFF",
  'Scheduled': "#AAFF98",
  'In Progress': "#FFFB93",
  'Cancelled': "#FF9393",
  'Expired': "#C3C3C8",
  inputBackground: "#EEEEEE",
  primaryText: "",
  secondaryText: "#C3C3C8",
  success: "#79AC6E",
  breakpoints: {
    values: {
      xs: 0,
      xsm: 450,
      sm: 600,
      md: 900,
      lg: 1226,
      xl: 1536,
      xxl: 4000
    },
  },
});

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='login-doctor' element={<LoginDoctor />} />
      <Route path='login-hospital' element={<LoginHospital />} />
      <Route path='login-user' element={<LoginUser />} />
      <Route path='signup-user' element={<SignupUser />} />
      <Route path="/" element={<UserPrivateRoutes />}>
        <Route path='dashboard-user' element={<DashboardUser />} />
        <Route path='appointments' element={<Appointments />} />
        <Route path='book-appointment' element={<BookAppointment />} />
        <Route path='doctor-recommendation' element={<DoctorRecommendation />} />
        <Route path='health-records' element={<PersonalHealthRecords />} />
        <Route path='profile-user' element={<UserProfile />} />
      </Route>
      <Route path="/" element={<DoctorPrivateRoutes />}>
        <Route path='dashboard-doctor' element={<DashboardDoctor />} />
      </Route>

    </Routes>
  </Router>
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <AppRouter />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
