import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import more from '../assets/more.svg'
import { useGetAppointmentsQuery } from '../slices/usersApiSlice';
import moment from 'moment';

export const Appointments = () => {
    const theme = useTheme();
    const { data: appointments } = useGetAppointmentsQuery();
    const [sortedAppointments, setSortedAppointments] = useState({});

    useEffect(() => {
        const upcoming = appointments?.filter(app => app.status === "Scheduled");
        console.log(upcoming);
        // const inProgress = appointments?.filter(app => app.status === "In Progress");
        // const visited = appointments?.filter(app => app.status === "Completed");
        // const cancelled = appointments?.filter(app => app.status === "Cancelled");
        // appointments && setSortedAppointments([...inProgress, ...upcoming, ...visited, ...cancelled ]);
        /** Status - appointments
         * appointment type ---  ????
         * date and time of appointment ---- appointments
         * hospital name ---- doctor api
         * location ---- doctor api
         * doctorname ---- doctor api
         * doctor type ----- doctor api
         * 
        */

        const monthlySorted = appointments?.reduce((acc, curr) => {
            const month = moment(curr.appointmentDate).format("MMMM");
            return { ...acc, [month]: Array.isArray(acc[month]) ? [...acc[month], curr] : [curr] }
        }, {})
        setSortedAppointments(monthlySorted);
    }, [appointments])

    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            <Box
                display="flex"
                flexDirection="column"
                width="60%"
                marginTop="5rem"
                gap={3}
            >
                <Typography variant="h3">
                    Appointments
                </Typography>
                <Box
                    width="100%"
                    // height="100vh"
                    backgroundColor={theme["purple-100"]}
                    borderRadius="1rem 1rem 0 0"
                    padding={4}
                    paddingTop={0}
                >
                    {sortedAppointments && Object.keys(sortedAppointments)?.map(item => (
                        <Box
                            width="100%"
                            display="flex"
                            flexDirection="column"
                            gap={4}
                            alignItems="flex-start"
                            paddingTop={4}
                        >
                            <Typography marginLeft={4} padding="0.3rem 1rem" color="white" backgroundColor={theme["green-olive"]} display="inline-block" borderRadius={99}>
                                {item}
                            </Typography>
                            {sortedAppointments[item].map(({ status }) => (
                                <Box padding="1rem" borderRadius="1rem" backgroundColor="white" boxShadow="0 4px 18px rgba(0, 0, 0, 0.15)" display="flex" alignItems="center" width="100%" justifyContent="space-between">
                                    <Typography
                                        padding="0.3rem 1rem"
                                        fontWeight="bold"
                                        backgroundColor={theme["yellow-200"]}
                                        borderRadius={99}
                                        width={"7rem"}
                                        textAlign="center"
                                    >
                                        Upcoming
                                    </Typography>
                                    <Box
                                        height="1.5rem"
                                        borderRight={`1px solid ${theme['gray-200']}`}
                                    ></Box>
                                    <Typography fontWeight="bold">
                                        Cardio
                                    </Typography>
                                    <Box
                                        height="1.5rem"
                                        borderRight={`1px solid ${theme['gray-200']}`}
                                    ></Box>
                                    <Box display="flex" alignItems="center" flexDirection="column">
                                        <Typography fontWeight="bold">
                                            17-08-2023
                                        </Typography>
                                        <Typography color={theme['gray-200']} fontSize="0.8rem">
                                            11:00 am,IST
                                        </Typography>
                                    </Box>
                                    <Box
                                        height="1.5rem"
                                        borderRight={`1px solid ${theme['gray-200']}`}
                                    ></Box>
                                    <Box display="flex" alignItems="center" flexDirection="column">
                                        <Typography fontWeight="bold" color={theme["purple-150"]}>
                                            Moneypal
                                        </Typography>
                                        <Typography fontWeight="bold" fontSize="0.8rem">
                                            Bengaluru
                                        </Typography>
                                    </Box>
                                    <Box
                                        height="1.5rem"
                                        borderRight={`1px solid ${theme['gray-200']}`}
                                    ></Box>
                                    <Box display="flex" alignItems="center" flexDirection="column">
                                        <Typography fontWeight="bold">
                                            Dr.Shreyas
                                        </Typography>
                                        <Typography color={theme['gray-200']} fontSize="0.8rem">
                                            Cardiologist
                                        </Typography>
                                    </Box>
                                    <Box height="1.5rem" paddingRight={1}>
                                        <img src={more} alt="more" style={{ height: "80%" }} />
                                    </Box>
                                </Box>
                            ))}
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box >
    )
}
