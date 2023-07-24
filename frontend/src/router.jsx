import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { PrivateRoutes } from './components';
import App from './App.jsx';
import { LoginUser } from './screens';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<LoginUser />}>
      {/* <Route index={true} path='/' element={<HomeScreen />} /> */}
      {/* <Route path='/login_user' element={<LoginUser />} /> */}
      {/* <Route path='/register' element={<RegisterScreen />} /> */}

      <Route path='' element={<PrivateRoutes />}>
        {/* <Route path='/dashboard' element={<Dashboard />} /> */}
        {/* <Route path='/profile_user' element={<Profile />} /> */}
      </Route>
    </Route>
  )
);