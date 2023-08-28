import { useEffect, useState } from 'react'
import { Users } from '../../sdk/users';
import { useTheme } from '@emotion/react';
import { Box, Button, Grid, Typography, TextField } from '@mui/material';
import userProfile from "../../assets/profile.svg";
import { Link } from "react-router-dom";
import { hospitalLogout } from '../../slices/authSlice';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import '../../global.css'
import moment from "moment"
import { useDoctorAppointmentsMutation } from '../../slices/usersApiSlice';
import { Hospital } from '../../sdk/hospitals';

export const DashboardHospital = () => {
  const theme = useTheme();
  const user = new Users();
  const hospital = new Hospital();
  const [userOptions, setUserOptions] = useState(false);
  const logout = hospital.logout();
  const [appointments] = user.getAppointments();
  const [getDoctors] = user.getDoctors();
  const dispatch = useDispatch();
  const [categorizedApt, setCategorizedApt] = useState();
  const [categorizedDoctors, setCategorizedDoctors] = useState();
  const [searchRes, setSearchRes] = useState([]);
  const [doctorApt] = useDoctorAppointmentsMutation();

  const searchDoc = e => {
    const res = getDoctors && getDoctors?.allDoc?.filter(item => e === "" ? false : item.firstName.toLowerCase().includes(e.toLowerCase()) || item.lastName.toLowerCase().includes(e.toLowerCase()))
    setSearchRes(res);
  }

  const logoutUser = async () => {
    try {
      await logout();
      dispatch(hospitalLogout());
      setUserOptions(false);
    } catch (e) {
      console.error(e);
      toast.error("Something went wrong")
    }
  }

  useEffect(() => {
    if (getDoctors && appointments) {
      // console.log(getDoctors);
      const allApt = appointments?.reduce((acc, curr) => {
        const newApt = {
          ...acc,
          [curr.doctorId]: acc[curr.doctorId] ? [...acc[curr.doctorId], curr] : [curr]
        }
        return newApt;
      }, {})

      const categApt = Object.keys(allApt).map(id => {
        const docName = getDoctors.allDoc.find(item => item._id === id).firstName
        return {
          name: docName,
          apts: allApt[id]
        }
      })

      const categDoc = getDoctors.allDoc.reduce((acc, curr) => {
        return {
          ...acc,
          [curr.department]: acc[curr.department] ? [...acc[curr.department], curr] : [curr]
        }
      }, {})
      // console.log(categDoc);
      setCategorizedDoctors(categDoc);
      setCategorizedApt(categApt);
    }
  }, [appointments, getDoctors])

  useEffect(() => {
    (async () => {
      const res = await doctorApt({ '_id': "64cead652a1fae980800d582" });
      console.log(res);
    })()
  }, [doctorApt])

  return (
    <Grid className="main-container" container>
      <Grid
        item
        xl lg md sm xs xsm
        sx={{
          background: theme["green-olive"],
          padding: "1.5rem 2rem",
          display: "flex",
          alignItems: "center",
          borderRadius: "0 0 1rem 1rem",
          [theme.breakpoints.down("xsm")]: {
            padding: "0.7rem 2rem",
          },
        }}
      >
        <Link to='/' style={{ textDecoration: "none" }}>
          <Typography fontFamily='Poppins'
            variant="h4"
            fontWeight="bold"
            color="white"
            sx={{
              cursor: "pointer",
              [theme.breakpoints.down("sm")]: {
                fontSize: "5vw"
              },
            }}

          >
            XHealth
          </Typography>
        </Link>
        <Box
          marginLeft="auto"
          display="flex"
          gap={4}
          alignItems="center">

          <Box sx={{
            [theme.breakpoints.down("sm")]: {
              fontSize: "1vw",
              display: "none"
            },
          }}>

          </Box>

          <Box sx={
            {
              cursor: "pointer",
              position: "relative"
            }
          }
          >
            <img onClick={() => setUserOptions(p => !p)} src={userProfile} alt="user image" />
            <Box
              display={userOptions ? "flex" : "none"}
              backgroundColor="white"
              padding="0.5rem 1rem"
              borderRadius={1}
              position="absolute"
              left={-40}
              sx={{ transform: "translate(-50%, 10%)" }}
              minWidth="max-content"
              textAlign="center"
              color={theme['blue-150']}
              flexDirection="column"
              gap={1}
              fontSize={4}
              zIndex={3}
              boxShadow="0 4px 4px lightgray"
            >
              <Button onClick={logoutUser} sx={{ fontWeight: "bold", background: theme['blue-100'], color: theme['blue-150'], padding: 0, margin: 0, textTransform: "capitalize", fontSize: "1rem" }}>Logout</Button>
            </Box>
          </Box>
        </Box>
      </Grid>

      <Grid className='cards-container'
        item xl={12}
        display='flex'
        margin="4rem"
        width='100% '
        alignItems='flex-start'
        gap='1rem'
      >
        <Grid item xl={6}
          borderRadius="1rem"
          className="scroll-type"
          display="flex"
          flexDirection="column"
          gap="1rem"
        >
          <Typography display="flex" width="100%" position="sticky" padding="1.5rem 0" backgroundColor="white" top="0" variant='h4'>Appointments</Typography>
          {
            categorizedApt && categorizedApt.map((item, idx) => (
              <Box borderRadius={4} backgroundColor={theme.hospital.background} padding={2} display="flex" gap="1rem" flexDirection="column">
                <Typography variant="h5">{item.name}</Typography>
                {item.apts.map(apt => <Typography display="flex" gap="2rem" backgroundColor="white" padding={2} borderRadius={4}><span><strong>Date:</strong> {moment(apt.appointmentDate).format("DD/MM/YYYY")}</span> <span><strong>Time:</strong> {apt.appointmentStartTime}</span> <span><strong>Reason:</strong> {apt.reason}</span></Typography>)}
              </Box>
            ))
          }
        </Grid>
        <Grid item xl={6}
          padding='0 2rem 2rem'
          borderRadius="1rem"
          className="scroll-type"
          display="flex"
          flexDirection="column"
          gap="1rem"
          position="relative"
        >
          <Box display="flex" width="100%" position="sticky" padding="1.5rem 0" backgroundColor="white" top="0">
            <Typography variant='h4'>Doctors</Typography>
            <TextField type="text" variant="standard" sx={{ marginLeft: "auto" }} placeholder='Search Doctors' onChange={e => searchDoc(e.target.value)} />
            <Box
              className="scroll-type"
              display="flex"
              flexDirection="column"
              position="absolute"
              backgroundColor="white"
              boxShadow={`0 0 4px ${theme["green-olive"]}`}
              maxHeight="10rem"
              sx={{ overflowY: "scroll" }}
              right="0"
              width="30%"
              top="4rem"
            >
              {
                searchRes.map(item => <Typography padding="0.5rem 1rem" sx={{
                  cursor: "pointer",
                  '&:hover': {
                    backgroundColor: theme.hospital.background
                  }
                }}>{item.firstName}</Typography>)
              }
            </Box>
          </Box>
          <Box display="flex" gap="1rem" flexWrap="wrap">
            {
              categorizedDoctors && Object.keys(categorizedDoctors).map((item) => (
                <Box borderRadius={4} backgroundColor={theme.hospital.background} flexBasis="48%" padding={2} display="flex" gap="1rem" flexDirection="column">
                  <Typography variant="h5">{item}</Typography>
                  {categorizedDoctors[item].map(doc => <Typography backgroundColor="white" padding={2} borderRadius={4}>{doc.firstName}</Typography>)}
                </Box>
              ))
            }
          </Box>
        </Grid>
      </Grid>
    </Grid>
  )
}