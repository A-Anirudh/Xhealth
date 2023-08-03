import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { ThemeProvider, createTheme } from '@mui/material';
import { LoginUser, DashboardUser, DashboardDoctor, LoginDoctor, LoginHospital } from './screens';
import { PrivateRoutes } from './components';

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
      lg: 1200,
      xl: 1536,
    },
  },
});

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path='login_doctor' element={<LoginDoctor />} />
      <Route path='login_hospital' element={<LoginHospital />} />
      <Route path='/' element={<LoginUser />}>
        <Route path='login_user' element={<LoginUser />} />
      </Route>
      <Route path='/' element={<PrivateRoutes />}>
        <Route path='profile_doctor' element={<DashboardDoctor />} />
        <Route path='profile_user' element={<DashboardUser />} />
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
