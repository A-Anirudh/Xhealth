import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import xhealth from "../assets/xhealthlogo.svg";
import { useEffect, useState } from 'react';
import { useLoginMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/authSlice';
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { Link, useNavigate } from 'react-router-dom';
import LoginIcon from '@mui/icons-material/Login';



export const LoginDoctor = () => {


    const theme = useTheme();

    const [email, setEmail] = useState(''); //state variable to store email
    const [password, setPassword] = useState(''); //state variable to store password

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [login] = useLoginMutation();

    const { userInfo } = useSelector((state) => state.auth)//to get the localstoarge data from redux

    useEffect(() => {
        console.log(email, "+", password)
        if (userInfo) {
            navigate('/profile_user')
        }
    }, [navigate, userInfo])

    const submitHandler = async (e) => {//when you click login
        e.preventDefault();
        try {
            const res = await login({ email, password }).unwrap() //{email,password} will b the boduy

            dispatch(setCredentials({ res }))

        } catch (err) {
            toast.error(err?.data?.message || err.error)
        }

    };

    return (
        <Box sx={
            {
                backgroundColor: "#d1d1d1",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                paddingInline: "8rem",
                justifyContent: "space-around",

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
                    padding: "0 8rem",
                }}
            >
                <Typography variant="h3" component="h2" sx={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                    Doctor Login
                    <LoginIcon fontSize="3rem" />
                </Typography>
            </Box>
            <Box sx={{
                fontSize: "1.5rem",
                lineHeight: "4rem",
                display: "flex",
                alignItems: "flex-end",
                width: "50%"
            }}>
                Join XHealth today and unlock the full potential of your medical practice.
                A transformative healthcare experience that enables you to focus on what matters most – providing top-notch care to your patients.
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
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        id="standard"
                        label="Password"
                        type="password"
                        defaultValue=""
                        variant="standard"
                        sx={{ width: "80%" }}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Box sx={{ display: "flex", gap: "2rem" }}>
                        <Button variant="solid" onClick={submitHandler} sx={{
                            backgroundColor: theme.status.primary,
                            color: 'white',
                            textTransform: "capitalize",
                            fontSize: 18,
                            paddingInline: "3rem",
                            borderRadius: 2,
                            marginTop: 5,
                            fontFamily: 'Roboto',
                            '&:hover': {
                                backgroundColor: theme.status.secondary,
                                color: "white"
                            }

                        }}>Sign In</Button>
                        <Button variant="solid" onClick={async () => {
                            const res = await login({ email: "doc@doc.com", password: "123456" }).unwrap()
                            dispatch(setCredentials({ res }))
                        }} sx={{
                            backgroundColor: theme.status.primary,
                            color: 'white',
                            textTransform: "capitalize",
                            fontSize: 18,
                            paddingInline: "3rem",
                            borderRadius: 2,
                            marginTop: 5,
                            fontFamily: 'Roboto',
                            '&:hover': {
                                backgroundColor: theme.status.secondary,
                                color: "white"
                            }

                        }}>Test User</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}

