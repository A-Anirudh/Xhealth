import {
	Box,
	Button,
	FormControl,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
	useTheme,
} from "@mui/material";
import React, { useState } from "react";
import bookApt from "../assets/bookApt.png";
import { Toaster, toast } from "react-hot-toast";
import { Users } from "../sdk/users";
import { useSelector } from "react-redux";
import moment from "moment";

export const BookAppointment = () => {
	const theme = useTheme();
	const user = new Users();
	const aptStatus = "Scheduled";
	const {
		lang: { patient },
	} = useSelector((state) => state.language);

	const [myDoc, setMyDoc] = useState("");
	const [date, setDate] = useState("");
	const [reason, setReason] = useState("");
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
			>
				{aptError ? aptError.data.message : "Booked Successfully"}
			</Box>
			<Box
				width="16%"
				backgroundColor={theme["purple-150"]}
				display="flex"
				flexDirection="column"
				justifyContent="space-between"
			>
				<Typography
					variant="h2"
					fontSize="5rem"
					fontWeight="bolder"
					color="white"
					fontFamily={'poppins'}
					textAlign={'right'}
					
				>
					{patient.doctorRecommendation.book}
				</Typography>
				<img src={bookApt} />
			</Box>
			<Box width="100%" display="flex" flexDirection="column" padding="0 1rem">
				<Typography
					variant="h2"
					fontSize="5rem"
					fontWeight="bolder"
					fontFamily={'poppins'}
					color={theme["purple-150"]}
					textAlign={'left'}
				>
					{patient.appointments.label}
				</Typography>
				<Box padding="4rem" display="flex" gap="2rem" flexWrap="wrap">
					<Box style={{ width: "100%" }}>
						<Typography variant="h6" style={{ marginBottom: "1rem" }}>
							{patient.appointments.pickDoc}
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
										<MenuItem value={item._id}>
											{item.firstName} {item.lastName}
										</MenuItem>
									))
								) : (
									<MenuItem value="Server Down">
										{patient.appointments.serverDown}
									</MenuItem>
								)}
							</Select>
						</FormControl>
					</Box>
					<Box style={{ width: "100%" }}>
						<Typography variant="h6" style={{ marginBottom: "1rem" }}>
							{patient.appointments.pickDT}
						</Typography>
						<input
							type="datetime-local"
							label="Date"
							value={date}
							min={moment().format('YYYY-MM-DDTHH:mm')}
							max={moment(new Date().setMonth(new Date().getMonth() + 1)).format('YYYY-MM-DDTHH:mm')}
							onChange={(e) => setDate(e.target.value)}
							style={{
								padding: "1rem",
								border: "1px solid lightgray",
								borderRadius: "4px",
								width: "100%",
							}}
						/>
					</Box>
					<Box style={{ width: "100%" }}>
						<Typography variant="h6" style={{ marginBottom: "1rem" }}>
							{patient.appointments.status}:
						</Typography>
						<TextField value={aptStatus} fullWidth disabled />
					</Box>
					<Box style={{ width: "100%" }}>
						<Typography variant="h6" style={{ marginBottom: "1rem" }}>
							{patient.appointments.reason}:
						</Typography>
						<TextField
							value={reason}
							fullWidth
							onChange={(e) => setReason(e.target.value)}
						/>
					</Box>
					<Button
						variant="contained"
						color="success"
						sx={{
							marginLeft: "auto",
							padding: "0.6rem 2rem",
							fontFamily:'poppins',
							textTransform:"capitalize"
						}}
						onClick={() =>
							user.submitAppointment(
								setErrorDisplay,
								setApt,
								myDoc,
								date,
								reason,
								aptStatus
							)
						}
					>
						{patient.appointments.submit}
					</Button>
				</Box>
			</Box>
		</Box>
	);
};
