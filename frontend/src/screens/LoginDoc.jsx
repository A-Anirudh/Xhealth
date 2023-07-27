import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import xhealth from "../assets/xhealthlogo.svg";
import { useEffect, useState } from 'react';
import { useLoginDocMutation } from '../slices/usersApiSlice';
import { setCredentials } from '../slices/docAuthSlice';
import {useDispatch,useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import { Link,useNavigate } from 'react-router-dom';


export const LoginDoc = () => {


    const theme = useTheme();

    const [email, setEmail] = useState(''); //state variable to store email
    const [password, setPassword] = useState(''); //state variable to store password

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [loginDoc] = useLoginDocMutation();//getting loginUser fuction

    const { docInfo } = useSelector((state) => state.docAuth)//to get the localstoarge data from redux

    useEffect(() => {
        console.log(docInfo+" from login doc")
        if (docInfo) {
            navigate('/profile_doc')
        }
    }, [navigate, docInfo])

    const submitHandler = async (e) => {//when you click login
        e.preventDefault();
        try {
            const res=await loginDoc({email,password}).unwrap() //{email,password} will b the boduy
            dispatch(setCredentials({res}))
        } catch (err) {
            toast.error(err?.data?.message||err.error)
        }
      };
      

    return (
        <Box   sx={
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
                    backgroundColor: theme.status.secondary,
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    display: "flex",
                    alignItems: "center",
                    padding: "0 8rem",
                }}
            >
                <Typography variant="h3" component="h2" sx={{ color: "white", fontWeight: "bold" }}>
                    For Doctors
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
                </Box>
            </Box>
        </Box>
    )
}

