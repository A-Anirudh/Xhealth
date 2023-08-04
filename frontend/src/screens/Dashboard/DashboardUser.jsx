import { Box, Grid, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import userProfile from "../../assets/profile.svg";
import dropdown from "../../assets/dropdown.png";
import coverImg from "../../assets/Doctors-pana 2.png";
import boyimg from "../../assets/boyimg.png";
import heart from "../../assets/heart.png";
import bw from "../../assets/bw.png";
import bp from "../../assets/bp.png";
import gl from "../../assets/gl.png";

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
      <Grid item xl={12} margin="4rem 6rem 2rem" container justifyContent="space-around">
        <Grid item xl={8} boxShadow="0 4px 4px rgba(0,0,0,0.25)" borderRadius={4} overflow="hidden" border={`4px solid ${theme["purple-500"]}`} >
          <Box display="flex" alignItems="center" justifyContent="space-around" padding="0 7rem">
            <Box textAlign="center" minWidth="28rem">
              <Typography variant="h3" display="flex" gap={2} fontWeight="bold" justifyContent="center"><Typography variant="h3" fontWeight="bold" color={`${theme["purple-500"]}`}>Welcome</Typography> {data?.firstName}!</Typography>
              <Typography variant="h5">Get better easily and live a healthy life.</Typography>
            </Box>
            <Box>
              <img src={coverImg} alt="doctors image" />
            </Box>
          </Box>

        </Grid>
        <Grid item
          xl={3}
          backgroundColor="white"
          padding="1rem 1.5rem"
          borderRadius={4}
          boxShadow="0 4px 4px rgba(0,0,0,0.25)"
          position="relative"
        >
          <Typography variant="h5" color={theme["blue-150"]} margin={0}>Profile</Typography>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            justifyContent="center"
            top="0"
            height="100%"
            position="absolute"
            left="0"
            width="100%"
          >
            <img src={boyimg} alt="user avatar" />
            <Typography variant="h5">{data?.firstName}</Typography>
          </Box>
        </Grid>
      </Grid>
      <Grid item xl={12} margin="0 8rem" container display="flex" justifyContent="space-around" gap={5}>
        <Grid item
          xl={5}
          backgroundColor={theme["purple-500"]}
          padding="2rem 1.5rem"
          borderRadius={4}
          boxShadow="0 4px 4px rgba(0,0,0,0.25)"
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          gap="1rem"

        >
          <Typography
            backgroundColor="white"
            padding="0.7rem 1.5rem"
            variant="h5"
            width="max-content"
            borderRadius={4}
            gap="1rem"
          >
            Diabetes Medication
          </Typography>
          <Typography
            backgroundColor={theme["green-olive"]}
            padding="1rem 2rem"
            fontWeight="bold"
            color="white"
            width="max-content"
            borderRadius={4}
            display="flex"
            alignItems="center"
            gap={1}
          >
            Next after dinner
            <Box sx={{ transform: "rotate(270deg)" }}><img src={dropdown} alt="go Next" /></Box>
          </Typography>
        </Grid>
        <Grid item
          xl
          backgroundColor={theme["purple-500"]}
          padding="1.5rem"
          borderRadius={4}
          boxShadow="0 4px 4px rgba(0,0,0,0.25)"
          display="flex"
          flexDirection="column"
          gap={1}
        >
          <Typography variant="h5" fontWeight="bold" color="white" paddingLeft={2}>
            Appointments
          </Typography>
          <Box
            display="flex"
            alignItems="center"
            borderRadius={4}
            overflow="hidden"
            maxHeight="5rem"
            marginBottom={1}
          >
            <Box backgroundColor="white" minWidth="10rem">
              <Typography variant="h5" fontWeight="bold" padding="1rem 1.5rem" height="5rem" display="flex" alignItems="center" justifyContent="center">
                Previous
              </Typography>
            </Box>
            <Box backgroundColor={theme['blue-500']} width="100%" color="white" padding="1rem 1.5rem">
              <Box display="flex" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Typography variant="h5">
                    Dr. Santhosh
                  </Typography>
                  <Typography fontSize={15} color={theme['gray-200']} marginTop={-0.5}>
                    Manipal Hospitals
                  </Typography>
                </Box>
                <Typography fontSize={15} marginLeft="auto">
                  19/08/2023
                </Typography>
              </Box>
            </Box>

          </Box>
          <Box
            display="flex"
            alignItems="center"
            borderRadius={4}
            overflow="hidden"
            maxHeight="5rem"
          >
            <Box backgroundColor="white" minWidth="10rem">
              <Typography variant="h5" fontWeight="bold" padding="1rem 1.5rem" height="5rem" display="flex" alignItems="center" justifyContent="center">
                Upcoming
              </Typography>
            </Box>
            <Box backgroundColor={theme['blue-500']} width="100%" color="white" padding="1rem 1.5rem">
              <Box display="flex" alignItems="center">
                <Box
                  display="flex"
                  alignItems="center"
                  flexDirection="column"
                >
                  <Typography variant="h5">
                    Dr. Santhosh
                  </Typography>
                  <Typography fontSize={15} color={theme['gray-200']} marginTop={-0.5}>
                    Manipal Hospitals
                  </Typography>
                </Box>
                <Typography fontSize={15} marginLeft="auto">
                  19/08/2023
                </Typography>
              </Box>
            </Box>

          </Box>
        </Grid>
      </Grid>
      <Grid item xl={12} margin="2rem 8rem" container display="flex" justifyContent="space-around" gap={5} paddingBottom={5F}>
        <Grid item xl backgroundColor="white" borderRadius={4} boxShadow="0 4px 4px rgba(0,0,0,0.25)" padding="2rem">
          <Box marginBottom={2}>
            <img src={heart} alt="heartRate" />
          </Box>
          <Typography variant="h6">Heart Rate</Typography>
          <Typography variant="h6" color={theme["purple-500"]}>85 bpm</Typography>
        </Grid>
        <Grid item xl backgroundColor="white" borderRadius={4} boxShadow="0 4px 4px rgba(0,0,0,0.25)" padding="2rem">
          <Box marginBottom={2}>
            <img src={bp} alt="bloodpressure" />
          </Box>
          <Typography variant="h6">Blood pressure</Typography>
          <Typography variant="h6" color={theme["purple-500"]}>120/80</Typography>
        </Grid>
        <Grid item xl backgroundColor="white" borderRadius={4} boxShadow="0 4px 4px rgba(0,0,0,0.25)" padding="2rem">
          <Box marginBottom={2}>
            <img src={bw} alt="body weight" />
          </Box>
          <Typography variant="h6">Body Weight</Typography>
          <Typography variant="h6" color={theme["purple-500"]}>70 kg</Typography>
        </Grid>
        <Grid item xl backgroundColor="white" borderRadius={4} boxShadow="0 4px 4px rgba(0,0,0,0.25)" padding="2rem">
          <Box marginBottom={2}>
            <img src={gl} alt="glucose level" />
          </Box>
          <Typography variant="h6">Glucose Levels</Typography>
          <Typography variant="h6" color={theme["purple-500"]}>75-90</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

