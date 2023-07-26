import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store.js';
import { ThemeProvider, createTheme } from '@mui/material';
import { LoginUser, Dashboard, LoginDoctor } from './screens';
import { PrivateRoutes } from './components';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const theme = createTheme({
  status: {
    primary: "#1DB954",
    secondary: "#313131"
  },
});

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path='login_doctor' element={<LoginDoctor />} />
      <Route path='/' element={<LoginUser />}>
        <Route path='login_user' element={<LoginUser />} />

        {/* <Route path='register' element={<RegisterScreen />} /> */}
      </Route>
      <Route path='/' element={<PrivateRoutes />}>
        {/* <Route path='dashboard' element={<Dashboard />} /> */}
        <Route path='profile_user' element={<Dashboard />} />
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
