import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const HospitalPrivateRoutes = () => {
    const { hospitalInfo } = useSelector((state) => state.auth)
    return hospitalInfo ? <Outlet /> : <Navigate to='/login-hospital' replace />
}