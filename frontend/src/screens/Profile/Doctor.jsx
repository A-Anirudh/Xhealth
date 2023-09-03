import React, { useEffect, useState } from "react";
import userIcon from "../../assets/profileDoc.png";
import maleIcon from "../../assets/maleDoc.png";
import femaleIcon from "../../assets/femaleDoc.png";
import {
	Box,
	Button,
	TextField,
	Typography,
	useTheme,
	InputLabel,
} from "@mui/material";
import moment from "moment/moment";
import { Toaster, toast } from "react-hot-toast";
import { Users } from "../../sdk/users";
import { doctorDetails } from "../../dump";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export const DoctorProfile = () => {
	const theme = useTheme();
	const user = new Users();
	const {
		lang: { doctor },
	} = useSelector((state) => state.language);
	const [doctorInfo] = user.getDoctorInfo();
	const editDoctor = user.editDoctorDetails();
	const [doctorDetail, setDoctorDetail] = useState({
		gender: "",
		bloodGroup: "",
	});

	const setCreds = (e) => {
		const { value, name } = e.target;
		setDoctorDetail((p) => ({ ...p, [name]: value }));
	};

	const postUserCreds = () => {
		try {
			const date = moment(doctorDetail["dateOfBirth"]).toDate();
			const updateDateFormat = { ...doctorDetail, dateOfBirth: date };
			editDoctor(updateDateFormat);
			toast.success("Doctor Updated");
		} catch (e) {
			console.error(e);
			toast.error("Error Occured! Please try again later!");
		}
	};

	useEffect(() => {
		doctorInfo &&
			Object.keys(doctorInfo).map((item) => {
				if (item === "dateOfBirth") {
					const date = new Date(doctorInfo[item]);
					const formatDate = moment(date).format("YYYY-MM-DD");
					setDoctorDetail((p) => ({ ...p, [item]: formatDate }));
				} else {
					setDoctorDetail((p) => ({ ...p, [item]: doctorInfo[item] }));
				}
			});
	}, [doctorInfo]);

	useEffect(() => {
		console.log("doctor detail", doctorDetail);
	}, [doctorDetail]);

	if (!doctorInfo) return "loading";

	return (
		<Box display="flex" justifyContent="center" marginBottom="5rem">
			<Toaster />

			<Box
				display="flex"
				flexDirection="column"
				borderRadius="2rem"
				width="70%"
				margin="4rem"
				sx={{
					[theme.breakpoints.down("md")]: {
						margin: "1rem",
						width: "100%",
					},
				}}
			>
				<Box
					sx={{
						background: "linear-gradient(270deg, #FFF 0%, #5642AA 100%);",
						[theme.breakpoints.down("md")]: {
							background: "#5642AA",
						},
						[theme.breakpoints.down("sm")]: {
							padding: "0 2rem",
						},
					}}
					width="100%"
					display="flex"
					height="11rem"
					alignItems="center"
					padding="0 4rem"
					borderRadius="2rem 2rem 0 0"
				>
					<Typography
						fontSize="4rem"
						fontWeight="700"
						sx={{
							background:
								"linear-gradient(180deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)",
							backgroundClip: "text",
							"text-fill-color": "transparent",
							fontFamily: "Poppins",
						}}
					>
						{doctor.userProfile.h1}
					</Typography>
					<Box
						sx={{
							marginLeft: "auto",
							height: "90%",
							[theme.breakpoints.down("md")]: {
								display: "none",
							},
						}}
					>
						<img src={userIcon} style={{ height: "100%" }} />
					</Box>
				</Box>
				<Box
					padding="0 4rem"
					display="flex"
					sx={{
						[theme.breakpoints.down("sm")]: {
							display: "none",
						},
					}}
				>
					{doctorDetail.gender == "Male" ? (
						<img src={maleIcon} style={{ marginTop: "-2rem" }} />
					) : (
						<img src={femaleIcon} style={{ marginTop: "-2rem" }} />
					)}
					<Box
						marginLeft="auto"
						padding="2rem"
						paddingRight={0}
						display="flex"
						gap={4}
					>
						<Link to="/dashboard-doctor">
							<Button
								variant="contained"
								sx={{
									backgroundColor: `${theme["Cancelled"]}`,
									fontFamily: "Poppins",
									fontSize: "1rem",
									borderRadius: "2rem",
									textTransform: "capitalize",
								}}
							>
								{doctor.userProfile.bCancel}
							</Button>
						</Link>
						<Link to="/dashboard-doctor">
							<Button
								variant="contained"
								onClick={postUserCreds}
								sx={{
									backgroundColor: "#3DB491",
									fontFamily: "Poppins",
									fontSize: "1rem",
									borderRadius: "2rem",
									textTransform: "capitalize",
								}}
							>
								{doctor.userProfile.bUpdate}
							</Button>
						</Link>
					</Box>
				</Box>
				<Box display="flex" alignItems="center" margin="2rem 0">
					<hr
						style={{
							height: "2px",
							background: `${theme["blue-150"]}`,
							width: "5%",
						}}
					/>
					<Typography
						fontWeight="600"
						fontSize="1.8rem"
						padding="0 0.5rem"
						width="max-content"
						fontFamily="Poppins"
						color={`${theme.doctor.primary}`}
					>
						{doctor.userProfile.pInfo}
					</Typography>
					<hr
						style={{
							height: "2px",
							background: `${theme["blue-150"]}`,
							width: "calc(100% - 25rem)",
						}}
					/>
				</Box>
				<Box display="flex" gap="4rem" flexWrap="wrap">
					{doctorDetails(doctor.userProfile).personal.map(
						({ name, id, type, disabled }) => {
							return (
								<Box
									border="1px solid lightgray"
									borderRadius="7px"
									padding="0.3rem 1rem"
									display="flex"
									alignItems="center"
									gap="3px"
									width="40%"
									key={id}
									sx={{
										[theme.breakpoints.down("md")]: {
											width: "100%",
										},
									}}
								>
									<Typography
										minWidth="max-content"
										fontWeight="bold"
										paddingRight="1rem"
										marginRight="1rem"
										borderRight="1px solid lightgray"
										fontFamily="Poppins"
									>
										{name}
									</Typography>
									<TextField
										variant="standard"
										margin="none"
										required
										fullWidth
										InputProps={{ disableUnderline: true }}
										onChange={(e) => setCreds(e)}
										name={id}
										value={doctorDetail[id]}
										type={type}
										disabled={disabled}
									></TextField>
								</Box>
							);
						}
					)}
				</Box>
				<Box display="flex" alignItems="center" margin="2rem 0">
					<hr
						style={{
							height: "2px",
							background: `${theme.doctor.primary}`,
							width: "5%",
						}}
					/>
					<Typography
						fontFamily="Poppins"
						fontWeight="600"
						fontSize="1.8rem"
						padding="0 0.5rem"
						width="max-content"
						color={`${theme.doctor.primary}`}
					>
						{doctor.userProfile.cInfo}
					</Typography>
					<hr
						style={{
							height: "2px",
							background: `${theme.doctor.background}`,
							width: "calc(100% - 25rem)",
						}}
					/>
				</Box>
				<Box display="flex" gap="4rem" flexWrap="wrap">
					{doctorDetails(doctor.userProfile).contact.map(
						({ name, id, type, disabled }) => (
							<Box
								border="1px solid lightgray"
								borderRadius="7px"
								padding="0.3rem 1rem"
								display="flex"
								alignItems="center"
								gap="3px"
								width="40%"
								key={id}
								sx={{
									[theme.breakpoints.down("md")]: {
										width: "100%",
									},
								}}
							>
								<Typography
									minWidth="max-content"
									fontFamily="Poppins"
									fontWeight="bold"
									paddingRight="1rem"
									marginRight="1rem"
									borderRight="1px solid lightgray"
								>
									{name}
								</Typography>
								<TextField
									variant="standard"
									margin="none"
									required
									fullWidth
									InputProps={{ disableUnderline: true }}
									onChange={(e) => setCreds(e)}
									name={id}
									value={doctorDetail[id]}
									type={type}
									disabled={disabled}
								></TextField>
							</Box>
						)
					)}
				</Box>

				<Box display="flex" alignItems="center" margin="2rem 0">
					<hr
						style={{
							height: "2px",
							background: `${theme.doctor.primary}`,
							width: "5%",
						}}
					/>
					<Typography
						fontFamily="Poppins"
						fontWeight="600"
						fontSize="1.8rem"
						padding="0 0.5rem"
						width="max-content"
						color={`${theme.doctor.primary}`}
					>
						Work Information
					</Typography>
					<hr
						style={{
							height: "2px",
							background: `${theme.doctor.primary}`,
							width: "calc(100% - 25rem)",
						}}
					/>
				</Box>
				<Box display="flex" gap="4rem" flexWrap="wrap">
					{doctorDetails(doctor.userProfile).work.map(
						({ name, id, type, disabled }) => (
							<Box
								border="1px solid lightgray"
								borderRadius="7px"
								padding="0.3rem 1rem"
								display="flex"
								alignItems="center"
								gap="3px"
								width="40%"
								key={id}
								sx={{
									[theme.breakpoints.down("md")]: {
										width: "100%",
									},
								}}
							>
								<Typography
									fontFamily="Poppins"
									minWidth="max-content"
									fontWeight="bold"
									paddingRight="1rem"
									marginRight="1rem"
									borderRight="1px solid lightgray"
								>
									{name}
								</Typography>
								<TextField
									variant="standard"
									margin="none"
									required
									fullWidth
									InputProps={{ disableUnderline: true }}
									onChange={(e) => setCreds(e)}
									name={id}
									value={doctorDetail[id]}
									type={type}
									disabled={disabled}
								></TextField>
							</Box>
						)
					)}
				</Box>
			</Box>
		</Box>
	);
};
