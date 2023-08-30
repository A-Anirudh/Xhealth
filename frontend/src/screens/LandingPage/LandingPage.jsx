import React from 'react'
import { Box, Typography } from '@mui/material';
import LandingBg from '../../assets/LBG.jpg'
import LoginCard from './LoginCard';
export const LandingPage = () => {
    return (
        <Box
            sx={{
                background: `url(${LandingBg}) center no-repeat`, // Corrected the backgroundImage assignment
                backgroundSize: 'cover',
                boxSizing: 'border-box',
            }}>
            <Box className='main-container'>
                <Typography variant="h2" sx={{ fontSize:"clamp(2rem, 3.8vw, 3rem)", fontWeight: '500', color: '#ffffff', fontFamily: 'Poppins', marginLeft: '2rem', paddingTop: "1rem" }}>Empowering Your Health Journey, Every Step</Typography>
                <Typography variant="h4" sx={{ fontSize:"clamp(1.3rem, 2.5vw, 2.125rem)", fontWeight: '300', color: '#58fc5b', fontFamily: 'Poppins', marginLeft: '2rem', marginTop:"2vw" }}>Elevating Wellness: Easy Appointments, Total Care</Typography>

                <Box className='loginCard-container' sx={{ display: 'flex', gap:"5rem", flexWrap: 'wrap', width: '100%', padding: '5rem 3rem', alignItems: 'center', justifyContent: 'space-around' }}>
                    <LoginCard type={'Doctor?'} desc={'Committed to providing exceptional care and personalized treatment for your well-being'} link={'/login-doctor'} />
                    <LoginCard type={'Patient?'} desc={'Are you a patient looking to book appointments and manage your health'} link={'/login-user'} />
                    <LoginCard type={'Hospital?'} desc={'Dedicated to serving our community with a holistic approach to wellness'} link={'/login-hospital'} />
                </Box>




            </Box>
        </Box>
    )
}

export default LandingPage