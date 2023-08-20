import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material'
import React, { useState } from 'react'
import bookApt from '../assets/bookApt.png'
import { Toaster, toast } from 'react-hot-toast'
import { Users } from '../sdk/users'

export const BookAppointment = () => {
    const theme = useTheme()
    const user = new Users();
    const aptStatus = "Scheduled"

    const [myDoc, setMyDoc] = useState("")
    const [date, setDate] = useState("")
    const [reason, setReason] = useState("")
    const [errorDisplay, setErrorDisplay] = useState("none");

    const [doctor] = user.getDoctors();
    const [setApt, aptError] = user.setAppointment();

    return (
        <Box display="flex">
            <Toaster />
            <Box
                display={errorDisplay}
                position="absolute"
                left="50%"
                marginTop="1rem"
                borderRadius="0.5rem"
                boxShadow="0 3px 5px gray"
                fontWeight="bold"
                padding="1rem 3rem"
                backgroundColor={"white"}
                sx={{ transform: "translateX(-50%)" }}
            >{aptError ? aptError.data.message : "Booked Successfully"}
            </Box>
            <Box width="16%" backgroundColor={theme["purple-150"]} display="flex" flexDirection="column" justifyContent="space-between">
                <Typography variant='h2' fontSize="5rem" fontWeight="bolder" color="white">BOOK</Typography>
                <img src={bookApt} />
            </Box>
            <Box
                width="100%"
                display="flex"
                flexDirection="column"
                padding="0 1rem"
            >
                <Typography
                    variant='h2'
                    fontSize="5rem"
                    fontWeight="bolder"
                    color={theme["purple-150"]}
                >APPOINTMENT</Typography>
                <Box padding="4rem" display="flex" gap="2rem" flexWrap="wrap">
                    <Box style={{ width: "100%" }}>
                        <Typography variant="h6" style={{ marginBottom: "1rem" }}>Pick a Doctor:</Typography>
                        <FormControl style={{ width: "100%" }}>
                            <InputLabel id="selectDoctors">Doctor</InputLabel>
                            <Select
                                labelId="selectDoctors"
                                id="selectDoctors"
                                label="Doctor"
                                value={myDoc}
                                onChange={e => setMyDoc(e.target.value)}
                            >
                                {doctor ? doctor?.allDoc.map(item => (
                                    <MenuItem value={item._id}>
                                        {item.firstName} {item.lastName}
                                    </MenuItem>)) :
                                    <MenuItem value="Server Down">
                                        Server Down Please Try Later
                                    </MenuItem>}
                            </Select>
                        </FormControl>
                    </Box>
                    <Box style={{ width: "100%" }}>
                        <Typography variant="h6" style={{ marginBottom: "1rem" }}>Pick Date and Time:</Typography>
                        <input type='datetime-local'
                            label="Date"
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            style={{
                                padding: "1rem",
                                border: "1px solid lightgray",
                                borderRadius: "4px",
                                width: "100%"
                            }}
                        />
                        {/* {console.log(moment(date).toLocaleString())} */}
                    </Box>
                    <Box style={{ width: "100%" }}>
                        <Typography variant="h6" style={{ marginBottom: "1rem" }}>Status:</Typography>
                        <TextField
                            value={aptStatus}
                            fullWidth
                            disabled
                        />
                    </Box>
                    <Box style={{ width: "100%" }}>
                        <Typography variant="h6" style={{ marginBottom: "1rem" }}>Reason:</Typography>
                        <TextField
                            value={reason}
                            fullWidth
                            onChange={e => setReason(e.target.value)}
                        />
                    </Box>
                    <Button
                        variant="contained"
                        color="error"
                        sx={{
                            marginLeft: "auto",
                            padding: "0.6rem 2rem"
                        }}
                        onClick={() => user.submitAppointment(setErrorDisplay, setApt, myDoc, date, reason, aptStatus)}
                    >Submit</Button>
                </Box>
            </Box>
        </Box>
    )
}
