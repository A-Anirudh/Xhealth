import { Box, Button, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import moment from 'moment';
import { Link } from 'react-router-dom';
import { MoreOptions } from '../components';
import { useAptDetails } from '../hooks';

export const Appointments = () => {
    const theme = useTheme();
    const [aptDisplay, setAptDisplay] = useState("none")
    const { sortedAppointments, appointments } = useAptDetails();

    return (
        <Box display="flex" alignItems="center" flexDirection="column" onClick={() => setAptDisplay("none")}>
            <Box
                display="flex"
                flexDirection="column"
                width="60%"
                marginTop="5rem"
                gap={3}
            >
                <Box display="flex" alignItems="center" width="100%">
                    <Typography variant="h3">
                        Appointments
                    </Typography>
                    <Button sx={{ marginLeft: "auto" }} variant="contained" color="success"><Link style={{ textDecoration: "none", color: "white" }} to="/book-appointment">Book Appointment</Link></Button>
                </Box>
                {
                    sortedAppointments && Object.keys(sortedAppointments).length > 0 ?
                        <Box
                            width="100%"
                            backgroundColor={theme["purple-100"]}
                            borderRadius="1rem 1rem 0 0"
                            padding={4}
                            paddingTop={0}
                            minHeight="100vh"
                        >

                            {sortedAppointments && Object.keys(sortedAppointments)?.map((item, idx) => (
                                <Box
                                    width="100%"
                                    display="flex"
                                    flexDirection="column"
                                    gap={4}
                                    alignItems="flex-start"
                                    paddingTop={4}
                                    key={idx}
                                >
                                    <Typography marginLeft={4} padding="0.3rem 1rem" color="white" backgroundColor={theme["green-olive"]} display="inline-block" borderRadius={99}>
                                        {item}
                                    </Typography>
                                    {sortedAppointments && sortedAppointments[item].map(({ _id, appointmentDate, appointmentStartTime, status, hospitalName, doctorName, state, department }) => (
                                        <Box padding="1rem" borderRadius="1rem" backgroundColor="white" boxShadow="0 4px 18px rgba(0, 0, 0, 0.15)" display="flex" alignItems="center" width="100%" justifyContent="space-between">
                                            <Typography
                                                padding="0.3rem 1.5rem"
                                                fontWeight="bold"
                                                backgroundColor={theme[status]}
                                                borderRadius={99}
                                                textAlign="center"
                                                key={_id}
                                            >
                                                {status}
                                            </Typography>
                                            <Box
                                                height="1.5rem"
                                                borderRight={`1px solid ${theme['gray-200']}`}
                                            ></Box>
                                            <Typography fontWeight="bold">
                                                {department}
                                            </Typography>
                                            <Box
                                                height="1.5rem"
                                                borderRight={`1px solid ${theme['gray-200']}`}
                                            ></Box>
                                            <Box display="flex" alignItems="center" flexDirection="column">
                                                <Typography fontWeight="bold">
                                                    {moment(appointmentDate).format("DD/MM/YYYY")}
                                                </Typography>
                                                <Typography color={theme['gray-200']} fontSize="0.8rem">
                                                    {moment(appointmentStartTime, "HH:mm:ss").format("hh:mm A")}, IST
                                                </Typography>
                                            </Box>
                                            <Box
                                                height="1.5rem"
                                                borderRight={`1px solid ${theme['gray-200']}`}
                                            ></Box>
                                            <Box display="flex" alignItems="center" flexDirection="column">
                                                <Typography fontWeight="bold" color={theme["purple-150"]}>
                                                    {hospitalName}
                                                </Typography>
                                                <Typography fontWeight="bold" fontSize="0.8rem">
                                                    {state}
                                                </Typography>
                                            </Box>
                                            <Box
                                                height="1.5rem"
                                                borderRight={`1px solid ${theme['gray-200']}`}
                                            ></Box>
                                            <Box display="flex" alignItems="center" flexDirection="column">
                                                <Typography fontWeight="bold">
                                                    {doctorName}
                                                </Typography>
                                            </Box>
                                            <MoreOptions _id = {_id} aptDisplay={aptDisplay} setAptDisplay={setAptDisplay} apt={appointments} />
                                        </Box>
                                    ))}
                                </Box>
                            ))}
                        </Box> :
                        <Typography variant="h5" padding="1rem" color="white" textAlign="center" backgroundColor={theme["green-olive"]} display="inline-block" borderRadius={99}>
                            No Appointments Booked!
                        </Typography>
                }
            </Box>
        </Box>
    )
}
