import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen/LoginScreen.jsx';
import RegisterScreen from './screens/RegisterScreen.jsx';
import Dashboard from 'D:/Xhealth/frontend/src/screens/Dashboard/Dashboard.jsx';
import Profile from 'D:/Xhealth/frontend/src/screens/Profile/Profile.jsx';
import store from './store.js'
import { Provider } from 'react-redux';
import PrivateRoutes from './components/PrivateRoutes.jsx';
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<HomeScreen />} />
      <Route  path='/login' element={<LoginScreen />} />
      <Route  path='/register' element={<RegisterScreen />} />
      

      <Route path='' element={<PrivateRoutes/>}>
        <Route  path='/dashboard' element={<Dashboard/>} />
        <Route  path='/profile' element={<Profile/>} />
      </Route>
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
  </Provider>


);
