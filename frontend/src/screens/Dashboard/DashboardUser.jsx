import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import userProfile from "../../assets/profile.svg";
import dropdown from "../../assets/dropdown.png";
import coverImg from "../../assets/Doctors-pana 2.png";

import React, { useEffect } from 'react'
import { useGetUserInfoQuery } from '../../slices/usersApiSlice';


export const DashboardUser = () => {
  const theme = useTheme();
  const { data } = useGetUserInfoQuery();

  return (
    <Grid container backgroundColor={theme['blue-100']}>
      <Grid item xl={12} sx={{ background: theme["purple-500"], padding: "1.5rem 2rem", display: "flex", alignItems: "center", borderRadius: "0 0 1rem 1rem" }}>
        <Typography variant="h4" fontWeight="bold" color="white">XHealth</Typography>
        <Box marginLeft="auto" display="flex" gap={4} alignItems="center">
          <Typography color="white">Appointments</Typography>
          <Box display="flex" gap={1} alignItems="center">
            <Typography color="white">Health Record</Typography>
            <img src={dropdown} alt="dropdown" />
          </Box>
          <Box><img src={userProfile} alt="user image" /></Box>
        </Box>
      </Grid>
      <Grid item xl={12} margin="4rem 6rem" container justifyContent="space-between">
        <Grid item xl={7} boxShadow="0 4px 4px rgba(0,0,0,0.25)" borderRadius={4} overflow="hidden" border={`4px solid ${theme["purple-500"]}`} >
          <Box display="flex" gap={8} alignItems="center" justifyContent="space-around" padding="0 7rem">
            <Box textAlign="center" minWidth="28rem" marginLeft="6rem">
              <Typography variant="h3" display="flex" gap={2} fontWeight="bold" justifyContent="center"><Typography variant="h3" fontWeight="bold" color={`${theme["purple-500"]}`}>Welcome</Typography> {data?.firstName?.substr(0,5)}!</Typography>
              <Typography variant="h5">Get better easily and live a healthy life.</Typography>
            </Box>
            <Box>
              <img src={coverImg} alt="doctors image" />
            </Box>
          </Box>

        </Grid>
        <Grid item xl={4} backgroundColor="white" padding={4}>
          Profile

        </Grid>
      </Grid>
      <Grid item xl={8}>
        <p>xs=8</p>
      </Grid>
    </Grid>
  )
}

