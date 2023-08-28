import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Users } from '../sdk/users';
import { useGetDoctorAptQuery } from '../slices/doctorsApiSlice';
import { useGetAllAppointmentsQuery } from '../slices/usersApiSlice';
import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@emotion/react';
import { useSelector } from 'react-redux';
import { Dna } from  'react-loader-spinner'



export const AptCard = ({ idx, name, time }) => {
    const newLocal = `#736f0b`
    const theme = useTheme();
    return (



        <Box className="main-card" display="flex"
            sx={{
                backgroundColor: 'white',
                color: 'black',
                padding: "2rem",
                alignItems: 'center',
                height: "10vh",
                width: '100%',
                borderRadius: '0.5rem',
                justifyContent: "space-between",
                boxShadow: '0px 4px 18px 0px rgba(0, 0, 0, 0.15)'
            }}>
            <Typography sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: "1.5vw", textAlign: "left", display: 'flex', alignItems: 'center' }}>{idx}</Typography>
            <Typography sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: "1.5vw", textAlign: "left", backgroundColor: '#', padding: '0.5rem', borderRadius: '1rem', display: 'flex', alignItems: 'center' }}><Typography sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: "1.5vw", textAlign: "left", color: `#018725`, }}>Patient Name : </Typography>{name}</Typography>
            <Typography sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: "1.5vw", textAlign: "left", display: 'flex', alignItems: 'center' }}><Typography sx={{ fontFamily: 'Poppins', fontWeight: '500', fontSize: "1.5vw", textAlign: "left", color: `#018725` }}>Visiting time : </Typography>{time}</Typography>
        </Box>



    )
}
export default AptCard







export const ViewAppointments = () => {
    const user = new Users();
    const theme = useTheme();
    const {docname} = useParams()
    console.log(docname)
    const [aptBasedOnDoc, refetchapt] = user.getDocApt();
    const { id } = useParams()
    const getApts = useGetAllAppointmentsQuery()
    const [data, setdata] = useState([])
    const [flag, setflag] = useState(true)
    const filteredApts = [];
console.log("hhh",getApts)
    if (getApts.status == 'fulfilled' && flag) {
        

        for (let i = 0; i < getApts.data.apt_data.length; i++) {
            if (id == getApts.data.apt_data[i].doctorId) {
                filteredApts.push({ 'data': getApts.data.apt_data[i], "user": getApts.data.user_data[i] })
            }
        }
        
        setdata(filteredApts)
        console.log(data)
        setflag(false)
    }

    if (data.length==0) return  (<h1 style={{ fontFamily: 'poppins', color: '#5c9670' }} >
    <Dna visible={true} height="80" width="80" ariaLabel="dna-loading"wrapperStyle={{}} wrapperClass="dna-wrapper"/>{'\u00A0'}Loading</h1>)

    console.log('data', data)
    return (
        <Grid className='main-container' margin={2} padding={2} container>
            <Box marginX={6}>
                <span style={{ fontFamily: 'poppins', fontWeight: '500', color: 'black', fontSize: '3vw' }}>
                    {'Appointments of '}{'\u00A0'}
                </span>
                <span style={{ fontFamily: 'poppins', fontWeight: '500', color: theme.hospital.primary, fontSize: '3vw', display: 'inline-flex', alignItems: 'center' }}>
                    
                    <span>{docname}</span>
                </span>
            </Box>



            <Grid className='cards-container'

                item xl={11}
                display='flex'
                flexDirection='column'
                margin="4rem"
                borderRadius='1rem'
                backgroundColor={theme.hospital.background}
                width='100% '
                padding='2rem'
                alignItems='center'
                justifyContent='center'
                overflow='hidden    '


                gap='1rem'>
                {data.length != 0 ? data.map((item, idx) => (
                    <AptCard
                        key={idx}
                        idx={idx + 1}
                        name={item.user.name}
                        time={item.data.appointmentStartTime}

                    />
                )) : <h1 style={{fontFamily:'poppins',color:'#5c9670'}} >
                    <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />{'\u00A0'}Loading</h1>}
            </Grid></Grid>

    )
}




