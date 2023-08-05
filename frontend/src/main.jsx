import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { ThemeProvider, createTheme } from '@mui/material';
import { LoginUser, DashboardUser, DashboardDoctor, LoginDoctor, LoginHospital, SignupUser } from './screens';
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
  'blue-100': "#F2F6FE",
  'blue-150': "#4145D1",
  'blue-500': "#272848",
  'green-olive': "#79AC6E",
  'gray-200': "#7A7575",
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
      <Route path='login-doctor' element={<LoginDoctor />} />
      <Route path='login-hospital' element={<LoginHospital />} />
      <Route path='login-user' element={<LoginUser />} />
      <Route path='signup-user' element={<SignupUser />} />
      <Route path="/" element={<UserPrivateRoutes />}>
        <Route path='profile-user' element={<DashboardUser />} />
      </Route>
      <Route path="/" element={<DoctorPrivateRoutes />}>
        <Route path='profile-doctor' element={<DashboardDoctor />} />
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
