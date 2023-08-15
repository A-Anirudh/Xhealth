import React from 'react'
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import LandingBg from '../../assets/LBG.jpg'
import logo from'../../assets/xhealth.png'
import { Link } from 'react-router-dom';
import LoginCard from './LoginCard';
import { Margin } from '@mui/icons-material';
export const LandingPage = () => {
    return (
        <Box
            // style={{fontFamily:'Poppins'}}
            sx={{
                background: `url(${LandingBg}) center`, // Corrected the backgroundImage assignment
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                width: '100vw',
                backgroundPosition:'center',
                height: '100vh',
                boxSizing:'border-box',}}>
               
                
            
        



            <Box className='main-container' sx={{width:'100vw' }}>

                <Box className='navbar'  ><Link to='/' sx={{ color: 'white' }}><img src={logo} width='40vh' />Xhealth</Link></Box>


                <Typography variant="h2" sx={{ fontWeight: '500', color: '#ffffff',fontFamily:'Poppins',marginLeft:'2rem',marginTop:'2rem' ,}}>Empowering Your Health Journey, Every Step</Typography>
                <Typography variant="h4" sx={{ fontWeight: '300', color: '#58fc5b',fontFamily:'Poppins',marginLeft:'2rem',marginTop:'2rem' }}>Elevating Wellness: Easy Appointments, Total Care</Typography>

                <Box className='loginCard-container' sx={{display:'flex',flexWrap:'wrap',backgroundColor:'h',width:'100%',marginTop:'5rem',alignItems:'center',justifyContent:'center',gap:'10%'}}>
                    <LoginCard type={'Doctor?'} desc={'Committed to providing exceptional care and personalized treatment for your well-being'} link={'/login-doctor'} />
                    <LoginCard type={'Patient?'}desc={'Are you a patient looking to book appointments and manage your health'} link={'/login-user'}/>
                    <LoginCard type={'Hospital?'}desc={'Dedicated to serving our community with a holistic approach to wellness'} link={'/login-hospital'}/>
                </Box>




            </Box>
        </Box>
    )
}

export default LandingPage