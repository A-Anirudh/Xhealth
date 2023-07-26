import { Navigate,Outlet } from 'react-router-dom'
import {  useSelector } from 'react-redux'

export const PrivateRoutes = () => {
const{userInfo}=useSelector((state)=>state.auth)
console.log("in private",userInfo)
return userInfo? <Outlet/> :<Navigate to='/' replace />//make it landing page later
}