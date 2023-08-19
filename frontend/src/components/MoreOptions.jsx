import more from '../assets/more.svg'
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography, useTheme } from '@mui/material'
import React, { useEffect, useState } from 'react'
import bookApt from '../assets/bookApt.png'
import { useGetAllDoctorsQuery } from '../slices/doctorsApiSlice'
import moment from 'moment'
import { useGetAppointmentsQuery, useSetAppointmentMutation } from '../slices/usersApiSlice'
import { Users } from '../sdk/users'


export const MoreOptions = ({ _id, aptDisplay, setAptDisplay, apt }) => {
    const user = new Users();
    const [myDoc, setMyDoc] = useState("")
    const [date, setDate] = useState("")
    const [reason, setReason] = useState("")
    // const [myApt, setMyApt] = useState("")
    const [doctor] = user.getDoctors();
    const [setApt] = useSetAppointmentMutation();
    // const { data: apt } = useGetAppointmentsQuery();

    const openDialog = () => {
        setAptDisplay(p => p === "block" ? "none" : "block")
        const myApt = apt?.find(item => item._id === _id);
        setMyDoc(myApt.doctorId);
        setDate(moment(myApt.appointmentDate).format('yyyy-MM-DDThh:mm'));
        setReason(myApt.reason);
    }

    const submitAppointment = async () => {
        const newApt = {
            doctorId: myDoc,
            appointmentDate: moment(date).format('YYYY-MM-DD'),
            appointmentStartTime: moment(date).format('HH:MM'),
            status: "Scheduled",
            reason
        }
        try {
            if (reason === "") throw new Error("Add some reason")
            setApt(newApt)
        }
        catch (e) {
            console.error(e.message);
        }
    }

    // useEffect(() => {
    //     console.log(_id);
    //     const myApt = apt?.find(item => item._id === _id);
    //     setMyDoc(myApt.doctorId);
    //     setDate(moment(myApt.appointmentDate).format('yyyy-MM-DDThh:mm'));
    //     setReason(myApt.reason);
    // }, [openDialog])


    return (
        <Box
            height="1.5rem"
            paddingRight={1}
            padding="0 0.5rem"
            boxSizing={"border-box"}
            outline="1px solid black"
            sx={{ cursor: "pointer", userSelect: "none" }}
            onClick={e => e.stopPropagation()}
        >
            <img src={more} alt="more" style={{ height: "80%" }} onClick={openDialog} />
            <Box
                backgroundColor="white"
                boxShadow="0 0 5px gray"
                display={aptDisplay}
                position="absolute"
                left="50%"
                top="50%"
                padding="1rem"
                borderRadius="8px"
                sx={{ transform: "translate(-50%, -50%)" }}
            > <Box
                width="100%"
                display="flex"
                flexDirection="column"
                padding="0 1rem"
            >

                    <Box padding="1rem" display="flex" gap="2rem" flexWrap="wrap">
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
                            color="success"
                            sx={{
                                marginLeft: "auto",
                                padding: "0.6rem 2rem"
                            }}
                            onClick={submitAppointment}
                        >Edit</Button>
                        <Button
                            variant="contained"
                            color="error"
                            sx={{
                                padding: "0.6rem 2rem"
                            }}
                            onClick={submitAppointment}
                        >Delete</Button>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
}
