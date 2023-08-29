import { Link, Navigate, Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Button, Grid, Typography, useTheme } from '@mui/material'
import { useState } from 'react'
import { Users } from '../sdk/users'
import userProfile from "../assets/profile.svg";
import { doctorLogout } from '../slices/authSlice';

export const DoctorPrivateRoutes = () => {
    const user = new Users();
    const theme = useTheme();
    const { doctorInfo } = useSelector((state) => state.auth)
    const [userOptions, setUserOptions] = useState(false);
    const logout = user.logoutDoctor();
	const dispatch = useDispatch();


    const logoutUser = async () => {
        try {
            await logout();
            dispatch(doctorLogout());
            setUserOptions(false);
        } catch (e) {
            console.error(e);
            toast.error("Something went wrong")
        }
    }

    return doctorInfo ?
        <Box>
            <Grid
                item
                xl lg md sm xs xsm
                sx={{
                    background: theme["purple-500"],
                    padding: "1.5rem 2rem",
                    display: "flex",
                    alignItems: "center",
                    borderRadius: "0 0 1rem 1rem",
                    [theme.breakpoints.down("xsm")]: {
                        padding: "0.7rem 2rem",
                    },
                }}
            >
                <Link to='/' style={{ textDecoration: "none" }}>
                    <Typography fontFamily='Poppins'
                        variant="h4"
                        fontWeight="bold"
                        color="white"
                        sx={{
                            cursor: "pointer",
                            [theme.breakpoints.down("sm")]: {
                                fontSize: "5vw"
                            },
                        }}

                    >
                        XHealth
                    </Typography>
                </Link>
                <Link to="/dashboard-doctor" style={{ textDecoration: "none", marginInline: '2rem' }}>
                    <Typography fontFamily='Poppins' color="white" sx={{
                        cursor: "pointer",
                        [theme.breakpoints.down("sm")]: {
                            fontSize: "1vw",
                            display: "none"
                        },
                    }}>Dashboard</Typography>
                </Link>
                <Link to="/view-all-records" style={{ textDecoration: "none", marginInline: '2rem' }}>
                    <Typography fontFamily='Poppins' color="white" sx={{
                        cursor: "pointer",
                        [theme.breakpoints.down("sm")]: {
                            fontSize: "1vw",
                            display: "none"
                        },
                    }}>View all records</Typography>
                </Link>


            </Grid>
            <Outlet />
        </Box> : <Navigate to='/login-doctor' replace />
}