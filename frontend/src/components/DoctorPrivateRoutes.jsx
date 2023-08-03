import { Navigate,Outlet } from 'react-router-dom'
import {  useSelector } from 'react-redux'

export const DoctorPrivateRoutes = () => {
const{docInfo}=useSelector((state)=>state.docAuth)
return docInfo? <Outlet/> :<Navigate to='/' replace />//make it landing page later
}