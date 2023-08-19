import React, { useEffect, useState } from 'react'
import userIcon from '../../assets/profile.png'
import profileUser from '../../assets/profileIcon.png'
import { Box, Button, TextField, Typography, useTheme } from '@mui/material'
import moment from 'moment/moment'
import { Toaster, toast } from 'react-hot-toast'
import { Users } from '../../sdk/users'
import { userDetails } from '../../dump'

export const UserProfile = () => {
    const theme = useTheme();
    const user = new Users();
    const [userInfo] = user.getUserInfo();
    const editUser = user.editUserDetails();
    const [userDetail, setUserDetail] = useState({});
    const setCreds = (e) => {
        const { value, name } = e.target;
        setUserDetail(p => ({ ...p, [name]: value }))
    }
    const postUserCreds = () => {
        try {
            const date = moment(userDetail["dateOfBirth"]).toDate();
            const updateDateFormat = { ...userDetail, dateOfBirth: date };
            editUser(updateDateFormat)
            toast.success("User Updated");
        } catch (e) {
            console.error(e)
            toast.error("Error Occured! Please try again later!")
        }
    }

    useEffect(() => {
        userInfo && Object.keys(userInfo).map(item => {
            if (item === "dateOfBirth") {
                const date = new Date(userInfo[item]);
                const formatDate = moment(date).format("YYYY-MM-DD")
                setUserDetail(p => ({ ...p, [item]: formatDate }))
            } else {
                setUserDetail(p => ({ ...p, [item]: userInfo[item] }))
            }
        })
    }, [userInfo])

    return (
        <Box
            display="flex"
            justifyContent="center"
            marginBottom="5rem"
        >
            <Toaster />
            <Box
                display="flex"
                flexDirection="column"
                borderRadius="2rem"
                width="70%"
                margin="4rem"
            >
                <Box
                    sx={{ background: "linear-gradient(270deg, #FFF 0%, #622865 100%)" }}
                    width="100%"
                    display="flex"
                    height="11rem"
                    alignItems="center"
                    padding="0 4rem"
                    borderRadius="2rem 2rem 0 0"
                >
                    <Typography fontSize="4rem" fontWeight="600" sx={{
                        background: "linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
                        backgroundClip: "text",
                        "text-fill-color": "transparent"
                    }}>
                        PROFILE
                    </Typography>
                    <img src={userIcon} style={{ height: "90%", marginLeft: "auto" }} />
                </Box>
                <Box padding="0 4rem" display="flex">
                    <img src={profileUser} style={{ marginTop: "-2rem" }} />
                    <Box
                        marginLeft="auto"
                        padding="2rem"
                        paddingRight={0}
                        display="flex"
                        gap={4}
                    >
                        <Button variant="contained" color="success" onClick={postUserCreds}>
                            Update
                        </Button>
                    </Box>
                </Box>
                <Box display="flex" alignItems="center" margin="2rem 0">
                    <hr style={{ height: "2px", background: `${theme["purple-150"]}`, width: "5%" }} />
                    <Typography fontWeight="600" fontSize="2rem" padding="0 0.5rem" width="max-content" color={`${theme["purple-150"]}`}>Personal Information</Typography>
                    <hr style={{ height: "2px", background: `${theme["purple-150"]}`, width: "calc(100% - 25rem)" }} />
                </Box>
                <Box display="flex" gap="4rem" flexWrap="wrap">
                    {userDetails.personal.map(({ name, id, type }) => <Box
                        border="1px solid lightgray"
                        borderRadius="7px"
                        padding="0.3rem 1rem"
                        display="flex"
                        alignItems="center"
                        gap="3px"
                        width="40%"
                        key={id}
                    >
                        <Typography minWidth="max-content" fontWeight="bold" paddingRight="1rem" marginRight="1rem" borderRight="1px solid lightgray">
                            {name}
                        </Typography>
                        <TextField
                            variant="standard"
                            margin="none"
                            required
                            fullWidth
                            InputProps={{ disableUnderline: true }}
                            onChange={e => setCreds(e)}
                            name={id}
                            value={userDetail[id]}
                            type={type}
                        >
                        </TextField>
                    </Box>)}
                </Box>
                <Box display="flex" alignItems="center" margin="2rem 0">
                    <hr style={{ height: "2px", background: `${theme["purple-150"]}`, width: "5%" }} />
                    <Typography fontWeight="600" fontSize="2rem" padding="0 0.5rem" width="max-content" color={`${theme["purple-150"]}`}>Contact Information</Typography>
                    <hr style={{ height: "2px", background: `${theme["purple-150"]}`, width: "calc(100% - 25rem)" }} />
                </Box>
                <Box display="flex" gap="4rem" flexWrap="wrap">
                    {userDetails.contact.map(({ name, id, type, disabled }) =>
                        <Box
                            border="1px solid lightgray"
                            borderRadius="7px"
                            padding="0.3rem 1rem"
                            display="flex"
                            alignItems="center"
                            gap="3px"
                            width="40%"
                            key={id}
                        >
                            <Typography minWidth="max-content" fontWeight="bold" paddingRight="1rem" marginRight="1rem" borderRight="1px solid lightgray">
                                {name}
                            </Typography>
                            <TextField
                                variant="standard"
                                margin="none"
                                required
                                fullWidth
                                InputProps={{ disableUnderline: true }}
                                onChange={e => setCreds(e)}
                                name={id}
                                value={userDetail[id]}
                                type={type}
                                disabled={disabled}
                            >
                            </TextField>
                        </Box>
                    )}
                </Box>
            </Box>
        </Box >
    )
}
