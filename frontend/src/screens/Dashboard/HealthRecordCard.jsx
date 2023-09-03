import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { Users } from "../../sdk/users";
import { useSelector } from "react-redux";

const HealthRecordCard = ({ docId, date, time, diagnosis }) => {
	const user = new Users();
	const allDocInfo = user.getDoctors();
	const {
		lang: { patient },
	} = useSelector((state) => state.language);

	if (!allDocInfo[0]) return "loading";

	const { firstName, currentHospitalWorkingName } = allDocInfo[0].allDoc.find(
		(item) => item._id == docId
	);

	const newLocal = `#736f0b`;
	return (
		<Box
			display="flex"
			sx={{
				backgroundColor: "white",
				color: "black",
				padding: "1.5rem",
				alignItems: "center",
				height: "6vh",
				borderRadius: "0.5rem",
				justifyContent: "space-between",

				"&:hover": { boxShadow: "0px 4px 18px 0px rgba(106, 69, 255, 0.4)" },
			}}
		>
			<Typography
				sx={{
					fontFamily: "Poppins",
					fontWeight: "500",
					fontSize: "1vw",
					textAlign: "left",
					padding: "0.5rem",
					borderRadius: "1rem",
					display: "flex",
					alignItems: "center",
				}}
			>
				<Typography
					sx={{
						fontFamily: "Poppins",
						fontWeight: "500",
						fontSize: "1vw",
						textAlign: "left",
						color: "#5A4B9A",
					}}
				>
					{patient.healthRecord.diagnosis} :{" "}
				</Typography>
				{diagnosis}
			</Typography>
			<Box display={"flex"} flexDirection={"column"} alignItems={"center"}>
				<Typography
					sx={{
						fontFamily: "poppins",
						color: "#5A4B9A",
						fontWeight: "700",
						fontSize: "0.9vw",
					}}
				>
					{firstName}
				</Typography>
				<Typography
					sx={{
						fontFamily: "poppins",
						color: "#969696",
						fontWeight: "500",
						fontSize: "0.8vw",
					}}
				>
					{currentHospitalWorkingName}
				</Typography>
			</Box>
			<Typography
				sx={{
					fontFamily: "poppins",
					fontWeight: "400",
					fontSize: "0.9vw",
					padding: "0.5rem",
				}}
			>
				{date}
			</Typography>
			<Typography
				sx={{ fontFamily: "poppins", fontWeight: "400", fontSize: "0.9vw" }}
			>
				{time}
				{" hrs"}
			</Typography>
		</Box>
	);
};

export default HealthRecordCard;
