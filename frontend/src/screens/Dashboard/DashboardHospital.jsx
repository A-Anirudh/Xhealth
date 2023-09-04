import { useEffect, useState } from "react";
import { Users } from "../../sdk/users";
import { useTheme } from "@emotion/react";
import { Box, Button, Grid, Typography, TextField } from "@mui/material";
import userProfile from "../../assets/profile.svg";
import { Link, useNavigate } from "react-router-dom";
import { hospitalLogout } from "../../slices/authSlice";
import { toast } from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import "../../global.css";
import moment from "moment";
import { useDoctorAppointmentsMutation } from "../../slices/usersApiSlice";
import { Hospital } from "../../sdk/hospitals";
import { Dna } from "react-loader-spinner";

export const DashboardHospital = () => {
	const theme = useTheme();
	const user = new Users();
	const hospital = new Hospital();
	const [userOptions, setUserOptions] = useState(false);
	const logout = hospital.logout();
	const [appointments] = user.getAllAppointments();
	const [getDoctors] = user.getDoctors();
	const dispatch = useDispatch();
	const [categorizedApt, setCategorizedApt] = useState();
	const [categorizedDoctors, setCategorizedDoctors] = useState();
	const [searchRes, setSearchRes] = useState([]);
	const navigate = useNavigate();
	const {
		lang: { hospital: langHospital },
	} = useSelector((state) => state.language);

	const searchDoc = (e) => {
		const res =
			getDoctors &&
			getDoctors?.allDoc?.filter((item) =>
				e === ""
					? false
					: item.firstName.toLowerCase().includes(e.toLowerCase()) ||
					  item.lastName.toLowerCase().includes(e.toLowerCase())
			);
		setSearchRes(res);
	};

	const handleSelectDoc = (e) => {
		const docName = e.target.innerText;

		const res =
			getDoctors &&
			getDoctors?.allDoc?.filter((item) =>
				docName === ""
					? false
					: item.firstName.toLowerCase().includes(docName.toLowerCase()) ||
					  item.lastName.toLowerCase().includes(docName.toLowerCase())
			);
		setSearchRes(res);

		navigate(`/doctor/appointments/${res[0].firstName}/${res[0]._id}`);
	};

	const logoutUser = async () => {
		try {
			await logout();
			dispatch(hospitalLogout());
			setUserOptions(false);
		} catch (e) {
			console.error(e);
			toast.error("Something went wrong");
		}
	};

	useEffect(() => {
		if (getDoctors && appointments) {
			const allApt = appointments?.apt_data?.reduce((acc, curr) => {
				const newApt = {
					...acc,
					[curr.doctorId]: acc[curr.doctorId]
						? [...acc[curr.doctorId], curr]
						: [curr],
				};
				return newApt;
			}, {});

			const categApt = Object.keys(allApt).map((id) => {
				const docName = getDoctors.allDoc.find(
					(item) => item._id === id
				).firstName;
				return {
					name: docName,
					apts: allApt[id],
				};
			});

			const categDoc = getDoctors.allDoc.reduce((acc, curr) => {
				return {
					...acc,
					[curr.department]: acc[curr.department]
						? [...acc[curr.department], curr]
						: [curr],
				};
			}, {});
			setCategorizedDoctors(categDoc);
			setCategorizedApt(categApt);
		}
	}, [getDoctors, appointments]);

	if (!appointments)
		return (
			<h1 style={{ fontFamily: "poppins", color: "#5c9670" }}>
				<Dna
					visible={true}
					height="80"
					width="80"
					ariaLabel="dna-loading"
					wrapperStyle={{}}
					wrapperClass="dna-wrapper"
				/>
				{"\u00A0"}Loading
			</h1>
		);
	else
		return (
			<Grid className="main-container" container>
				<Box
					sx={{
						background: theme["green-olive"],
						padding: "1.5rem 2rem",
						width: "100%",
						display: "flex",
						alignItems: "center",
						borderRadius: "0 0 1rem 1rem",
						[theme.breakpoints.down("xsm")]: {
							padding: "0.7rem 2rem",
						},
					}}
				>
					<Link to="/" style={{ textDecoration: "none" }} onClick={logoutUser}>
						<Typography
							fontFamily="Poppins"
							variant="h4"
							fontWeight="bold"
							color="white"
							sx={{
								cursor: "pointer",
								[theme.breakpoints.down("sm")]: {
									fontSize: "5vw",
								},
							}}
						>
							XHealth
						</Typography>
					</Link>
					<Box marginLeft="auto" display="flex" gap={4} alignItems="center">
						<Box
							sx={{
								[theme.breakpoints.down("sm")]: {
									fontSize: "1vw",
									display: "none",
								},
							}}
						></Box>

						<Box
							sx={{
								cursor: "pointer",
								position: "relative",
							}}
						>
							<img
								onClick={() => setUserOptions((p) => !p)}
								src={userProfile}
								alt="user image"
							/>
							<Box
								display={userOptions ? "flex" : "none"}
								backgroundColor="white"
								padding="0.5rem 1rem"
								borderRadius={1}
								position="absolute"
								left={-40}
								sx={{ transform: "translate(-50%, 10%)" }}
								minWidth="max-content"
								textAlign="center"
								color={theme["blue-150"]}
								flexDirection="column"
								gap={1}
								fontSize={4}
								zIndex={3}
								boxShadow="0 4px 4px lightgray"
							>
								<Button
									onClick={logoutUser}
									sx={{
										fontWeight: "bold",
										background: theme["blue-100"],
										color: theme["blue-150"],
										padding: 0,
										margin: 0,
										textTransform: "capitalize",
										fontSize: "1rem",
									}}
								>
									{langHospital.dashboard.logout}
								</Button>
							</Box>
						</Box>
					</Box>
				</Box>

				<Grid
					className="cards-container"
					container
					xl={12}
					margin="4rem"
					width="100%"
					sx={{
						[theme.breakpoints.down("sm")]: {
							margin: "1rem",
						},
					}}
				>
					<Grid
						item
						xl={6}
						lg={12}
						borderRadius="1rem"
						className="scroll-type"
						display="flex"
						flexDirection="column"
						gap="1rem"
					>
						<Typography
							display="flex"
							width="100%"
							position="sticky"
							padding="1.5rem 0"
							backgroundColor="white"
							top="0"
							variant="h4"
						>
							{langHospital.dashboard.appointments.label}
						</Typography>
						{categorizedApt &&
							categorizedApt.map((item, idx) => (
								<Box
									borderRadius={4}
									key={idx}
									backgroundColor={theme.hospital.background}
									padding={2}
									display="flex"
									gap="1rem"
									flexDirection="column"
								>
									<Typography variant="h5">{item.name}</Typography>
									{item.apts.map((apt) => (
										<Typography
											display="flex"
											gap="2rem"
											backgroundColor="white"
											padding={2}
											borderRadius={4}
											sx={{
												[theme.breakpoints.down("xl")]: {
													justifyContent: "space-around",
												},
											}}
										>
											<span>
												<strong>
													{langHospital.dashboard.appointments.date}:
												</strong>{" "}
												{moment(apt.appointmentDate).format("DD/MM/YYYY")}
											</span>{" "}
											<span>
												<strong>
													{langHospital.dashboard.appointments.time}:
												</strong>{" "}
												{apt.appointmentStartTime}
											</span>{" "}
											<span>
												<strong>
													{langHospital.dashboard.appointments.reason}:
												</strong>{" "}
												{apt.reason}
											</span>
										</Typography>
									))}
								</Box>
							))}
					</Grid>
					<Grid
						item
						xl={6}
						lg={12}
						padding="0 2rem 2rem"
						borderRadius="1rem"
						className="scroll-type"
						display="flex"
						flexDirection="column"
						gap="1rem"
						position="relative"
						sx={{
							[theme.breakpoints.down("md")]: {
								padding: "0",
							},
						}}
					>
						<Box
							display="flex"
							width="100%"
							position="sticky"
							padding="1.5rem 0"
							backgroundColor="white"
							top="0"
							sx={{
								[theme.breakpoints.down("sm")]: {
									flexDirection: "column",
									gap: "2rem",
								},
							}}
						>
							<Typography variant="h4">
								{langHospital.dashboard.doctors.label}
							</Typography>
							<TextField
								type="text"
								variant="standard"
								sx={{
									marginLeft: "auto",
									[theme.breakpoints.down("sm")]: {
										marginLeft: "0",
									},
								}}
								placeholder={langHospital.dashboard.doctors.placeholder}
								onChange={(e) => searchDoc(e.target.value)}
							/>
							<Box
								className="scroll-type"
								display="flex"
								flexDirection="column"
								position="absolute"
								backgroundColor="white"
								boxShadow={`0 0 4px ${theme["green-olive"]}`}
								maxHeight="10rem"
								sx={{
									overflowY: "scroll",
									[theme.breakpoints.down("sm")]: {
										left: "auto",
										top: "9rem",
										right: "unset",
										width: "100%",
									},
								}}
								right="0"
								width="30%"
								top="4rem"
							>
								{searchRes.map((item) => (
									<Typography
										onClick={(e) => handleSelectDoc(e)}
										value={item.firstName}
										padding="0.5rem 1rem"
										sx={{
											cursor: "pointer",
											"&:hover": {
												backgroundColor: theme.hospital.background,
											},
										}}
									>
										{item.firstName}
									</Typography>
								))}
							</Box>
						</Box>
						<Box display="flex" gap="1rem" flexWrap="wrap">
							{categorizedDoctors &&
								Object.keys(categorizedDoctors).map((item) => (
									<Box
										borderRadius={4}
										backgroundColor={theme.hospital.background}
										flexBasis="48%"
										padding={2}
										display="flex"
										gap="1rem"
										flexDirection="column"
										sx={{
											[theme.breakpoints.down("md")]: {
												flexBasis: "100%",
											},
										}}
									>
										<Typography variant="h5">{item}</Typography>
										{categorizedDoctors[item].map((doc) => (
											<Typography
												backgroundColor="white"
												padding={2}
												borderRadius={4}
											>
												{doc.firstName}
											</Typography>
										))}
									</Box>
								))}
						</Box>
					</Grid>
				</Grid>
			</Grid>
		);
};
