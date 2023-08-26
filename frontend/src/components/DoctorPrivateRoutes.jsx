import { Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

export const DoctorPrivateRoutes = () => {
    const { doctorInfo } = useSelector((state) => state.auth)
    return doctorInfo ? <Outlet /> : <Navigate to='/login-doctor' replace />
}