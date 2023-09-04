import { Box, Button, Typography } from "@mui/material";
import React from "react";

import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { setPatientId } from "../../slices/patientIdSlice";
import { useTheme } from "@emotion/react";
import { setAptId } from "../../slices/aptIdSlice";
const AppointmentCard = ({ reason,aptid, idx, name, time, id }) => {
	const dispatch = useDispatch();
	const theme = useTheme();
	const {
		lang: { doctor },
	} = useSelector((state) => state.language);

	const setId = async (id) => {
		dispatch(setPatientId(id));
		dispatch(setAptId(aptid));
		localStorage.setItem('reason', reason);
	};

	const newLocal = `#736f0b`;
	console.log(reason)
	return (
		<Box
			className="main-card"
			display="flex"
			sx={{
				backgroundColor: "white",
				color: "black",
				padding: "2rem",
				alignItems: "center",
				height: "10vh",
				width: "100%",
				borderRadius: "0.5rem",
				justifyContent: "space-between",
				boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.15)",
				[theme.breakpoints.down("sm")]: {
					padding: "1rem",
				},
				[theme.breakpoints.down("xsm")]: {
					display: "grid",
					gridTemplateRows: "3rem 3rem",
					gridTemplateColumns: "auto auto",
					height: "unset",
					placeItems: "center",
				},
			}}
		>
			<Typography
				sx={{
					fontFamily: "Poppins",
					fontWeight: "500",
					fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
					textAlign: "left",
					display: "flex",
					alignItems: "center",
				}}
			>
				{idx}
			</Typography>
			<Typography
				sx={{
					fontFamily: "Poppins",
					fontWeight: "500",
					fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
					textAlign: "left",
					backgroundColor: "#FFFB93",
					padding: "0.5rem",
					borderRadius: "1rem",
					display: "flex",
					alignItems: "center",
					[theme.breakpoints.down("xsm")]: {
						flexDirection: "column",
						backgroundColor: "white",
					},
				}}
			>
				<Typography
					sx={{
						fontFamily: "Poppins",
						fontWeight: "500",
						fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
						textAlign: "left",
						color: newLocal,
						[theme.breakpoints.down("md")]: {
							display: "none",
						},
						[theme.breakpoints.down("xsm")]: {
							display: "block",
							width: "max-content",
						},
					}}
				>
					{doctor.dashboard.apt.patientName} :{" "}
				</Typography>
				{name}
			</Typography>
			<Typography
				sx={{
					fontFamily: "Poppins",
					fontWeight: "500",
					fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
					textAlign: "left",
					display: "flex",
					alignItems: "center",
					[theme.breakpoints.down("xsm")]: {
						flexDirection: "column",
						backgroundColor: "white",
					},
				}}
			>
				<Typography
					sx={{
						fontFamily: "Poppins",
						fontWeight: "500",
						fontSize: "clamp(0.8rem, 1.5vw, 1rem)",
						textAlign: "left",
						color: `${theme.doctor.primary}`,
						[theme.breakpoints.down("md")]: {
							display: "none",
						},
						[theme.breakpoints.down("xsm")]: {
							display: "block",
						},
					}}
				>
					{doctor.dashboard.apt.time} :{" "}
				</Typography>
				{time}
			</Typography>
			<Link to="/add-record">
				<Button
					sx={{
						boxShadow: "0px 4px 18px 0px rgba(0, 0, 0, 0.4)",
						fontFamily: "Poppins",
						fontWeight: "500",
						fontSize: "clamp(0rem, 1.5vw, 1.5rem)",
						textTransform: "capitalize",
						color: "white",
						backgroundColor: "green",
						"&:hover": {
							backgroundColor: "white",
							color: "green",
							boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
						},
						[theme.breakpoints.down("xsm")]: {
							fontSize: "0.8rem",
							width: "unset",
						},
					}}
					onClick={() => setId(id)}
				>
					{doctor.dashboard.apt.examine}
				</Button>
			</Link>
		</Box>
	);
};

export default AppointmentCard;
