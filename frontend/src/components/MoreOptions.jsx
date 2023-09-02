import more from "../assets/more.svg";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  useTheme,
} from "@mui/material";
import React from "react";
import moment from "moment";
import { useEditAppointmentMutation } from "../slices/usersApiSlice";
import { Users } from "../sdk/users";

export const MoreOptions = ({
  _id,
  aptDisplay,
  setAptDisplay,
  myDoc,
  setMyDoc,
  date,
  setDate,
}) => {
  const user = new Users();
  const [doctor] = user.getDoctors();
  const [editApt] = useEditAppointmentMutation();
  const theme = useTheme();

  const submitAppointment = async () => {
    const updatedApt = {
      aptId: _id,
      newDoctorId: myDoc,
      newAppointmentDate: moment(date).format("YYYY-MM-DD"),
      newAppointmentTime: moment(date).format("HH:MM"),
    };
    try {
      await editApt(updatedApt);
      setAptDisplay("none");
    } catch (e) {
      console.error(e.message);
    }
  };

  return (
    <Box
      backgroundColor="white"
      boxShadow="0 0 5px gray"
      display={aptDisplay}
      position="fixed"
      left="50%"
      top="50%"
      padding="1rem"
      borderRadius="8px"
      sx={{
        transform: "translate(-50%, -50%)",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      {" "}
      <Box width="100%" display="flex" flexDirection="column" padding="0 1rem">
        <Box padding="1rem" display="flex" gap="2rem" flexWrap="wrap">
          <Box style={{ width: "100%" }}>
            <Typography
              variant="h6"
              style={{ marginBottom: "1rem" }}
              fontFamily={"poppins"}
            >
              Pick a Doctor:
            </Typography>
            <FormControl style={{ width: "100%" }}>
              <InputLabel id="selectDoctors">Doctor</InputLabel>
              <Select
                labelId="selectDoctors"
                id="selectDoctors"
                label="Doctor"
                value={myDoc}
                onChange={(e) => setMyDoc(e.target.value)}
              >
                {doctor ? (
                  doctor?.allDoc.map((item) => (
                    <MenuItem value={item._id} key={item._id}>
                      {item.firstName} {item.lastName}
                    </MenuItem>
                  ))
                ) : (
                  <MenuItem value="Server Down">
                    Server Down Please Try Later
                  </MenuItem>
                )}
              </Select>
            </FormControl>
          </Box>
          <Box style={{ width: "100%" }}>
            <Typography
              variant="h6"
              style={{ marginBottom: "1rem" }}
              fontFamily={"poppins"}
            >
              Pick Date and Time:
            </Typography>
            <input
              type="datetime-local"
              label="Date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              style={{
                padding: "1rem",
                border: "1px solid lightgray",
                borderRadius: "4px",
                width: "100%",
              }}
            />
          </Box>
          <Button
            variant="contained"
            color="success"
            sx={{
              marginLeft: "auto",
              padding: "0.6rem 2rem",
              fontFamily: "poppins",
              textTransform: "capitalize",
              [theme.breakpoints.down("md")]: {
                margin: "0 auto",
              },
            }}
            onClick={submitAppointment}
          >
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            sx={{
              padding: "0.6rem 2rem",
              fontFamily: "poppins",
              textTransform: "capitalize",
              [theme.breakpoints.down("md")]: {
                margin: "0 auto",
              },
            }}
            onClick={submitAppointment}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
