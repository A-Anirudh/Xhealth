import { Link, Navigate, Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import { Users } from "../sdk/users";
import userProfile from "../assets/profile.svg";
import { userLogout } from "../slices/authSlice";

export const UserPrivateRoutes = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const [userOptions, setUserOptions] = useState(false);
	const user = new Users();
	const theme = useTheme();
	const logout = user.logout();
	const dispatch = useDispatch();
	const logoutUser = async () => {
		try {
			await logout();
			dispatch(userLogout());
			setUserOptions(false);
		} catch (e) {
			console.error(e);
			toast.error("Something went wrong");
		}
	};

	return userInfo ? (
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
						fontFamily="poppins"
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
				<Link style={{ textDecoration: "none" }} to="/dashboard-user">
					<Typography
						fontFamily="poppins"
						variant="h6"
						marginLeft="3rem"
						fontWeight="bold"
						color="white"
						sx={{
							cursor: "pointer",
							[theme.breakpoints.down("sm")]: {
								fontSize: "5vw",
							},
						}}
					>
						Dashboard
					</Typography>
				</Link>
				<Box marginLeft="auto" display="flex" gap={4} alignItems="center">
					<Link to="/appointments" style={{ textDecoration: "none" }}>
						<Typography
							fontFamily="poppins"
							color="white"
							sx={{
								cursor: "pointer",
								[theme.breakpoints.down("sm")]: {
									fontSize: "1vw",
									display: "none",
								},
							}}
						>
							Appointments
						</Typography>
					</Link>
					<Box
						sx={{
							[theme.breakpoints.down("sm")]: {
								fontSize: "1vw",
								display: "none",
							},
						}}
					>
						<Link
							to="/health-records"
							style={{
								gap: "6px",
								textDecoration: "none",
								display: "flex",
								cursor: "pointer",
								alignItems: "center",
							}}
						>
							<Typography fontFamily="poppins" color="white">
								Health Record
							</Typography>
							{/* <img src={dropdown} alt="dropdown" /> */}
						</Link>
					</Box>
					<Link to="/doctor-recommendation" style={{ textDecoration: "none" }}>
						<Typography
							fontFamily="poppins"
							color="white"
							sx={{
								cursor: "pointer",
								[theme.breakpoints.down("sm")]: {
									fontSize: "1vw",
									display: "none",
								},
							}}
						>
							Get a Doctor
						</Typography>
					</Link>
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
								<Link to="/profile-user" style={{ textDecoration: "none" }}>
									<Typography
										fontFamily="poppins"
										sx={{
											cursor: "pointer",
											color: theme["blue-150"],
											fontWeight: "bold",
										}}
									>
										Profile
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
										Appointments
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
										Health Record
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
								Logout
							</Button>
						</Box>
					</Box>
				</Box>
			</Grid>
			<Outlet />
		</Box>
	) : (
		<Navigate to="/login-user" replace />
	); //make it landing page later
};
