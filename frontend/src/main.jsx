import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import store from './store.js'
import { Provider } from 'react-redux';
import { router } from './router';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
  status: {
    primary: "#1DB954",
    secondary: "#313131"
  },
});


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </React.StrictMode>
  </Provider>
);
