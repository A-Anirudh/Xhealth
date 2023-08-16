import { Box, Input, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import more from '../assets/more.svg'
import star from '../assets/vector.png';
import search from '../assets/search.png';
import { useGetAllDoctorsQuery } from '../slices/doctorsApiSlice';
let debounce;

export const DoctorRecommendation = () => {
    const theme = useTheme();
    const { data: doctors } = useGetAllDoctorsQuery();
    const [doctorsData, setDoctorsData] = useState();

    const getResult = (e) => {
        clearTimeout(debounce);
        debounce = setTimeout(() => {
            if (e.target.value === "") {
                setDoctorsData(doctors);
            }
            else {
                const filteredDoctors = [
                    ...doctors.allDoc.filter(item =>
                        item.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        item.department.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        item.currentHospitalWorkingName.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        item.city.toLowerCase().includes(e.target.value.toLowerCase()) ||
                        item.avgRating === Number(e.target.value)
                    )
                ]
                setDoctorsData({ allDoc: [...filteredDoctors] });
            }
        }, 300)
    }

    // useEffect(() => {
    //     const debounce = setTimeout(() => {
    //     })
    // }, [])

    useEffect(() => {
        setDoctorsData(doctors);
    }, [doctors])

    return (
        <Box display="flex" alignItems="center" flexDirection="column" gap={4}>
            <Box display="flex" alignItems="center" sx={{ marginTop: "5rem", boxShadow: "1px 1px 4px black", width: "60%", textAlign: "center", borderRadius: "1rem" }}>
                <Box paddingLeft={2}><img style={{ height: "1.5rem" }} src={search} /></Box>
                <Input type="text"
                    sx={{ padding: "1rem", width: "100%" }}
                    onChange={(e) => getResult(e)}
                    placeholder="Search about Firstname, Department, Average Rating, Hospital Name, or City"
                    disableUnderline
                />
            </Box>
            <Box
                display="flex"
                flexDirection="column"
                width="60%"
                gap={3}
            >
                <Typography variant="h3">
                    Doctor Recommendation
                </Typography>
                <Box
                    width="100%"
                    backgroundColor={theme["purple-100"]}
                    borderRadius="1rem 1rem 0 0"
                    padding={4}
                    paddingTop={0}
                    minHeight="100vh"
                >
                    <Box
                        width="100%"
                        display="flex"
                        flexDirection="column"
                        gap={4}
                        alignItems="flex-start"
                        paddingTop={4}
                    >
                        {doctorsData && doctorsData.allDoc.map(({ firstName, department, currentHospitalWorkingName, avgRating }) => (
                            <Box padding="1rem" borderRadius="1rem" backgroundColor="white" boxShadow="0 4px 18px rgba(0, 0, 0, 0.15)" display="flex" alignItems="center" width="100%" justifyContent="space-between">
                                <Box
                                    borderRadius={99}
                                    height="6rem"
                                    width="6rem"
                                >
                                    <img style={{ height: "100%" }} src="https://picsum.photos/200/200" />
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="column">
                                    <Typography fontWeight="bold">
                                        {firstName}
                                    </Typography>
                                    <Typography color={theme['gray-200']} fontSize="0.8rem">
                                        {department}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" flexDirection="column">
                                    <Typography fontWeight="bold" color={theme["purple-150"]}>
                                        Working at {currentHospitalWorkingName}
                                    </Typography>
                                </Box>
                                <Box display="flex" alignItems="center" gap={1}>
                                    {
                                        avgRating ? Array.from(Array(avgRating).keys()).map(() => <img src={star} />) :
                                            <img src={star} />
                                    }
                                </Box>
                                <Box height="1.5rem" paddingRight={1}>
                                    <img src={more} alt="more" style={{ height: "80%" }} />
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}