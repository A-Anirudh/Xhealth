import { Box, Button, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import dropdown from "../../assets/dropdown.png";
import coverImg from "../../assets/Doctors-pana 2.png";
import boyimg from "../../assets/boyimg.png";
import heart from "../../assets/heart.png";
import bw from "../../assets/bw.png";
import bp from "../../assets/bp.png";
import gl from "../../assets/gl.png";
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import moment from "moment/moment";
import { Toaster, toast } from "react-hot-toast";
import { Users } from "../../sdk/users";
import { useSelector } from "react-redux";
import { useGetHealthRecordsMutation } from "../../slices/healthRecordSlice";

export const DashboardUser = () => {
	const theme = useTheme();
	const user = new Users();
	const [latestRecord, setLatestRecord] = useState({});
	const [medications, setMedications] = useState("");
	const [timings, setTimings] = useState("");
	const [latestAppointments, setLatestAppointments] = useState([]);
	const [userOptions, setUserOptions] = useState(false);
	const [userInfo, refetchUser] = user.getUserInfo();
	const [personalHealth, refetchHealth] = user.getPersonalHealth();
	const [appointments, refetchAppointment] = user.getAppointments();
	const [doctors, refetchDoctors] = user.getDoctors();
	const patientEmail = useSelector((state) => state.auth.userInfo.email);
	const [records] = useGetHealthRecordsMutation();
	const {
		lang: { patient },
	} = useSelector((state) => state.language);

	useEffect(() => {
		(async () => {
			await refetchUser();
			await refetchHealth();
			await refetchAppointment();
			await refetchDoctors();
		})();
	}, []);

	useEffect(() => {
		(async () => {
			const res = await records({ email: patientEmail });
			const meds =
				res?.data?.history[res?.data?.history?.length - 1]?.medications
					?.allMeds[0];
			setMedications(meds?.name);
			setTimings(meds?.timings[0]);
		})();
	}, [records]);

	useEffect(() => {
		personalHealth &&
			setLatestRecord(personalHealth[personalHealth.length - 1]);
		console.log(personalHealth);
	}, [personalHealth]);

	useEffect(() => {
		const recentApts = user.setRecentAppointments(appointments, doctors);
		setLatestAppointments(recentApts);
	}, [appointments, doctors]);

	return (
		<Grid container backgroundColor={theme["blue-100"]}>
			<Toaster />
			<Grid
				item
				xl={12}
				margin="4rem 6rem 2rem"
				container
				justifyContent="space-around"
				sx={{
					[theme.breakpoints.down("lg")]: {
						margin: "4rem 1rem 2rem",
					},
					[theme.breakpoints.down("sm")]: {
						margin: "2rem 1rem",
					},
				}}
			>
				<Grid
					item
					xl={8}
					boxShadow="0 4px 4px rgba(0,0,0,0.25)"
					borderRadius={4}
					overflow="hidden"
					border={`4px solid ${theme["purple-500"]}`}
				>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-around"
						padding="0 7rem"
						sx={{
							[theme.breakpoints.down("md")]: {
								padding: "0",
								width: "90vw",
							},
							[theme.breakpoints.down("sm")]: {
								padding: "0",
								// width: "initial"
							},
						}}
					>
						<Box
							textAlign="center"
							minWidth="28rem"
							sx={{
								[theme.breakpoints.down("lg")]: {
									margin: "3rem",
								},
								[theme.breakpoints.down("sm")]: {
									margin: "2rem 0",
								},
							}}
						>
							<Typography
								fontFamily="poppins"
								variant="h3"
								display="flex"
								gap={2}
								fontWeight="bold"
								justifyContent="center"
								alignItems="center"
								sx={{
									[theme.breakpoints.down("sm")]: {
										fontSize: "2rem",
										gap: 1,
									},
									[theme.breakpoints.down("xsm")]: {
										fontSize: "1.5rem",
									},
								}}
							>
								<Typography
									fontFamily="poppins"
									variant="h3"
									fontWeight="bold"
									color={`${theme["purple-500"]}`}
									sx={{
										[theme.breakpoints.down("sm")]: {
											fontSize: "2rem",
										},
										[theme.breakpoints.down("xsm")]: {
											fontSize: "1.5rem",
										},
									}}
								>
									{patient.dashboard.welcome}
								</Typography>
								{userInfo?.firstName}!
							</Typography>
							<Typography
								fontFamily="poppins"
								variant="h5"
								sx={{
									display: "inline",
									[theme.breakpoints.down("sm")]: {
										fontSize: "1.2rem",
									},
									[theme.breakpoints.down("xsm")]: {
										fontSize: "1rem",
									},
								}}
							>
								{patient.dashboard.label}
							</Typography>
						</Box>
						<Box
							sx={{
								[theme.breakpoints.down("lg")]: {
									display: "none",
								},
							}}
						>
							<img src={coverImg} alt="doctors image" />
						</Box>
					</Box>
				</Grid>
				<Grid
					item
					xl={3}
					backgroundColor="white"
					padding="1rem 1.5rem"
					borderRadius={4}
					boxShadow="0 4px 4px rgba(0,0,0,0.25)"
					position="relative"
					sx={{
						[theme.breakpoints.down("xl")]: {
							display: "none",
						},
					}}
				>
					<Typography
						fontFamily="poppins"
						variant="h5"
						color={theme["blue-150"]}
						margin={0}
					>
						{patient.dashboard.profile}
					</Typography>
					<Link
						style={{
							alignItems: "center",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							top: "0",
							height: "100%",
							position: "absolute",
							left: "0",
							width: "100%",
							textDecoration: "none",
						}}
						to="/profile-user"
					>
						<img src={boyimg} alt="user avatar" />
						<Typography fontFamily="poppins" variant="h5">
							{userInfo?.firstName}
						</Typography>
					</Link>
				</Grid>
			</Grid>
			<Grid
				item
				xl
				md
				margin="0 8rem"
				container
				display="flex"
				justifyContent="space-around"
				gap={5}
				sx={{
					[theme.breakpoints.down("lg")]: {
						margin: "0 1rem",
					},
				}}
			>
				<Grid
					item
					xl={5}
					backgroundColor={theme["purple-500"]}
					padding="2rem 1.5rem"
					borderRadius={4}
					boxShadow="0 4px 4px rgba(0,0,0,0.25)"
					display="flex"
					flexDirection="column"
					alignItems="center"
					justifyContent="center"
					gap="1rem"
					sx={{
						[theme.breakpoints.down("lg")]: {
							flexGrow: 1,
						},
					}}
				>
					<Typography
						fontFamily="poppins"
						backgroundColor="white"
						padding="0.7rem 1.5rem"
						variant="h5"
						width="max-content"
						borderRadius={4}
						gap="1rem"
					>
						{medications}
					</Typography>
					<Typography
						fontFamily="poppins"
						backgroundColor={theme["green-olive"]}
						padding="1rem 2rem"
						fontWeight="bold"
						color="white"
						width="max-content"
						borderRadius={4}
						display="flex"
						alignItems="center"
						gap={1}
					>
						{patient.dashboard.medication.button} {timings}
						<Box sx={{ transform: "rotate(270deg)" }}>
							<img src={dropdown} alt="go Next" />
						</Box>
					</Typography>
				</Grid>
				<Grid
					item
					xl
					backgroundColor={theme["purple-500"]}
					padding="1.5rem"
					borderRadius={4}
					boxShadow="0 4px 4px rgba(0,0,0,0.25)"
					display="flex"
					flexDirection="column"
					gap={1}
					sx={{
						[theme.breakpoints.down("lg")]: {
							flexGrow: 1,
						},
					}}
				>
					<Typography
						fontFamily="poppins"
						variant="h5"
						fontWeight="bold"
						color="white"
						paddingLeft={2}
					>
						{patient.dashboard.appointments.label}
					</Typography>
					{latestAppointments?.length > 0 ? (
						latestAppointments.map(
							({ name, doctorName, hospitalName, appointmentDate }, idx) => (
								<Box
									display="flex"
									alignItems="center"
									borderRadius={4}
									overflow="hidden"
									maxHeight="5rem"
									marginBottom={1}
									key={idx}
								>
									<Box backgroundColor="white" minWidth="10rem">
										<Typography
											fontFamily="poppins"
											variant="h5"
											fontWeight="bold"
											padding="1rem 1.5rem"
											height="5rem"
											display="flex"
											alignItems="center"
											justifyContent="center"
										>
											{name === "prev"
												? patient.dashboard.appointments.prev
												: patient.dashboard.appointments.next}
										</Typography>
									</Box>
									<Box
										backgroundColor={theme["blue-500"]}
										width="100%"
										color="white"
										padding="1rem 1.5rem"
									>
										<Box display="flex" alignItems="center">
											<Box display="flex" flexDirection="column">
												<Typography fontFamily="poppins" variant="h5">
													{doctorName}
												</Typography>
												<Typography
													fontFamily="poppins"
													fontSize={15}
													color={theme["gray-200"]}
													marginTop={-0.5}
												>
													{hospitalName}
												</Typography>
											</Box>
											<Typography
												fontFamily="poppins"
												fontSize={15}
												marginLeft="auto"
											>
												{moment(appointmentDate).format("DD/MM/YYYY")}
											</Typography>
										</Box>
									</Box>
								</Box>
							)
						)
					) : (
						<Box
							display="flex"
							alignItems="center"
							borderRadius={4}
							overflow="hidden"
							maxHeight="5rem"
							marginBottom={1}
						>
							<Box backgroundColor="white" width="100%">
								<Typography
									fontFamily="poppins"
									variant="h5"
									fontWeight="bold"
									padding="1rem 1.5rem"
									height="5rem"
									display="flex"
									alignItems="center"
									justifyContent="center"
								>
									{patient.dashboard.appointments.noApt}
								</Typography>
							</Box>
						</Box>
					)}
				</Grid>
			</Grid>
			<Grid
				item
				xl={12}
				margin="2rem 8rem"
				container
				display="flex"
				justifyContent="space-around"
				gap={5}
				paddingBottom={5}
				sx={{
					[theme.breakpoints.down("lg")]: {
						margin: "2rem",
					},
				}}
			>
				<Grid
					item
					xl
					backgroundColor="white"
					borderRadius={4}
					boxShadow="0 4px 4px rgba(0,0,0,0.25)"
					padding="2rem"
					flexGrow={1}
				>
					<Box marginBottom={2}>
						<img src={heart} alt="heartRate" />
					</Box>
					<Typography fontFamily="poppins" variant="h6">
						{patient.dashboard.hr.label}
					</Typography>
					<Typography
						fontFamily="poppins"
						variant="h6"
						color={theme["purple-500"]}
					>
						{latestRecord ? latestRecord?.heartRate : "-"}{" "}
						{patient.dashboard.hr.unit}
					</Typography>
				</Grid>
				<Grid
					item
					xl
					backgroundColor="white"
					borderRadius={4}
					boxShadow="0 4px 4px rgba(0,0,0,0.25)"
					padding="2rem"
					flexGrow={1}
				>
					<Box marginBottom={2}>
						<img src={bp} alt="bloodpressure" />
					</Box>
					<Typography fontFamily="poppins" variant="h6">
						{patient.dashboard.bp.label}
					</Typography>
					<Typography
						fontFamily="poppins"
						variant="h6"
						color={theme["purple-500"]}
					>
						{latestRecord ? latestRecord?.bloodPressure : "-/-"}
					</Typography>
				</Grid>
				<Grid
					item
					xl
					backgroundColor="white"
					borderRadius={4}
					boxShadow="0 4px 4px rgba(0,0,0,0.25)"
					padding="2rem"
					flexGrow={1}
				>
					<Box marginBottom={2}>
						<img src={bw} alt="body weight" />
					</Box>
					<Typography fontFamily="poppins" variant="h6">
						{patient.dashboard.bw.label}
					</Typography>
					<Typography
						fontFamily="poppins"
						variant="h6"
						color={theme["purple-500"]}
					>
						{latestRecord ? latestRecord?.weight : "-"}{" "}
						{patient.dashboard.bw.unit}
					</Typography>
				</Grid>
				<Grid
					item
					xl
					backgroundColor="white"
					borderRadius={4}
					boxShadow="0 4px 4px rgba(0,0,0,0.25)"
					padding="2rem"
					flexGrow={1}
				>
					<Box marginBottom={2}>
						<img src={gl} alt="glucose level" />
					</Box>
					<Typography fontFamily="poppins" variant="h6">
						{patient.dashboard.gl.label}
					</Typography>
					<Typography
						fontFamily="poppins"
						variant="h6"
						color={theme["purple-500"]}
					>
						{latestRecord ? latestRecord?.glucose : "-"}
					</Typography>
				</Grid>
			</Grid>
		</Grid>
	);
};
