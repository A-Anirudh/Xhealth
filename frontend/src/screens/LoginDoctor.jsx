import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import xhealth from "../assets/xhealthlogo.svg";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { ToastContainer, toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import LoginIcon from '@mui/icons-material/Login';

export const LoginDoctor = () => {
    const theme = useTheme();
    const [creds, setCreds] = useState({ email: "", password: "" });
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [login] = useLoginMutation();
    const { userInfo } = useSelector((state) => state.auth)

    const credsHandler = (e) => {
        const { name, value } = e.target;
        setCreds(p => ({ ...p, [name]: value }))
    }

    const loginHandler = async () => {
        try {
            const res = await login({ email: creds.email, password: creds.password }).unwrap() //{email,password} will b the boduy
            dispatch(setCredentials({ res }))
            toast.success("Welcome Doctor!")
        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }
    }

    useEffect(() => {
        if (userInfo) {
            // navigate('/profile_user')
        }
    }, [navigate, userInfo])

    return (<>
        <ToastContainer />
        <Box sx={
            {
                backgroundColor: "#d1d1d1",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                paddingInline: "8rem",
                justifyContent: "space-around"
            }}>
            <Box
                sx={{
                    width: '100vw',
                    height: '20vh',
                    backgroundColor: theme.status.primary,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8rem"
                }}
            >
                <Typography variant="h3" component="h2" sx={{display: "flex", alignItems: "center", gap: "1rem"}}>
                    Doctor Login 
                    <LoginIcon fontSize="3rem" />
                </Typography>
            </Box>
            <Box sx={{
                fontSize: "1.5rem",
                lineHeight: "4rem",
                display: "flex",
                alignItems: "flex-end",
            }}>
                <ul>
                    <li>Book doctor appointments hassle-free</li>
                    <li>Manage your health records securely</li>
                    <li>Prioritize your well-being with ease.</li>
                    <li>Empowering you to take control of your health journey</li>
                </ul>
            </Box>
            <Box sx={
                {
                    backgroundColor: "white",
                    padding: "4rem 2rem",
                    borderRadius: 3,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: "6rem",
                    width: "35%",
                    minHeight: "40rem",
                    minWidth: "28rem",
                    zIndex: "1"
                }}>
                <img src={xhealth} alt="xhealth logo" />
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    gap: "2rem"
                }}>
                    <TextField
                        id="standard"
                        label="Email Address"
                        defaultValue=""
                        variant="standard"
                        sx={{ width: "80%" }}
                        name="email"
                        value={creds.email}
                        onChange={(e) => credsHandler(e)}
                    />
                    <TextField
                        id="standard"
                        label="Password"
                        type="password"
                        defaultValue=""
                        variant="standard"
                        sx={{ width: "80%" }}
                        name="password"
                        value={creds.password}
                        onChange={(e) => credsHandler(e)}
                    />
                    <Button variant="solid" sx={{
                        backgroundColor: theme.status.primary,
                        textTransform: "capitalize",
                        fontSize: 18,
                        paddingInline: "3rem",
                        borderRadius: 2,
                        marginTop: 5,
                        '&:hover': {
                            backgroundColor: theme.status.secondary,
                            color: "white"
                        }
                    }}
                        onClick={loginHandler}
                    >Sign In</Button>
                </Box>
            </Box>
        </Box>
    </>
    )
}
