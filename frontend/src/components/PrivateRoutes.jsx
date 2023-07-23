import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'
import {  useSelector } from 'react-redux'

const PrivateRoutes = () => {
const{userInfo}=useSelector((state)=>state.auth)
return userInfo? <Outlet/> :<Navigate to='/login_user' replace />//make it landing page later
}

export default PrivateRoutes