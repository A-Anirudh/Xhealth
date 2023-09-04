import { Link, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Users } from "../sdk/users";
import userProfile from "../assets/profile.svg";
import { doctorLogout } from "../slices/authSlice";

export const DoctorPrivateRoutes = () => {
	const user = new Users();
	const theme = useTheme();
	const { doctorInfo } = useSelector((state) => state.auth);
	const [userOptions, setUserOptions] = useState(false);
	const logout = user.logoutDoctor();
	const dispatch = useDispatch();
	const {
		lang: { doctor },
	} = useSelector((state) => state.language);

	const logoutUser = async () => {
		try {
			await logout();
			dispatch(doctorLogout());
			setUserOptions(false);
		} catch (e) {
			console.error(e);
			toast.error("Something went wrong");
		}
	};

	return doctorInfo ? (
		<Box>
			<Grid
				item
				xl
				lg
				md
				sm
				xs
				xsm
				sx={{
					background: theme["purple-500"],
					padding: "1.5rem 2rem",
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
				<Link
					to="/dashboard-doctor"
					style={{ textDecoration: "none", marginInline: "2rem" }}
				>
					<Typography
						fontFamily="Poppins"
						color="white"
						sx={{
							cursor: "pointer",
							[theme.breakpoints.down("sm")]: {
								fontSize: "1vw",
								display: "none",
							},
						}}
					>
						{doctor.dashboard.menuBar.dashboard}
					</Typography>
				</Link>
				<Link
					to="/view-all-records"
					style={{ textDecoration: "none", marginInline: "2rem" }}
				>
					<Typography
						fontFamily="Poppins"
						color="white"
						sx={{
							cursor: "pointer",
							[theme.breakpoints.down("sm")]: {
								fontSize: "1vw",
								display: "none",
							},
						}}
					>
						{doctor.dashboard.menuBar.records}
					</Typography>
				</Link>
				<Box
					sx={{
						cursor: "pointer",
						position: "relative",
						marginLeft: "auto",
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
						<Box
							display="none"
							gap={1}
							alignItems="center"
							sx={{
								cursor: "pointer",
								[theme.breakpoints.down("xl")]: {
									display: "block",
								},
							}}
						>
							<Link to="/profile-doctor" style={{ textDecoration: "none" }}>
								<Typography
									fontFamily="poppins"
									sx={{
										cursor: "pointer",
										color: theme["blue-150"],
										fontWeight: "bold",
									}}
								>
									{doctor.dashboard.profile}
								</Typography>
							</Link>
						</Box>
						<Box
							sx={{
								[theme.breakpoints.down("xxl")]: {
									display: "none",
								},
								[theme.breakpoints.down("sm")]: {
									display: "block",
								},
							}}
						>
							<Link to="/appointments" style={{ textDecoration: "none" }}>
								<Typography
									fontFamily="poppins"
									sx={{
										cursor: "pointer",
										color: theme["blue-150"],
										fontWeight: "bold",
									}}
								>
									{doctor.dashboard.menuBar.appointments}
								</Typography>
							</Link>
						</Box>
						<Box
							display="flex"
							gap={1}
							alignItems="center"
							sx={{
								cursor: "pointer",
								[theme.breakpoints.down("xxl")]: {
									display: "none",
								},
								[theme.breakpoints.down("sm")]: {
									display: "block",
								},
							}}
						>
							<Link to="/health-records" style={{ textDecoration: "none" }}>
								<Typography
									fontFamily="poppins"
									sx={{
										cursor: "pointer",
										color: theme["blue-150"],
										fontWeight: "bold",
									}}
								>
									{doctor.dashboard.menuBar.healthRecord}
								</Typography>
							</Link>
						</Box>
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
							{doctor.dashboard.logout}
						</Button>
					</Box>
				</Box>
			</Grid>
			<Outlet />
		</Box>
	) : (
		<Navigate to="/login-doctor" replace />
	);
};
