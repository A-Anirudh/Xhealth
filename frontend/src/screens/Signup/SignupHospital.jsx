import { Box, Input, InputLabel, Typography } from "@mui/material";
import img from "../../assets/userSU.png";
import { Link, useNavigate } from "react-router-dom";
import styles from "../Login/Login.module.css";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useUserSignupMutation } from "../../slices/usersApiSlice";
import { setHospitalCredentials } from "../../slices/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { hospitalDetails } from "../../dump/";
import { Hospital } from "../../sdk/hospitals";

export const SignupHospital = () => {
	const theme = useTheme();
	const primary = "#1DB954";
	const [creds, setCreds] = useState({});
	const hospital = new Hospital();
	const signup = hospital.register();
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { hospitalInfo } = useSelector((state) => state.auth);
	const {
		lang: { hospital: langHospital },
	} = useSelector((state) => state.language);

	const getCredentials = (e) => {
		const { value, name } = e.target;
		setCreds((p) => ({ ...p, [name]: value }));
	};

	const submitCredentials = async (e, data) => {
		try {
			e.preventDefault();
			const { data: res } = await signup(data);
			res && dispatch(setHospitalCredentials(res));
			toast.success("Welcome User!");
		} catch (e) {
			toast.error("Invalid Credentials!!");
		}
	};

	useEffect(() => {
		navigate(hospitalInfo ? "/dashboard-hospital" : "/signup-hospital");
	}, [navigate, hospitalInfo]);

	return (
		<Box
			className="maincontainer"
			sx={{ display: "flex", boxSizing: "border-box" }}
		>
			<Box
				className="left-section"
				sx={{
					backgroundColor: primary,
					width: "15%",
					position: "relative",
					[theme.breakpoints.down("md")]: {
						display: "none",
					},
				}}
			>
				<img
					src={img}
					alt="signup image"
					style={{ position: "absolute", bottom: "0", width: "100%" }}
				/>
				<Typography
					sx={{
						color: "white",
						fontWeight: "600",
						fontFamily: "Poppins",
						position: "absolute",
						right: "0",
						fontSize: "5vw",
					}}
				>
					{langHospital.signup.regi}
				</Typography>
			</Box>

			<Box
				className="right-section"
				sx={{
					position: "relative",
					boxSizing: "border-box",
					width: "85%",
					display: "flex",
					flexDirection: "column",
					[theme.breakpoints.down("md")]: {
						width: "unset",
						display: "flex",
						alignItems: "center",
					},
				}}
			>
				<Typography
					sx={{
						color: primary,
						fontWeight: "600",
						fontFamily: "Poppins",
						position: "absolute",
						left: "0",
						fontSize: "5vw",
						top: "0",
						[theme.breakpoints.down("md")]: {
							display: "none",
						},
					}}
				>
					{langHospital.signup.ster}
				</Typography>
				<Typography
					sx={{
						color: primary,
						fontWeight: "600",
						fontFamily: "Poppins",
						fontSize: "4.7rem",
						display: "none",
						[theme.breakpoints.down("md")]: {
							display: "block",
							marginTop: "2rem",
							display: "flex",
							alignItems: "baseline",
							gap: "3rem",
						},
					}}
				>
					{langHospital.signup.register}
				</Typography>
				<Box
					sx={{
						display: "flex",
						minHeight: "80vh",
						gap: "4rem",
						alignItems: "center",
						justifyContent: "center",
						flexWrap: "wrap",
						marginTop: "8rem",
						padding: "2rem",
						position: "relative",
						[theme.breakpoints.down("md")]: {
							marginTop: "0",
						},
					}}
				>
					{hospitalDetails(langHospital.signup).map(({ name, type, label }) => (
						<Box
							key={name}
							sx={{
								display: "flex",
								flexDirection: "column",
								width: "26rem",
								alignItems: "center",
							}}
						>
							<InputLabel
								htmlFor={name}
								sx={{
									alignSelf: "flex-start",
									paddingInline: "1rem",
									fontSize: "1.2rem",
									fontFamily: "Poppins",
									color: primary,

									[theme.breakpoints.down("xsm")]: {
										fontSize: "1rem",
										paddingInline: "1rem",
									},
								}}
							>
								{label}
							</InputLabel>

							<Input
								id={name}
								type={type}
								name={name}
								sx={{
									borderRadius: "5px",
									width: "100%",
									padding: "0 1rem",
									height: "3rem",
									fontSize: "1rem",
									fontFamily: "Poppins",
									backgroundColor: theme.inputBackground,

									[theme.breakpoints.down("xsm")]: {
										fontSize: "1rem",
									},

									"&:focus": {},
								}}
								disableUnderline
								onChange={(e) => getCredentials(e)}
							/>
						</Box>
					))}
				</Box>
				<Input
					type="submit"
					value={langHospital.signup.Register}
					disableUnderline
					sx={{
						alignSelf: "center",
						borderRadius: "20px",
						backgroundColor: theme.success,
						border: "none",
						marginTop: "0",
						width: "400px",
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
			</Box>
		</Box>
	);
};
