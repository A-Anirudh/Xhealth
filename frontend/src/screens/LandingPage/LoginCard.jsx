import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Navigate, useNavigate } from 'react-router-dom'

const LoginCard = ({type,desc,link}) => {
    const navigate=useNavigate();
  return (
    <Box sx={{
        padding:'5rem',color:'white',width:'400px',height:'500px',textAlign:'center',
        alignItems:'center',
        boxShadow:'20px 20px 50px rgba(0,0,0,0.5)',
        borderRadius:'15px',
        display:'flex',
        flexDirection:'column',
        background:'rgba(255,255,255,0.1)',
        overflow:'hidden',
        alignItems:'center',
        backdropFilter:'blur(3px)',
        justifyContent:'space-between',}}>
        
        <Typography  sx={{fontFamily:'Poppins',fontWeight:'500','&:first-letter':{color:'#58fc5b'}}}variant='h2'>{type}</Typography>
        <Typography  sx={{fontFamily:'Poppins',fontWeight:'300',fontSize:'1.5em',color:'#c9c9c9'}}>{desc}</Typography>
        <Button onClick={()=>{navigate(link)}} sx={{backgroundColor:'#58fc5b',color:'black',fontSize:'1.2rem',fontWeight: 'bold',textTransform: 'capitalize',padding:'8px 20px',width:'15rem',borderRadius:'5rem',"&:hover":{color:"white",background:'#58fc5b',}}}>Login here</Button>

    </Box>
  )
}

export default LoginCard