import React from "react";
import { Box, Typography } from "@mui/material";
import LandingBg from "../../assets/LBG.jpg";
import LoginCard from "./LoginCard";
import { useSelector } from "react-redux";
export const LandingPage = () => {
	const {
		lang: { landing },
	} = useSelector((state) => state.language);
	return (
		<Box
			sx={{
				background: `url(${LandingBg}) center no-repeat`, // Corrected the backgroundImage assignment
				minHeight: "100vh",
				backgroundSize: "cover",
				boxSizing: "border-box",
			}}
		>
			<Box className="main-container">
				<Typography
					variant="h2"
					sx={{
						fontSize: "clamp(2rem, 3.8vw, 3rem)",
						fontWeight: "500",
						color: "#ffffff",
						fontFamily: "Poppins",
						marginLeft: "2rem",
						paddingTop: "1rem",
					}}
				>
					{landing.h1}
				</Typography>
				<Typography
					variant="h4"
					sx={{
						fontSize: "clamp(1.3rem, 2.5vw, 2.125rem)",
						fontWeight: "300",
						color: "#58fc5b",
						fontFamily: "Poppins",
						marginLeft: "2rem",
						marginTop: "2vw",
					}}
				>
					{landing.h2}
				</Typography>

				<Box
					className="loginCard-container"
					sx={{
						display: "flex",
						gap: "5rem",
						flexWrap: "wrap",
						width: "100%",
						padding: "5rem 3rem",
						alignItems: "center",
						justifyContent: "space-around",
					}}
				>
					<LoginCard
						type={landing.doctor.h1}
						desc={landing.doctor.p}
						link={"/login-doctor"}
					/>
					<LoginCard
						type={landing.patient.h1}
						desc={landing.patient.p}
						link={"/login-user"}
					/>
					<LoginCard
						type={landing.hospital.h1}
						desc={landing.hospital.p}
						link={"/login-hospital"}
					/>
				</Box>
			</Box>
		</Box>
	);
};

export default LandingPage;
