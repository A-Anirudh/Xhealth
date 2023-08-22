import { Box, Button, Typography, } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { setPatientId } from '../../slices/patientIdSlice'
const AppointmentCard = ({name,time,id}) => {
    const dispatch=useDispatch();
    

    const setId = async (id)=>{
        dispatch(setPatientId(id))
    } 

  return (
    
    <Box className="main-card" display="flex">
        <Typography>{name}</Typography>
        <Typography>{time}</Typography>
        <Typography>{id}</Typography>
        <Link to="/add-record"><Button onClick={()=>setId(id)}>Examine</Button></Link>
    </Box>
    
  ) 
}

export default AppointmentCard