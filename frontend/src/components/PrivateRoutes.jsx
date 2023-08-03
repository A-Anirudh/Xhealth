import { Navigate,Outlet } from 'react-router-dom'
import {  useSelector } from 'react-redux'

export const PrivateRoutes = () => {
const{userInfo}=useSelector((state)=>state.auth)
return userInfo? <Outlet/> :<Navigate to='/login_user' replace />//make it landing page later
}