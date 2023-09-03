import { Box, Input, InputLabel, Typography } from "@mui/material";
import loginThumbnail from "../../assets/userLogin.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useUserLoginMutation } from "../../slices/usersApiSlice";
import { setUserCredentials } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Toaster, toast } from "react-hot-toast";
import { Users } from "../../sdk/users";
import CommonNavbar from "../../components/CommonNavbar";
let clearError;

export const LoginUser = () => {
	const theme = useTheme();
	const user = new Users();
	const [login, logError] = user.login();
	const [error, setError] = useState("");
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userInfo } = useSelector((state) => state.auth);
	const [creds, setCreds] = useState({});
	const {
		lang: { patient },
	} = useSelector((state) => state.language);

	const getCredentials = (e) => {
		const { value, name } = e.target;
		setCreds((p) => ({ ...p, [name]: value }));
	};

	const submitCredentials = async (e, data) => {
		try {
			e.preventDefault();
			const { data: res } = await login(data);

			res && dispatch(setUserCredentials(res));
		} catch (e) {
			e.status === 500
				? toast.error("Server Down! Please try after some time.")
				: toast.error("Invalid Credentials!!");
		}
	};

	useEffect(() => {
		navigate(userInfo ? "/dashboard-user" : "/login-user");
	}, [navigate, userInfo]);

	useEffect(() => {
		clearTimeout(clearError);
		setError(logError);
		clearError = setTimeout(() => setError(""), 2000);
	}, [logError]);

	return (
		<Box
			sx={{
				fontFamily: "Poppins",
				background: theme.patient.background,
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
					fontFamily: "Poppins",
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
						fontFamily: "Poppins",
						background: theme.patient.primary,
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
								"linear-gradient(90deg, #C767C7 0%, rgba(255, 255, 255, 0.50) 100%)",
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
						{patient.login.loginBanner}{" "}
					</Typography>
					<Box
						sx={{
							fontFamily: "Poppins",
							[theme.breakpoints.down("sm")]: {
								display: "none",
							},
						}}
					>
						<img
							src={loginThumbnail}
							className={styles.coverImg}
							alt="patient"
						/>
					</Box>
				</Box>
				<Box
					sx={{
						fontFamily: "Poppins",
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
							fontFamily: "Poppins",
							display: "flex",
							flexDirection: "column",
							alignItems: "center",
						}}
					>
						<Typography
							fontFamily="Poppins"
							variant="h3"
							sx={{
								fontFamily: "Poppins",
								fontWeight: "bold",
								[theme.breakpoints.down("xsm")]: {
									fontSize: "9vw",
								},
							}}
						>
							{patient.login.h1}{" "}
						</Typography>
						<Typography
							fontFamily="Poppins"
							variant="h6"
							sx={{
								fontFamily: "Poppins",
								color: theme.secondaryText,
								[theme.breakpoints.down("xsm")]: {
									fontSize: "5vw",
								},
							}}
						>
							{patient.login.h2}{" "}
						</Typography>
					</Box>
					<Box
						sx={{
							fontFamily: "Poppins",
							display: "flex",
							flexDirection: "column",
							width: "70%",
							gap: "1rem",
							alignItems: "center",
						}}
					>
						<Box
							sx={{
								fontFamily: "Poppins",
								display: "flex",
								flexDirection: "column",
								width: "100%",
								alignItems: "center",
							}}
						>
							<InputLabel
								htmlFor="email"
								sx={{
									fontFamily: "Poppins",
									alignSelf: "flex-start",
									paddingInline: "2rem",
									fontSize: "1.1rem",
									color: "#9D9D9D",
									[theme.breakpoints.down("xsm")]: {
										fontSize: "1rem",
										paddingInline: "1rem",
									},
								}}
							>
								{patient.login.email}{" "}
							</InputLabel>

							<Input
								id="email"
								type="email"
								name="email"
								sx={{
									fontFamily: "Poppins",
									borderRadius: "20px",
									outlineColor: theme.patient.inputActive,
									border: `2px solid ${theme.patient.inputDefault}`,
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
						<Box
							sx={{
								fontFamily: "Poppins",
								display: "flex",
								flexDirection: "column",
								width: "100%",
								alignItems: "center",
							}}
						>
							<InputLabel
								htmlFor="password"
								sx={{
									fontFamily: "Poppins",
									alignSelf: "flex-start",
									paddingInline: "2rem",
									fontSize: "1.1rem",
									color: "#9D9D9D",
									[theme.breakpoints.down("xsm")]: {
										fontSize: "1rem",
										paddingInline: "1rem",
									},
								}}
							>
								{patient.login.password}{" "}
							</InputLabel>

							<Input
								id="password"
								type="password"
								name="password"
								sx={{
									fontFamily: "Poppins",
									borderRadius: "20px",
									outlineColor: theme.patient.inputActive,
									border: `2px solid ${theme.patient.inputDefault}`,
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
							}}
						>
							{patient.login.forgot}{" "}
						</Link>
					</Box>
					<Box
						sx={{
							fontFamily: "Poppins",
							display: "flex",
							flexDirection: "column",
							width: "100%",
							alignItems: "center",
							gap: "1rem",
						}}
					>
						<Input
							type="submit"
							value={patient.login.button}
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
						<span>
							{patient.login.newUser}{" "}
							<Link to="/signup-user" style={{ color: theme.success }}>
								{patient.login.register}{" "}
							</Link>
						</span>
					</Box>
				</Box>
			</Box>
		</Box>
	);
};
