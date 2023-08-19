import { Box, Input, InputLabel, Typography } from "@mui/material"
import loginThumbnail from "../../assets/userLogin.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import { useTheme } from '@mui/material/styles';
import { useEffect, useState } from "react";
import { useUserSignupMutation } from "../../slices/usersApiSlice";
import { setUserCredentials } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { signUpDetails } from "../../dump/";

export const SignupUser = () => {
    const theme = useTheme()
    const [creds, setCreds] = useState({});
    const [signup] = useUserSignupMutation();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { userInfo } = useSelector(state => state.auth);
    

    const getCredentials = e => {
        const { value, name } = e.target;
        setCreds(p => ({ ...p, [name]: value }));
        console.log(creds);
    }

    const submitCredentials = async (e, data) => {
        try {
            e.preventDefault();
            const res = await signup(data);
            dispatch(setUserCredentials(res));
            toast.success("Welcome User!")
        }
        catch (e) {
            toast.error("Invalid Credentials!!")
        }
    }

    useEffect(() => {
        navigate(userInfo ? "/dashboard-user" : "/signup-user");
    }, [navigate, userInfo])

    return (
        <Box sx={{
            background: theme.patient.background,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Toaster />
            <Box sx={{
                borderRadius: "1.4rem",
                background: "white",
                display: "flex",
                overflow: "hidden",
                height: "80%",
                width: "70%",
                [theme.breakpoints.down('lg')]: {
                    width: "90%",
                },
                [theme.breakpoints.down("sm")]: {
                    flexDirection: "column"
                }
            }}>
                <Box sx={{
                    background: theme.patient.primary,
                    height: "100%",
                    width: "35%",
                    position: "relative",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    [theme.breakpoints.down("sm")]: {
                        width: "100%",
                        height: "unset",
                        paddingBlock: "1rem",
                    },
                }}>
                    <Typography variant="h1" sx={{
                        fontFamily: "Poppins",
                        fontWeight: "bold",
                        transform: "rotate(270deg) translateY(-7rem)",
                        background: "linear-gradient(90deg, #C767C7 0%, rgba(255, 255, 255, 0.50) 100%)",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        fontSize: "clamp(7rem, 8.5vw, 8rem)",
                        [theme.breakpoints.down('lg')]: {
                            transform: "rotate(270deg) translateY(-10vw)",
                        },
                        [theme.breakpoints.down('md')]: {
                            transform: "rotate(270deg) translateY(-8vw)",
                        },
                        [theme.breakpoints.down("sm")]: {
                            transform: "initial",
                            fontSize: "4rem",
                        },
                        [theme.breakpoints.down("xsm")]: {
                            transform: "initial",
                            fontSize: "14vw",
                        },
                    }}>
                        PATIENT
                    </Typography>
                    <Box sx={{
                        [theme.breakpoints.down('sm')]: {
                            display: "none"
                        }
                    }}>
                        <img src={loginThumbnail} className={styles.coverImg} alt="patient" />
                    </Box>
                </Box>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    height: "100%",
                    width: "100%",
                    alignItems: "center",
                    justifyContent: "space-around"
                }}
                >
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",

                    }}
                    >
                        <Typography variant="h3" sx={{
                            fontWeight: 'bold',
                            [theme.breakpoints.down("xsm")]: {
                                fontSize: "9vw",
                            },
                        }}>
                            Sign Up
                        </Typography>
                        <Typography variant="h6" sx={{
                            color: theme.secondaryText,
                            [theme.breakpoints.down("xsm")]: {
                                fontSize: "5vw",
                            },
                        }}>
                            Please Sign up your account
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        // flexDirection: "column",
                        width: "80%",
                        gap: "1rem",
                        alignItems: "center",
                        justifyContent: "center",
                        flexWrap: "wrap"
                    }}
                    >
                        {
                            signUpDetails.map(({name, type, label}) => (
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "10rem",
                                    alignItems: "center",
                                }}
                                >
                                    <InputLabel
                                        htmlFor={name}
                                        sx={{
                                            alignSelf: "flex-start",
                                            paddingInline: "1rem",
                                            fontSize: "0.8rem",
                                            color: "#9D9D9D",
                                            [theme.breakpoints.down("xsm")]: {
                                                fontSize: "1rem",
                                                paddingInline: "1rem"
                                            },
                                        }}
                                    >
                                        {label}
                                    </InputLabel>
    
                                    <Input
                                        id={name}
                                        type={type}
                                        name={name}
                                        sx={{
                                            borderRadius: "20px",
                                            outlineColor: theme.patient.inputActive,
                                            border: `1px solid ${theme.patient.inputDefault}`,
                                            width: "100%",
                                            padding: "0 1rem",
                                            fontSize: "1rem",
                                            background: theme.inputBackground,
                                            [theme.breakpoints.down("xsm")]: {
                                                fontSize: "1rem"
                                            },
                                        }}
                                        disableUnderline
                                        onChange={e => getCredentials(e)}
                                    />
                                </Box>
                            ))
                        }
                    </Box>
                    <Box sx={{ display: "flex", flexDirection: "column", width: "100%", alignItems: "center", gap: "1rem" }}>
                        <Input type="submit" value="Login"
                            disableUnderline
                            sx={{
                                borderRadius: "20px",
                                backgroundColor: theme.success,
                                border: "none",
                                width: "70%",
                                padding: "0.4rem 1rem",
                                color: "white",
                                fontSize: "1.4rem",
                                fontWeight: "600",
                                [theme.breakpoints.down("xsm")]: {
                                    fontSize: "1rem",
                                    paddingInline: "1rem"
                                },
                            }}
                            onClick={(e) => submitCredentials(e, creds)}
                        />
                        <span>Existing User? <Link to="/login-user" style={{ color: theme.success }}>Sign In Now</Link></span>
                    </Box>
                </Box>

            </Box>
        </Box >
    )
}

