import React from 'react';
import ReactDOM from 'react-dom/client'; 
import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom'; 
import { Provider } from 'react-redux';
import store from './store.js';
import { ThemeProvider, createTheme } from '@mui/material';
import { LoginUser, LoginDoc, DashboardUser,DashboardDoc } from './screens';
import { DoctorPrivateRoutes, PrivateRoutes } from './components';

import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import App from './App.jsx';

const theme = createTheme({
  status: {
    primary: "#1DB954",
    secondary: "#313131"
  },
});

const AppRouter = () => (
  <Router>
    <Routes>
      <Route path='/' element={<App />}/>
      <Route path='/login_user' element={<LoginUser />} />
      <Route path='/login_doc' element={<LoginDoc />} />


      
      <Route path='' element={<PrivateRoutes />}>
        <Route path='profile_user' element={<DashboardUser />} />

      </Route>

      <Route path='' element={<DoctorPrivateRoutes />}>
        <Route path='profile_doc' element={<DashboardDoc />} />
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
