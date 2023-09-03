import React, { useEffect, useState } from "react";
import { useGetHealthRecordsMutation } from "../slices/healthRecordSlice";
import { useSelector } from "react-redux";
import { useGetDoctorInfoQuery } from "../slices/doctorsApiSlice";
import { Users } from "../sdk/users";
import { Box, Grid, Typography, Input, Button } from "@mui/material";
import HealthRecordCard from "./Dashboard/HealthRecordCard";
import { useTheme } from "@emotion/react";
import ClearIcon from "@mui/icons-material/Clear";
import { Link } from "react-router-dom";

export const AllHealthRecords = () => {
	const user = new Users();
	const theme = useTheme();
	const [records] = useGetHealthRecordsMutation();
	const [doctorInfo] = user.getDoctorInfo();
	const [error, setError] = useState("");
	const [toggle, settoggle] = useState(false);
	const link = "http://localhost:8080/api/users/healthRecords/key/";
	const patientEmail = useSelector((state) => state.patientId);
	const [allRecords, setAllRecords] = useState();
	const {
		lang: { patient },
	} = useSelector((state) => state.language);

	const [healthRecord, sethealthRecord] = useState({
		diagnoses: {
			data: "",
			problems: [], //assign to problem array
		},

		medications: {
			startDate: "",
			endDate: "",
			allMeds: [{ name: "", dosage: "", perDay: "", gap: "", timings: [""] }], //assign to medsArray
		},

		immunizations: [], //assign of immunizationArray

		scans: [{}], //assign to scansArray
		time: new Date(),
	});

	useEffect(() => {
		return async () => {
			const res = await records({ email: patientEmail });
			console.log(res?.error?.data?.message);
			setError(res?.error?.data?.message);
			setAllRecords(res.data);
		};
	}, [patientEmail, doctorInfo]);

	// console.log(allRecords)
	if (!allRecords)
		return (
			<center>
				<Typography
					variant="h2"
					fontFamily={"poppins"}
					fontWeight={700}
					color={"red"}
				>
					{error}
				</Typography>
			</center>
		);
	const { firstName, lastName, currentHospitalWorkingName } = doctorInfo;
	const handleOnclick = (i) => {
		sethealthRecord(allRecords.history[i]);
		console.log("hr", healthRecord);
		settoggle(true);
	};

	const handleClose = () => {
		settoggle(false);
	};

	if (!healthRecord)
		return (
			<center>
				<Typography
					variant="h2"
					fontFamily={"poppins"}
					fontWeight={700}
					color={"red"}
				>
					{"No records found"}
				</Typography>
			</center>
		);

	console.log("all", allRecords.history.length);
	return (
		<Box position="relative">
			<Typography
				fontFamily="poppins"
				fontWeight="600"
				color={theme.doctor.primary}
				margin="1rem"
				variant="h3"
			>
				{patient.healthRecord.h1}{" "}
			</Typography>

			<Box
				margin="3rem"
				display="flex"
				flexDirection="column-reverse"
				borderRadius="1rem"
				backgroundColor={theme.doctor.background}
				// width='50%'
				// height='100vh'
				padding="2rem"
				justifyContent="flex-end"
				overflow="auto"
				gap="1rem"
			>
				{allRecords.history.length != 0 ? (
					allRecords.history.map((item, i) => {
						const data = item?.diagnoses.data;
						const timeInfo = new Date(item.time);
						// console.log("time info ",timeInfo)
						const date =
							timeInfo.getDate() +
							"-" +
							(timeInfo.getMonth() + 1) +
							"-" +
							timeInfo.getFullYear();
						const time = timeInfo.getHours() + ":" + timeInfo.getMinutes();
						return (
							<Box key={i} onClick={(e) => handleOnclick(i)}>
								<HealthRecordCard
									docId={item.doctorId}
									diagnosis={data}
									name={"Dr." + firstName + " " + lastName}
									hospital={currentHospitalWorkingName}
									date={date}
									time={time}
								/>
							</Box>
						);
					})
				) : (
					<center>
						<h1
							style={{
								fontFamily: "poppins",
								color: `${theme.doctor.primary}`,
							}}
						>
							{patient.healthRecord.noRec}
						</h1>
					</center>
				)}
			</Box>

			{toggle == true ? (
				<Box
					sx={{
						overflow: "auto",
						transform: "translate(-50%, -00%)",
						position: "absolute",
						top: "10%",
						left: "50%",
						backgroundColor: "rgba(255, 255, 255,0.9)",
						margin: "1rem",
						width: "50%",
						height: "80vh",
						padding: "1rem",
						borderRadius: "1rem",
						boxShadow: "0px 0px 68px -32px rgba(0,0,0,1);",
						backdropFilter: "blur(5px)",

						// Scrollbar customization
						scrollbarWidth: "thin",
						scrollbarColor: "grey",
						"&::-webkit-scrollbar": {
							width: "10px",
							padding: "10px",
						},
						"&::-webkit-scrollbar-thumb": {
							background: "grey",
							borderRadius: "8px",
						},
						"&::-webkit-scrollbar-thumb:hover": {
							background: "darkpurple",
						},
						"&::-webkit-scrollbar-track": {
							background: "lightgrey",
						},
					}}
				>
					<Button
						sx={{ position: "sticky", top: "0rem", left: "100rem" }}
						onClick={handleClose}
					>
						{" "}
						<ClearIcon sx={{ color: "red" }} />
					</Button>
					<Box
						color={theme.doctor.primary}
						className="title&button"
						display="flex"
						justifyContent="space-between"
						alignItems="center"
						padding={1}
						margin={2}
					>
						<Typography fontFamily="poppins" fontWeight="600" variant="h4">
							{patient.healthRecord.label}{" "}
						</Typography>
					</Box>

					<Box
						className="diagnosis"
						padding={1}
						margin={2}
						display="flex"
						flexDirection="column"
					>
						<Box display="flex" width="100%" alignItems="center">
							<Typography
								sx={{
									fontFamily: "poppins",
									fontWeight: "600",
									fontSize: "2vw",
									color: `${theme["grey-heading"]}`,
								}}
							>
								{patient.healthRecord.diagnosis}
							</Typography>
							<Box
								width="100%"
								height="2px"
								backgroundColor={theme["grey-heading"]}
							></Box>
						</Box>
						<Box
							className="inputField"
							backgroundColor=""
							marginTop={2}
							sx={{
								width: "100%",
								border: `1px solid ${theme["grey-border"]}`,
								borderRadius: "10px",
								height: "5vh",
							}}
							display="flex"
							alignItems="center"
						>
							<Typography
								fontFamily="poppins"
								fontWeight="600"
								fontSize="1.0vw"
								padding="0.1rem 2rem"
								borderRight={`2px solid ${theme["grey-border"]}`}
								className="label"
							>
								{patient.healthRecord.diagnosis}
							</Typography>
							<Input
								type="text"
								disabled
								disableUnderline
								sx={{
									fontFamily: "poppins",
									marginInline: "2rem",
									width: "100%",
								}}
								name="diagnoses"
								value={healthRecord.diagnoses.data}
							></Input>
						</Box>
					</Box>

					<Box
						className="problems"
						padding={1}
						margin={2}
						display="flex"
						flexDirection="column"
					>
						<Box display="flex" width="100%" alignItems="center">
							<Typography
								sx={{
									fontFamily: "poppins",
									fontWeight: "600",
									fontSize: "2vw",
									color: `${theme["grey-heading"]}`,
								}}
							>
								{patient.healthRecord.problems.name}
							</Typography>
							<Box width="100%" height="2px" backgroundColor="grey"></Box>
						</Box>

						<Box
							className="problemsHolder"
							display="flex"
							backgroundColor={theme["grey-bg"]}
							padding={2}
							margin={2}
							borderRadius={2}
							flexWrap={"wrap"}
							gap="1rem"
							alignItems={"left"}
						>
							{healthRecord.diagnoses.problems.map((val, i) => (
								<Box key={i} className="problemCard">
									<Box
										className="inputField"
										display="flex"
										color="white"
										padding={2}
										height="5vh"
										alignItems="center"
										border={`1px solid ${theme["grey-border"]}`}
										backgroundColor="white"
										borderRadius={"0.6rem"}
									>
										<Typography
											className="label"
											color={"black"}
											fontFamily={"poppins"}
											fontWeight={"600"}
											paddingX={"1rem"}
											paddingY={"0.1rem"}
											backgroundColor=""
											borderRight={`2px solid ${theme["grey-border"]}`}
										>
											{patient.healthRecord.problems.label}
										</Typography>
										<Input
											type="text"
											disableUnderline
											sx={{
												backgroundColor: "white",
												fontFamily: "poppins",
												paddingInline: "2rem",
											}}
											value={val}
											disabled
										></Input>
									</Box>
								</Box>
							))}
						</Box>
					</Box>

					<Box
						className="medicines"
						padding={1}
						margin={2}
						display="flex"
						flexDirection="column"
					>
						<Box display="flex" width="100%" alignItems="center">
							<Typography
								sx={{
									fontFamily: "poppins",
									fontWeight: "600",
									fontSize: "2vw",
									color: `${theme["grey-heading"]}`,
								}}
							>
								{patient.healthRecord.medicines.name}
							</Typography>
							<Box width="100%" height="2px" backgroundColor="grey"></Box>
						</Box>
						<Box
							display="flex"
							alignItems="center"
							flexWrap={"wrap"}
							margin={2}
							gap={"1rem"}
						>
							<Box
								display={"flex"}
								color="white"
								padding={2}
								height="5vh"
								alignItems="center"
								border={`1px solid ${theme["grey-border"]}`}
								backgroundColor="white"
								borderRadius={"0.6rem"}
							>
								<Typography
									color={"black"}
									fontFamily={"poppins"}
									fontWeight={"600"}
									paddingX={"1rem"}
									paddingY={"0.1rem"}
									backgroundColor=""
									borderRight={`2px solid ${theme["grey-border"]}`}
								>
									{patient.healthRecord.medicines.start}
								</Typography>
								<Input
									type="text"
									disableUnderline
									sx={{
										backgroundColor: "white",
										fontFamily: "poppins",
										paddingInline: "2rem",
									}}
									name="startDate"
									value={
										healthRecord.medications.startDate != null
											? healthRecord.medications.startDate.slice(0, 10)
											: "dd-mm-yyy"
									}
									disabled
								></Input>
							</Box>

							<Box
								display={"flex"}
								color="white"
								padding={2}
								height="5vh"
								alignItems="center"
								border={`1px solid ${theme["grey-border"]}`}
								backgroundColor="white"
								borderRadius={"0.6rem"}
							>
								<Typography
									color={"black"}
									fontFamily={"poppins"}
									fontWeight={"600"}
									paddingX={"1rem"}
									paddingY={"0.1rem"}
									backgroundColor=""
									borderRight={`2px solid ${theme["grey-border"]}`}
								>
									{patient.healthRecord.medicines.end}
								</Typography>
								<Input
									type="text"
									disableUnderline
									sx={{
										backgroundColor: "white",
										fontFamily: "poppins",
										paddingInline: "2rem",
									}}
									name="startDate"
									value={
										healthRecord.medications.endDate != null
											? healthRecord.medications.startDate.slice(0, 10)
											: "dd-mm-yyy"
									}
									disabled
								></Input>
							</Box>
						</Box>
						<Box
							className="medicineHolder"
							display="flex"
							backgroundColor={theme["grey-bg"]}
							padding={4}
							margin={2}
							borderRadius={2}
							flexWrap={"wrap"}
							gap="1rem"
							alignItems={"left"}
						>
							{healthRecord.medications.allMeds.map((value, j) => {
								const { name, dosage, perDay, gap, timings } = value;
								return (
									<Box
										key={j}
										className="problemCard"
										display="flex"
										flexDirection={"column"}
										backgroundColor={theme["purple-bg"]}
										paddingX={2}
										paddingY={2}
										borderRadius={3}
										width={"25vw"}
										gap={"0.8rem"}
									>
										<Box
											display="flex"
											alignItems="center"
											justifyContent="space-between"
											marginX={"1rem"}
										>
											<Typography
												className="label"
												sx={{
													fontFamily: "poppins",
													fontSize: "1.5vw",
													fontWeight: "500",
													color: `${theme["magenta"]}`,
												}}
											>
												{patient.healthRecord.medicines.label.label}
											</Typography>
										</Box>
										<Box
											className="inputField"
											display="flex"
											color="white"
											padding={2}
											height="5vh"
											alignItems="center"
											border={`1px solid ${theme["grey-border"]}`}
											backgroundColor="white"
											borderRadius={"0.6rem"}
										>
											<Typography
												color={"black"}
												fontFamily={"poppins"}
												fontWeight={"600"}
												paddingX={"1rem"}
												paddingY={"0.1rem"}
												backgroundColor=""
												borderRight={`2px solid ${theme["grey-border"]}`}
												className="label"
											>
												{patient.healthRecord.medicines.label.name}
											</Typography>
											<Input
												disabled
												type="text"
												disableUnderline
												sx={{
													backgroundColor: "white",
													fontFamily: "poppins",
													paddingInline: "2rem",
												}}
												value={name}
												name="name"
												onChange={(e) => handleMedicationChange(e, j)}
											></Input>
										</Box>

										<Box
											className="inputField"
											display="flex"
											color="white"
											padding={2}
											height="5vh"
											alignItems="center"
											border={`1px solid ${theme["grey-border"]}`}
											backgroundColor="white"
											borderRadius={"0.6rem"}
										>
											<Typography
												color={"black"}
												fontFamily={"poppins"}
												fontWeight={"600"}
												paddingX={"1rem"}
												paddingY={"0.1rem"}
												backgroundColor=""
												borderRight={`2px solid ${theme["grey-border"]}`}
											>
												{patient.healthRecord.medicines.label.dosage}
											</Typography>
											<Input
												disabled
												type="text"
												disableUnderline
												sx={{
													backgroundColor: "white",
													fontFamily: "poppins",
													paddingInline: "2rem",
												}}
												value={dosage}
												name="dosage"
												onChange={(e) => handleMedicationChange(e, j)}
											></Input>
										</Box>
										<Box
											className="inputField"
											display="flex"
											color="white"
											padding={2}
											height="5vh"
											alignItems="center"
											border={`1px solid ${theme["grey-border"]}`}
											backgroundColor="white"
											borderRadius={"0.6rem"}
										>
											<Typography
												color={"black"}
												fontFamily={"poppins"}
												paddingX={"1rem"}
												fontWeight={"600"}
												borderRight={`2px solid ${theme["grey-border"]}`}
											>
												{patient.healthRecord.medicines.label.perDay}
											</Typography>
											<Input
												disabled
												type="text"
												disableUnderline
												sx={{
													backgroundColor: "white",
													fontFamily: "poppins",
													paddingInline: "2rem",
												}}
												value={perDay}
												name="perDay"
												onChange={(e) => handleMedicationChange(e, j)}
											></Input>
										</Box>

										<Box
											className="inputField"
											display="flex"
											color="white"
											padding={2}
											height="5vh"
											alignItems="center"
											border={`1px solid ${theme["grey-border"]}`}
											backgroundColor="white"
											borderRadius={"0.6rem"}
										>
											<Typography
												color={"black"}
												fontFamily={"poppins"}
												fontWeight={"600"}
												paddingX={"1rem"}
												paddingY={"0.1rem"}
												backgroundColor=""
												borderRight={`2px solid ${theme["grey-border"]}`}
											>
												{patient.healthRecord.medicines.label.gap}
											</Typography>
											<Input
												disabled
												type="text"
												disableUnderline
												sx={{
													backgroundColor: "white",
													fontFamily: "poppins",
													paddingInline: "2rem",
												}}
												value={gap}
												name="gap"
												onChange={(e) => handleMedicationChange(e, j)}
											></Input>
										</Box>

										{timings.map((val, i) => {
											return (
												<Box key={i} className="problemCard">
													<Box
														className="inputField"
														display="flex"
														padding={2}
														height="5vh"
														alignItems="center"
														border={`1px solid ${theme["grey-border"]}`}
														backgroundColor="white"
														borderRadius={"0.6rem"}
													>
														<Typography
															color={`${theme["magenta"]}`}
															fontFamily={"poppins"}
															fontWeight={"600"}
															paddingX={"1rem"}
															paddingY={"0.1rem"}
															backgroundColor=""
															borderRight={`2px solid ${theme["grey-border"]}`}
														>
															{patient.healthRecord.medicines.label.time}
														</Typography>
														<Input
															disabled
															type="text"
															disableUnderline
															sx={{
																backgroundColor: "white",
																fontFamily: "poppins",
																paddingInline: "2rem",
																color: `${theme["magenta"]}`,
																fontWeight: "600",
															}}
															value={val + " hrs"}
															onChange={(e) => handleTimeChange(e, i, j)}
														></Input>
													</Box>
												</Box>
											);
										})}
									</Box>
								);
							})}
						</Box>
					</Box>

					<Box
						className="immunization"
						padding={1}
						margin={2}
						display="flex"
						flexDirection="column"
					>
						<Box display="flex" width="100%" alignItems="center">
							<Typography
								sx={{
									fontFamily: "poppins",
									fontWeight: "600",
									fontSize: "2vw",
									color: `${theme["grey-heading"]}`,
								}}
							>
								{patient.healthRecord.immunizations.name}
							</Typography>
							<Box width="100%" height="2px" backgroundColor="grey"></Box>
						</Box>

						<Box
							className="immuHolder"
							display="flex"
							backgroundColor={theme["grey-bg"]}
							padding={2}
							margin={2}
							borderRadius={2}
							flexWrap={"wrap"}
							gap="1rem"
							alignItems={"left"}
						>
							{healthRecord.immunizations.map((value, j) => {
								const { name, dosage } = value;
								return (
									<Box
										key={j}
										className="problemCard"
										display="flex"
										flexDirection={"column"}
										backgroundColor={theme["purple-bg"]}
										paddingX={2}
										paddingY={2}
										borderRadius={3}
										width={"25vw"}
										gap={"0.8rem"}
									>
										<Box
											display="flex"
											alignItems="center"
											justifyContent="space-between"
										>
											<Typography
												className="label"
												sx={{
													fontFamily: "poppins",
													fontSize: "1.5vw",
													fontWeight: "500",
													color: `${theme["magenta"]}`,
												}}
											>
												{patient.healthRecord.immunizations.label.label}
											</Typography>
										</Box>
										<Box
											className="inputField"
											display="flex"
											color="white"
											padding={2}
											height="5vh"
											alignItems="center"
											border={`1px solid ${theme["grey-border"]}`}
											backgroundColor="white"
											borderRadius={"0.6rem"}
										>
											<Typography
												color={"black"}
												fontFamily={"poppins"}
												fontWeight={"600"}
												paddingX={"1rem"}
												paddingY={"0.1rem"}
												backgroundColor=""
												borderRight={`2px solid ${theme["grey-border"]}`}
											>
												{patient.healthRecord.immunizations.label.name}
											</Typography>
											<Input
												type="text"
												disabled
												disableUnderline
												sx={{
													backgroundColor: "white",
													fontFamily: "poppins",
													paddingInline: "2rem",
												}}
												value={name}
												name="name"
											></Input>
										</Box>

										<Box
											className="inputField"
											display="flex"
											color="white"
											padding={2}
											height="5vh"
											alignItems="center"
											border={`1px solid ${theme["grey-border"]}`}
											backgroundColor="white"
											borderRadius={"0.6rem"}
										>
											<Typography
												color={"black"}
												fontFamily={"poppins"}
												fontWeight={"600"}
												paddingX={"1rem"}
												paddingY={"0.1rem"}
												backgroundColor=""
												borderRight={`2px solid ${theme["grey-border"]}`}
											>
												{patient.healthRecord.immunizations.label.dosage}
											</Typography>
											<Input
												type="text"
												disableUnderline
												sx={{
													backgroundColor: "white",
													fontFamily: "poppins",
													paddingInline: "2rem",
												}}
												value={dosage}
												name="dosage"
											></Input>
										</Box>
									</Box>
								);
							})}
						</Box>
					</Box>

					<Box
						className="scans"
						padding={1}
						margin={2}
						display="flex"
						flexDirection="column"
					>
						<Box display="flex" width="100%" alignItems="center">
							<Typography
								sx={{
									fontFamily: "poppins",
									fontWeight: "600",
									fontSize: "2vw",
									color: `${theme["grey-heading"]}`,
								}}
							>
								{patient.healthRecord.scans.name}
							</Typography>
							<Box width="100%" height="2px" backgroundColor="grey"></Box>
						</Box>
						<Box
							className="immuHolder"
							display="flex"
							backgroundColor={theme["grey-bg"]}
							padding={2}
							margin={2}
							borderRadius={2}
							flexWrap={"wrap"}
							gap="1rem"
							alignItems={"left"}
						>
							{healthRecord.scans.map((value, j) => {
								const { name, pdfLink, typeOf } = value;
								return (
									<Box
										key={j}
										className="scanCard"
										display="flex"
										flexDirection={"column"}
										backgroundColor={theme["purple-bg"]}
										paddingX={2}
										paddingY={2}
										borderRadius={3}
										width={"30vw"}
										gap={"0.8rem"}
									>
										<Box
											display="flex"
											alignItems="center"
											justifyContent="space-between"
										>
											<Typography
												color={"black"}
												fontFamily={"poppins"}
												fontWeight={"600"}
												paddingX={"1rem"}
												paddingY={"0.1rem"}
												backgroundColor=""
												sx={{
													fontFamily: "poppins",
													fontSize: "1.5vw",
													fontWeight: "500",
													color: `${theme["magenta"]}`,
												}}
											>
												{patient.healthRecord.scans.name}
											</Typography>
										</Box>
										<Box
											className="inputField"
											display="flex"
											color="white"
											padding={2}
											height="5vh"
											alignItems="center"
											border={`1px solid ${theme["grey-border"]}`}
											backgroundColor="white"
											borderRadius={"0.6rem"}
										>
											<Typography
												color={"black"}
												fontFamily={"poppins"}
												fontWeight={"600"}
												paddingX={"1rem"}
												paddingY={"0.1rem"}
												fontSize={"1rem"}
												borderRight={`2px solid ${theme["grey-border"]}`}
											>
												{patient.healthRecord.scans.label}
											</Typography>
											<Link
												to={link + name}
												target="_blank"
												color={"black"}
												fontFamily={"poppins"}
												fontWeight={"600"}
												paddingX={"1rem"}
												paddingY={"0.1rem"}
												fontSize={"1rem"}
											>
												{name}
											</Link>
										</Box>
										<Box
											className="inputField"
											display="flex"
											color="white"
											padding={2}
											height="5vh"
											alignItems="center"
											border={`1px solid ${theme["grey-border"]}`}
											backgroundColor="white"
											borderRadius={"0.6rem"}
										>
											<Typography
												color={"black"}
												fontFamily={"poppins"}
												fontWeight={"600"}
												paddingX={"1rem"}
												paddingY={"0.1rem"}
												backgroundColor=""
												borderRight={`2px solid ${theme["grey-border"]}`}
											>
												{patient.healthRecord.scans.type}
											</Typography>
											<Input
												type="text"
												disableUnderline
												disabled
												sx={{
													backgroundColor: "white",
													fontFamily: "poppins",
													paddingInline: "2rem",
													flex: "1",
												}}
												value={typeOf}
												name="typeOf"
											></Input>
										</Box>
									</Box>
								);
							})}
						</Box>
					</Box>
				</Box>
			) : null}
		</Box>
	);
};
//healthRecord.diagnoses.data
