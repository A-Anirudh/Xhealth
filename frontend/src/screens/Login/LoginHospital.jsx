import { Box, Input, InputLabel, Typography } from "@mui/material"
import loginThumbnail from "../../assets/userHospital.png";
import { Link } from "react-router-dom";
import styles from "./Login.module.css";
import { useTheme } from '@mui/material/styles';

export const LoginHospital = () => {

    const theme = useTheme()

    return (
        <Box sx={{
            background: theme.hospital.background,
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}>
            <Box sx={{
                borderRadius: "1.4rem",
                background: "white",
                display: "flex",
                overflow: "hidden",
                height: "80%",
                width: "60rem",
                [theme.breakpoints.down('lg')]: {
                    width: "90%",
                },
                [theme.breakpoints.down("sm")]: {
                    flexDirection: "column"
                }
            }}>
                <Box sx={{
                    background: theme.hospital.primary,
                    height: "100%",
                    width: "40%",
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
                        background: "linear-gradient(90deg, #35C367 0%, rgba(255, 255, 255, 0.50) 100%)",
                        backgroundClip: "text",
                        textFillColor: "transparent",
                        fontSize: "7rem",
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
                        HOSPITAL
                    </Typography>
                    <Box sx={{
                        [theme.breakpoints.down('sm')]: {
                            display: "none"
                        }
                    }}>
                        <img src={loginThumbnail} className={styles.coverImg} alt="hospital" />
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
                            Login
                        </Typography>
                        <Typography variant="h6" sx={{
                            color: theme.secondaryText,
                            [theme.breakpoints.down("xsm")]: {
                                fontSize: "5vw",
                            },
                        }}>
                            Please login to your account
                        </Typography>
                    </Box>
                    <Box sx={{
                        display: "flex",
                        flexDirection: "column",
                        width: "70%",
                        gap: "1rem",
                        alignItems: "center",
                    }}
                    >
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "center",
                        }}
                        >
                            <InputLabel htmlFor="email" sx={{
                                alignSelf: "flex-start",
                                paddingInline: "2rem",
                                fontSize: "1.1rem",
                                color: "#9D9D9D",
                                [theme.breakpoints.down("xsm")]: {
                                    fontSize: "1rem",
                                    paddingInline: "1rem"
                                },
                            }}>
                                Email
                            </InputLabel>

                            <Input id="email" type="email" sx={{
                                borderRadius: "20px",
                                outlineColor: theme.hospital.inputActive,
                                border: `2px solid ${theme.hospital.inputDefault}`,
                                width: "100%",
                                padding: "0.4rem 1rem",
                                fontSize: "1.4rem",
                                background: theme.inputBackground,
                                [theme.breakpoints.down("xsm")]: {
                                    fontSize: "1rem"
                                },
                            }}
                            disableUnderline />
                        </Box>
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            width: "100%",
                            alignItems: "center",
                        }}
                        >
                            <InputLabel htmlFor="password" sx={{
                                alignSelf: "flex-start",
                                paddingInline: "2rem",
                                fontSize: "1.1rem",
                                color: "#9D9D9D",
                                [theme.breakpoints.down("xsm")]: {
                                    fontSize: "1rem",
                                    paddingInline: "1rem"
                                },
                            }}>
                                Password
                            </InputLabel>

                            <Input id="password" type="password" sx={{
                                borderRadius: "20px",
                                outlineColor: theme.hospital.inputActive,
                                border: `2px solid ${theme.hospital.inputDefault}`,
                                width: "100%",
                                padding: "0.4rem 1rem",
                                fontSize: "1.4rem",
                                background: theme.inputBackground,
                                [theme.breakpoints.down("xsm")]: {
                                    fontSize: "1rem"
                                },
                            }}
                            disableUnderline />
                        </Box>
                        <Link to="/forgot-password" style={{ color: theme.success, alignSelf: "flex-end", paddingInlineEnd: "1rem", marginBlockStart: "-1rem" }}>forgot passward</Link>
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
                        }} />
                        <span>New User? <Link to="/register" style={{ color: theme.success }}>Register Now</Link></span>
                    </Box>
                </Box>

            </Box>
        </Box >
    )
}

