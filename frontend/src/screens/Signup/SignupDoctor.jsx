import { Box, Button, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import img from '../../assets/doctorSU.png'
import { useTheme } from '@mui/material/styles';
import { useDoctorRegisterMutation } from '../../slices/doctorsApiSlice';
import { setDoctorCredentials } from '../../slices/authSlice';
import { Toaster, toast } from "react-hot-toast";
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';


export const SignupDoctor = () => {
    const primary = '#68B7FF'
    const [creds, setCreds] = useState({ gender: 'Male', bloodGroup: '' });
    const [register] = useDoctorRegisterMutation();
    const { doctorInfo } = useSelector(state => state.auth);
    const navigate = useNavigate()

    const signUpDetails = [
        {
            "name": "firstName",
            "type": "text",
            "label": "First name"
        },
        {
            "name": "lastName",
            "type": "text",
            "label": "Last name"
        },
        {
            "name": "password",
            "type": "password",
            "label": "Password"
        },

        {
            "name": "email",
            "type": "email",
            "label": "Email"
        },
        {
            "name": "phoneNumber",
            "type": "tel",
            "label": "Phone number"
        },
        {
            "name": "dateOfBirth",
            "type": "date",
            "label": "Date of Birth"
        },
        {
            "name": "state",
            "type": "text",
            "label": "State"
        },
        {
            "name": "city",
            "type": "text",
            "label": "City"
        },
        {
            "name": "pincode",
            "type": "text",
            "label": "Pincode"
        },
        {
            "name": "gender",
            "type": "text",
            "label": "Gender"
        },
        {
            "name": "bloodGroup",
            "type": "text",
            "label": "Blood group"
        },
        {
            "name": "department",
            "type": "text",
            "label": "Department"

        },
        {
            "name": "qualification",
            "type": "text",
            "label": "Qualification"

        },
        {
            "name": "gradCollegeName",
            "type": "text",
            "label": "Graduated College"

        },
        {
            "name": "workingHourStart",
            "type": "time",
            "label": "Work hour start"

        },
        {
            "name": "workingHourEnd",
            "type": "time",
            "label": "Work hour end"

        },
        {
            "name": "experience",
            "type": "text",
            "label": "Experience"

        },
        {
            "name": "currentHospitalWorkingName",
            "type": "text",
            "label": "Current working hospital"

        },
        {
            "name": "registrationNumber",
            "type": "text",
            "label": "Registration number"

        },





    ]
    const theme = useTheme()
    const getCredentials = e => {
        const { value, name } = e.target;
        // console.log(name)
        // if(name=='qualification' || name=='gradCollegeName'){
        //     console.log('in if')
        //     setCreds(p=>({...p,[e.target.name]:value.split('')}))
        // }
        setCreds(p => ({ ...p, [name]: value }));
    }

    const submitCredentials = async (e, data) => {
        const updatedCreds = {};

        for (const key in creds) {
            if (key === 'qualification' || key === 'gradCollegeName') {
                updatedCreds[key] = [creds[key]]; // Convert value to an array
            } else {
                updatedCreds[key] = creds[key];
            }
        }
        console.log(updatedCreds)

        try {
            e.preventDefault();

            const res = await register(updatedCreds); // Use the updatedCreds object here
            console.log("res", res);
            if (res.error) { console.log("error"); toast.error("Check your inputs"); }
            useDispatch(setDoctorCredentials(res));
            navigate('/login-doctor')
            toast.success("Welcome User!");
        } catch (e) {
            toast.error("Invalid Credentials!!");
        }
    };


    useEffect(() => {
        console.log('Updated creds:', creds);
    }, [creds]);

    return (
        <Box className="maincontainer" sx={{ display: 'flex', boxSizing: "border-box" }} >
            <Toaster />

            <Box className='left-section'
                sx={{
                    backgroundColor: primary,
                    height: "100vh",
                    width: "15%",
                    position: 'relative',
                }}>

                <img src={img} alt="signup image" style={{ position: 'absolute', bottom: '0', width: '100%' }} />
                <Typography sx={{ color: 'white', fontWeight: "600", fontFamily: 'Poppins', position: 'absolute', right: "0", fontSize: '5vw' }}>REGI</Typography>

            </Box>

            <Box className='right-section' sx={{ position: 'relative', boxSizing: "border-box", width: '85%', display: 'flex', flexDirection: 'column' }}>
                <Typography sx={{ color: primary, fontWeight: "600", fontFamily: 'Poppins', position: 'absolute', left: "0", fontSize: '5vw', top: '0' }}>STER</Typography>

                {/* <Box sx={{display:'flex',backgroundColor:"red",flexDirection:'column',alignItems:'center'}}> */}
                <Box sx={{
                    display: "flex",
                    // flexDirection: "column",
                    height: '80vh',
                    gap: "1rem",
                    alignItems: "center",
                    justifyContent: "center",
                    flexWrap: "wrap",
                    // backgroundColor:'pink',
                    marginTop: "8rem",
                    padding: '2rem',
                    position: 'relative'

                }}
                >
                    {
                        signUpDetails.map(({ name, type, label }) => {
                            if (name == 'gender') {

                                return (
                                    <Box key={name} sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "26rem",
                                        alignItems: "center",
                                    }}>
                                        <InputLabel
                                            htmlFor={name}
                                            sx={{
                                                alignSelf: "flex-start",
                                                paddingInline: "1rem",
                                                fontSize: "1.2rem",
                                                fontFamily: 'Poppins',
                                                color: "#216eb5",

                                                [theme.breakpoints.down("xsm")]: {
                                                    fontSize: "1rem",
                                                    paddingInline: "1rem"
                                                },
                                            }}
                                        >
                                            {label}
                                        </InputLabel>
                                        <select required style={{
                                            borderRadius: "5px",
                                            // outlineColor: theme.patient.inputActive,
                                            // border: `1px solid ${theme.patient.inputDefault}`,
                                            outline: 'none',
                                            border: 'none',
                                            width: "100%",
                                            padding: "0 1rem",
                                            height: '3rem',
                                            fontSize: "1rem",
                                            fontFamily: 'Poppins',
                                            backgroundColor: theme.inputBackground,
                                            "@media (maxWidth: 449.95px)": {
                                                fontSize: "1rem",
                                                paddingInline: "1rem"
                                            },


                                            "&:focus": {

                                            },
                                        }}

                                            key={name} value={creds.gender}  onChange={(e) => { setCreds(p => ({ ...p, 'gender': e.target.value })); console.log(creds) }}>
                                            <option value="Male">Male</option   >
                                            <option value="Memale">Female</option   >

                                        </select></Box>
                                )
                            }


                            else if (name == 'bloodGroup') {

                                return (
                                    <Box key={name} sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        width: "26rem",
                                        alignItems: "center",
                                    }}>
                                        <InputLabel
                                            htmlFor={name}
                                            sx={{
                                                alignSelf: "flex-start",
                                                paddingInline: "1rem",
                                                fontSize: "1.2rem",
                                                fontFamily: 'Poppins',
                                                color: "#216eb5",

                                                [theme.breakpoints.down("xsm")]: {
                                                    fontSize: "1rem",
                                                    paddingInline: "1rem"
                                                },
                                            }}
                                        >
                                            {label}
                                        </InputLabel>
                                        <select style={{
                                            borderRadius: "5px",
                                            // outlineColor: theme.patient.inputActive,
                                            // border: `1px solid ${theme.patient.inputDefault}`,
                                            outline: 'none',
                                            border: 'none',
                                            width: "100%",
                                            padding: "0 1rem",
                                            height: '3rem',
                                            fontSize: "1rem",
                                            fontFamily: 'Poppins',
                                            backgroundColor: theme.inputBackground,

                                            "@media (maxWidth: 449.95px)": {
                                                fontSize: "1rem",
                                                paddingInline: "1rem"
                                            },

                                            "&:focus": {

                                            },
                                        }}

                                            key={name} value={creds.bloodGroup}  onChange={(e) => { setCreds(p => ({ ...p, 'bloodGroup': e.target.value })); console.log(creds) }}>
                                            <option value="A+">A+</option>
                                            <option value="A-">A-</option>
                                            <option value="B+">B+</option>
                                            <option value="B-">B-</option>
                                            <option value="O+">O+</option>
                                            <option value="O-">O-</option>
                                            <option value="AB+">AB+</option>
                                            <option value="AB-">AB-</option>

                                        </select></Box>
                                )
                            }




                            else return (
                                <Box key={name} sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    width: "26rem",
                                    alignItems: "center",
                                }}
                                >
                                    <InputLabel
                                        htmlFor={name}
                                        sx={{
                                            alignSelf: "flex-start",
                                            paddingInline: "1rem",
                                            fontSize: "1.2rem",
                                            fontFamily: 'Poppins',
                                            color: "#216eb5",

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
                                            borderRadius: "5px",
                                            // outlineColor: theme.patient.inputActive,
                                            // border: `1px solid ${theme.patient.inputDefault}`,
                                            width: "100%",
                                            padding: "0 1rem",
                                            height: '3rem',
                                            fontSize: "1rem",
                                            fontFamily: 'Poppins',
                                            backgroundColor: theme.inputBackground,

                                            [theme.breakpoints.down("xsm")]: {
                                                fontSize: "1rem"
                                            },


                                            "&:focus": {

                                            },
                                        }}
                                        disableUnderline
                                        onChange={e => getCredentials(e)}
                                    />
                                </Box>
                            )
                        })
                    }


                    <Input type="submit" value="Register"
                        disableUnderline
                        sx={{
                            borderRadius: "20px",
                            backgroundColor: theme.success,
                            border: "none",
                            marginTop: '0',
                            width: "400px",
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
                </Box>

                {/* </Box> */}

            </Box>

        </Box>
    )
}

export default SignupDoctor
