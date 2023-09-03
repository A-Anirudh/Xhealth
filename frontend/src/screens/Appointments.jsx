import { Box, Button, Typography, useTheme } from "@mui/material";
import React, { useState } from "react";
import moment from "moment";
import { Link } from "react-router-dom";
import { MoreOptions } from "../components";
import { useAptDetails } from "../hooks";
import { v4 as uuid } from "uuid";
import more from "../assets/more.svg";
import { useSelector } from "react-redux";

export const Appointments = () => {
	const theme = useTheme();
	const [aptDisplay, setAptDisplay] = useState("none");
	const { sortedAppointments, appointments } = useAptDetails({ hrid: "4efdoa4acfedajeacd6" });
	const [myDoc, setMyDoc] = useState("");
	const [date, setDate] = useState("");
	const [reason, setReason] = useState("");
	const [aptId, setAptId] = useState("");
	const {
		lang: { patient },
	} = useSelector((state) => state.language);

	const openDialog = (myid) => {
		const myApt = appointments.find((item) => item._id === myid);
		setMyDoc(myApt.doctorId);
		setDate(moment(myApt.appointmentDate).format("yyyy-MM-DDThh:mm"));
		setReason(myApt.reason);
		setAptDisplay((p) => (p === "block" ? "none" : "block"));
		setAptId(myid);
	};

	return (
		<Box
			display="flex"
			alignItems="center"
			flexDirection="column"
			onClick={() => setAptDisplay("none")}
		>
			<Box
				display="flex"
				flexDirection="column"
				minWidth="60%"
				maxWidth="90%"
				marginTop="5rem"
				gap={3}
			>
				<Box
					display="flex"
					alignItems="center"
					width="100%"
					sx={{
						[theme.breakpoints.down("md")]: {
							flexDirection: "column",
							gap: "1rem",
						},
					}}
				>
					<Typography
						variant="h3"
						fontFamily={"poppins"}
						fontWeight={"600"}
						sx={{
							[theme.breakpoints.down("sm")]: {
								fontSize: "8vw",
							},
						}}
					>
						{patient.appointments.h1}
					</Typography>
					<Button
						sx={{
							marginLeft: "auto",
							fontFamily: "poppins",
							textTransform: "capitalize",
							[theme.breakpoints.down("md")]: {
								marginLeft: "0",
							},
						}}
						variant="contained"
						color="success"
					>
						<Link
							fontFamily={"poppins"}
							style={{ textDecoration: "none", color: "white" }}
							to="/book-appointment"
						>
							{patient.appointments.button}
						</Link>
					</Button>
				</Box>
				{sortedAppointments && Object.keys(sortedAppointments).length > 0 ? (
					<Box
						width="100%"
						backgroundColor={theme["purple-100"]}
						borderRadius="1rem 1rem 0 0"
						padding={4}
						paddingTop={0}
						minHeight="100vh"
						key={uuid()}
					>
						{sortedAppointments &&
							Object.keys(sortedAppointments)?.map((item) => (
								<Box
									width="100%"
									display="flex"
									flexDirection="column"
									gap={4}
									alignItems="flex-start"
									paddingTop={4}
									key={sortedAppointments[item].id}
								>
									<Typography
										fontFamily={"poppins"}
										marginLeft={4}
										padding="0.3rem 1rem"
										color="white"
										backgroundColor={theme["green-olive"]}
										display="inline-block"
										borderRadius={99}
									>
										{item}
									</Typography>
									{/* {console.log(sortedAppointments, appointments)} */}
									{sortedAppointments &&
										sortedAppointments[item].apt.map(
											({
												_id,
												appointmentDate,
												appointmentStartTime,
												status,
												hospitalName,
												doctorName,
												state,
												department,
											}) => (
												<Box
													padding="1rem"
													borderRadius="1rem"
													backgroundColor="white"
													boxShadow="0 4px 18px rgba(0, 0, 0, 0.15)"
													display="flex"
													alignItems="center"
													width="100%"
													justifyContent="space-between"
													key={_id}
													gap="2rem"
													textAlign="center"
													sx={{
														[theme.breakpoints.down("md")]: {
															display: "grid",
															gridColumnGap: "0",
															gridRowGap: "1rem",
															gridTemplateRows: "4rem 4rem",
															gridTemplateColumns: "1fr 1fr 1fr",
															gridAutoFlow: "column",
															placeItems: "center",
															textAlign: "center",
														},
														[theme.breakpoints.down("sm")]: {
															display: "flex",
															flexDirection: "column",
															gap: "2rem",
															padding: "2rem",
														},
													}}
												>
													<Typography
														fontFamily={"poppins"}
														padding="0.3rem 1.5rem"
														fontWeight="bold"
														backgroundColor={theme[status]}
														borderRadius={99}
														textAlign="center"
														key={_id}
													>
														{status}
													</Typography>
													<Box
														height="1.5rem"
														borderRight={`1px solid ${theme["gray-200"]}`}
														sx={{
															[theme.breakpoints.down("xl")]: {
																display: "none",
															},
														}}
													></Box>
													<Typography fontWeight="bold" fontFamily={"poppins"}>
														{department}
													</Typography>
													<Box
														height="1.5rem"
														fontFamily={"poppins"}
														borderRight={`1px solid ${theme["gray-200"]}`}
														sx={{
															[theme.breakpoints.down("xl")]: {
																display: "none",
															},
														}}
													></Box>
													<Box
														display="flex"
														alignItems="center"
														flexDirection="column"
													>
														<Typography
															fontWeight="bold"
															fontFamily={"poppins"}
														>
															{moment(appointmentDate).format("DD/MM/YYYY")}
														</Typography>
														<Typography
															fontFamily={"poppins"}
															color={theme["gray-200"]}
															fontSize="0.8rem"
														>
															{moment(appointmentStartTime, "HH:mm:ss").format(
																"hh:mm A"
															)}
															, IST
														</Typography>
													</Box>
													<Box
														height="1.5rem"
														borderRight={`1px solid ${theme["gray-200"]}`}
														sx={{
															[theme.breakpoints.down("xl")]: {
																display: "none",
															},
														}}
													></Box>
													<Box
														display="flex"
														alignItems="center"
														flexDirection="column"
													>
														<Typography
															fontFamily={"poppins"}
															fontWeight="bold"
															color={theme["purple-150"]}
														>
															{hospitalName}
														</Typography>
														<Typography
															fontWeight="bold"
															fontSize="0.8rem"
															fontFamily={"poppins"}
														>
															{state}
														</Typography>
													</Box>
													<Box
														height="1.5rem"
														borderRight={`1px solid ${theme["gray-200"]}`}
														sx={{
															[theme.breakpoints.down("xl")]: {
																display: "none",
															},
														}}
													></Box>
													<Box
														display="flex"
														alignItems="center"
														flexDirection="column"
													>
														<Typography
															fontWeight="bold"
															fontFamily={"poppins"}
														>
															{doctorName}
														</Typography>
													</Box>
													<Box
														height="1.5rem"
														paddingRight={1}
														padding="0 0.5rem"
														boxSizing={"border-box"}
														outline="1px solid black"
														sx={{ cursor: "pointer", userSelect: "none" }}
														onClick={(e) => {
															e.stopPropagation();
															openDialog(_id);
														}}
													>
														<img
															src={more}
															alt="more"
															style={{ height: "100%" }}
														/>
													</Box>
												</Box>
											)
										)}
								</Box>
							))}
						<MoreOptions
							_id={aptId}
							aptDisplay={aptDisplay}
							setAptDisplay={setAptDisplay}
							apt={appointments}
							myDoc={myDoc}
							setMyDoc={setMyDoc}
							date={date}
							setDate={setDate}
							reason={reason}
							setReason={setReason}
						/>
					</Box>
				) : (
					<Typography
						variant="h5"
						padding="1rem"
						color="white"
						textAlign="center"
						backgroundColor={theme["green-olive"]}
						display="inline-block"
						borderRadius={99}
					>
						{patient.appointments.noApt}
					</Typography>
				)}
			</Box>
		</Box>
	);
};
