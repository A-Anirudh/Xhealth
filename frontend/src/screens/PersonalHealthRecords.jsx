import { Box, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import more from '../assets/more.svg'
import { useGetAppointmentsQuery } from '../slices/usersApiSlice';
import moment from 'moment';
import { useGetAllDoctorsQuery } from '../slices/doctorsApiSlice';
import { Link } from 'react-router-dom';
import { useAddHealthRecordMutation, useGetHealthRecordsQuery } from '../slices/healthRecordSlice';

export const PersonalHealthRecords = () => {
    const theme = useTheme();
    const { data: appointments } = useGetAppointmentsQuery();
    const { data: doctors } = useGetAllDoctorsQuery();
    const {data: HRData} = useGetHealthRecordsQuery();
    const [addHR] = useAddHealthRecordMutation();
    const [sortedAppointments, setSortedAppointments] = useState({});

    useEffect(() => {

        // addHR({record: {"asdasd": "Asdasdasdasd"}})
        // console.log(HRData.history);
        console.log(appointments);
        const doctorDetails = appointments?.map(({ _id, doctorId, appointmentDate, appointmentStartTime, status }, idx) => {
            const docDetail = doctors?.allDoc?.find(({ _id }) => _id === doctorId);
            return ({
                appointmentDate,
                appointmentStartTime, status,
                hospitalName: docDetail?.currentHospitalWorkingName,
                state: docDetail?.state,
                city: docDetail?.city,
                doctorName: docDetail?.firstName,
                department: docDetail?.department,
                // healthRecord: HRData ? HRData.history[idx] : "",
                healthRecord: "https://picsum.photos/99/99",
                _id
            })
        }).filter(app => new Date(app.appointmentDate).getFullYear() === new Date().getFullYear())


        const monthlySorted = doctorDetails?.reduce((acc, curr) => {
            const month = moment(curr.appointmentDate).format("MMMM");
            return { ...acc, [month]: Array.isArray(acc[month]) ? [...acc[month], curr] : [curr] }
        }, {})
        console.log(doctorDetails);
        setSortedAppointments(monthlySorted);
        console.log(sortedAppointments);
    }, [appointments, doctors, HRData])

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
                    Personal Health Records
                </Typography>
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
                                    {sortedAppointments && sortedAppointments[item].map(({ _id, appointmentDate, appointmentStartTime, hospitalName, doctorName, state, department, healthRecord }) => (
                                        <Box padding="1rem" borderRadius="1rem" backgroundColor="white" boxShadow="0 4px 18px rgba(0, 0, 0, 0.15)" display="flex" alignItems="center" width="100%" justifyContent="space-between">
                                            <Typography
                                                padding="0.3rem 1.5rem"
                                                fontWeight="bold"
                                                backgroundColor={theme["In Progress"]}
                                                borderRadius={99}
                                                textAlign="center"
                                                key={_id}
                                            >
                                                {doctorName}
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
                                                <Link to={healthRecord} target="_blank">
                                                    Health Record
                                                </Link>
                                            </Box>
                                            <Box height="1.5rem" paddingRight={1}>
                                                <img src={more} alt="more" style={{ height: "80%" }} />
                                            </Box>
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
