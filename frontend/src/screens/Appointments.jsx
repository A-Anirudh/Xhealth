import { Box, Typography, useTheme } from '@mui/material'
import React from 'react'
import more from '../assets/more.svg'

export const Appointments = () => {
    const theme = useTheme();

    return (
        <Box display="flex" alignItems="center" flexDirection="column">
            <Box display="flex" flexDirection="column" width="60%" marginTop="5rem" gap={3}>
                <Typography variant="h3">
                    Appointments
                </Typography>
                <Box width="100%" height="100vh" backgroundColor={theme["purple-100"]} borderRadius="1rem" padding={4} display="flex" flexDirection="column" gap={4} alignItems="flex-start">
                    <Typography marginLeft={4} padding="0.3rem 1rem" color="white" backgroundColor={theme["green-olive"]} display="inline-block" borderRadius={99}>
                        August
                    </Typography>
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
                        <Box height="50%" paddingRight={1}>
                            <img src={more} alt="more" style={{ height: "100%" }} />
                        </Box>
                    </Box>
                    <Box padding="1rem" borderRadius="1rem" backgroundColor="white" boxShadow="0 4px 18px rgba(0, 0, 0, 0.15)" display="flex" alignItems="center" width="100%" justifyContent="space-between">
                        <Typography
                            padding="0.3rem 1rem"
                            fontWeight="bold"
                            backgroundColor={theme["green-150"]}
                            borderRadius={99}
                            textAlign="center"
                            width={"7rem"}
                        >
                            Visited
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
                        <Box height="50%" paddingRight={1}>
                            <img src={more} alt="more" style={{ height: "100%" }} />
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box >
    )
}
