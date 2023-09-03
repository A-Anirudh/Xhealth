import { Box, Input, InputLabel, Typography } from "@mui/material";
import loginThumbnail from "../../assets/userDoctor.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setDoctorCredentials } from "../../slices/authSlice";
import { Toaster, toast } from "react-hot-toast";
import { useDoctorLoginMutation } from "../../slices/doctorsApiSlice";
import CommonNavbar from "../../components/CommonNavbar";
let clearError;

export const LoginDoctor = () => {
	const theme = useTheme();
	const [creds, setCreds] = useState({});
	const [login, { error: logError }] = useDoctorLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { doctorInfo } = useSelector((state) => state.auth);
	const {
		lang: { doctor },
	} = useSelector((state) => state.language);
	const [error, setError] = useState("");

	const getCredentials = (e) => {
		const { value, name } = e.target;
		setCreds((p) => ({ ...p, [name]: value }));
	};

	const submitCredentials = async (e, data) => {
		try {
			e.preventDefault();
			console.log(data);
			const res = await login(data).unwrap();
			console.log(res);
			dispatch(setDoctorCredentials(res));
			toast.success("Welcome User!");
		} catch (e) {
			toast.error("Invalid Credentials!!");
		}
	};

	useEffect(() => {
		navigate(doctorInfo ? "/dashboard-doctor" : "/login-doctor");
	}, [navigate, doctorInfo]);

	useEffect(() => {
		clearTimeout(clearError);
		setError(logError);
		clearError = setTimeout(() => setError(""), 2000);
	}, [logError]);

	return (
		<Box
			sx={{
				background: theme.doctor.background,
				height: "100vh",
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<CommonNavbar />
			<Box
				display={error ? "block" : "none"}
				position="absolute"
				left="50%"
				top="1rem"
				zIndex="4"
				marginTop="1rem"
				borderRadius="0.5rem"
				boxShadow="0 3px 5px gray"
				fontWeight="bold"
				padding="1rem 3rem"
				backgroundColor={"#ffbbbb"}
				sx={{ fontFamily: "Poppins", transform: "translateX(-50%)" }}
			>
				{error && error?.data?.message}
			</Box>
			<Box
				sx={{
					borderRadius: "1.4rem",
					background: "white",
					display: "flex",
					overflow: "hidden",
					height: "80%",
					width: "60rem",
					[theme.breakpoints.down("lg")]: {
						width: "90%",
					},
					[theme.breakpoints.down("sm")]: {
						flexDirection: "column",
					},
				}}
			>
				<Box
					sx={{
						background: theme.doctor.primary,
						height: "100%",
						width: "40%",
						position: "relative",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						[theme.breakpoints.down("sm")]: {
							width: "100%",
							height: "unset",
							paddingBlock: "1rem",
						},
					}}
				>
					<Typography
						fontFamily="Poppins"
						variant="h1"
						sx={{
							fontFamily: "Poppins",
							fontWeight: "bold",
							transform: "rotate(270deg) translateY(-7rem)",
							background:
								"linear-gradient(90deg, #5642AA 0%, rgba(255, 255, 255, 0.50) 100%)",
							backgroundClip: "text",
							textFillColor: "transparent",
							fontSize: "clamp(7rem, 8.5vw, 8rem)",
							[theme.breakpoints.down("lg")]: {
								transform: "rotate(270deg) translateY(-10vw)",
							},
							[theme.breakpoints.down("md")]: {
								transform: "rotate(270deg) translateY(-8vw)",
							},
							[theme.breakpoints.down("sm")]: {
								transform: "initial",
								fontSize: "4rem",
							},
							[theme.breakpoints.down("xsm")]: {
								transform: "initial",
								fontSize: "14vw",
							},
						}}
					>
						{doctor.login.loginBanner}
					</Typography>
					<Box
						sx={{
							[theme.breakpoints.down("sm")]: {
								display: "none",
							},
						}}
					>
						<img
							src={loginThumbnail}
							className={styles.coverImg}
							alt="doctor"
						/>
					</Box>
				</Box>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						height: "100%",
						width: "100%",
						alignItems: "center",
						justifyContent: "space-around",
					}}
				>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Typography
							fontFamily="Poppins"
							variant="h3"
							sx={{
								fontWeight: "bold",
								[theme.breakpoints.down("xsm")]: {
									fontSize: "9vw",
								},
							}}
						>
							{doctor.login.h1}
						</Typography>
						<Typography
							fontFamily="Poppins"
							variant="h6"
							sx={{
								color: theme.secondaryText,
								[theme.breakpoints.down("xsm")]: {
									fontSize: "5vw",
								},
							}}
						>
							{doctor.login.h2}
						</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "70%",
							gap: "1rem",
							alignItems: "center",
						}}
					>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "100%",
								alignItems: "center",
							}}
						>
							<InputLabel
								fontFamily="Poppins"
								htmlFor="email"
								sx={{
									alignSelf: "flex-start",
									paddingInline: "2rem",
									fontSize: "1.1rem",
									color: "#9D9D9D",
									fontFamily: "Poppins",
									[theme.breakpoints.down("xsm")]: {
										fontSize: "1rem",
										paddingInline: "1rem",
									},
								}}
							>
								{doctor.login.email}
							</InputLabel>

							<Input
								id="email"
								type="email"
								name="email"
								sx={{
									borderRadius: "20px",
									outlineColor: theme.doctor.inputActive,
									border: `2px solid ${theme.doctor.inputDefault}`,
									width: "100%",
									padding: "0.4rem 1rem",
									fontSize: "1.4rem",
									fontFamily: "Poppins",
									background: theme.inputBackground,
									[theme.breakpoints.down("xsm")]: {
										fontSize: "1rem",
									},
								}}
								disableUnderline
								onChange={(e) => getCredentials(e)}
							/>
						</Box>
						<Box
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "100%",
								alignItems: "center",
							}}
						>
							<InputLabel
								fontFamily="Poppins"
								htmlFor="password"
								sx={{
									alignSelf: "flex-start",
									paddingInline: "2rem",
									fontSize: "1.1rem",
									color: "#9D9D9D",
									fontFamily: "Poppins",
									[theme.breakpoints.down("xsm")]: {
										fontSize: "1rem",
										paddingInline: "1rem",
									},
								}}
							>
								{doctor.login.password}
							</InputLabel>

							<Input
								id="password"
								type="password"
								name="password"
								sx={{
									borderRadius: "20px",
									fontFamily: "Poppins",
									outlineColor: theme.doctor.inputActive,
									border: `2px solid ${theme.doctor.inputDefault}`,
									width: "100%",
									padding: "0.4rem 1rem",
									fontSize: "1.4rem",
									background: theme.inputBackground,
									[theme.breakpoints.down("xsm")]: {
										fontSize: "1rem",
									},
								}}
								disableUnderline
								onChange={(e) => getCredentials(e)}
							/>
						</Box>
						<Link
							to="/forgot-password"
							style={{
								color: theme.success,
								alignSelf: "flex-end",
								paddingInlineEnd: "1rem",
								marginBlockStart: "-1rem",
								fontFamily: "Poppins",
							}}
						>
							{doctor.login.forgot}
						</Link>
					</Box>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							width: "100%",
							alignItems: "center",
							gap: "1rem",
						}}
					>
						<Input
							type="submit"
							value={doctor.login.button}
							disableUnderline
							sx={{
								fontFamily: "Poppins",
								borderRadius: "20px",
								backgroundColor: theme.success,
								border: "none",
								width: "70%",
								padding: "0.4rem 1rem",
								color: "white",
								fontSize: "1.4rem",
								fontWeight: "600",
								[theme.breakpoints.down("xsm")]: {
									fontSize: "1rem",
									paddingInline: "1rem",
								},
							}}
							onClick={(e) => submitCredentials(e, creds)}
						/>
						<span style={{ fontFamily: "Poppins" }}>
							{doctor.login.newUser}{" "}
							<Link to="/signup-doctor" style={{ color: theme.success }}>
								{doctor.login.register}
							</Link>
						</span>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
