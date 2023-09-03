import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
const CommonNavbar = () => {
	const currentUrl = window.location.href.split("/")[3];

	const color = {
		"login-doctor": "#5642aa",
		"login-user": "#804980",
		"login-hospital": "#1db954",
	};
	const hover = {
		"login-doctor": "#5642aa",
		"login-user": "#804980",
		"login-hospital": "#1db954",
	};
	const { lang } = useSelector((state) => state.language);
	return (
		<Box
			sx={{
				backgroundColor: "",
				padding: "1rem",
				display: "flex",
				gap: "2rem",
				alignItems: "baseline",
				position: "absolute",
				top: "0",
				left: "0",
				width: "100%",
			}}
		>
			<Link to="/" style={{ textDecoration: "none" }}>
				<Typography
					sx={{
						fontFamily: "poppins",
						fontSize: "2rem",
						fontWeight: "700",
						textDecoration: "none",
						color: `${color[currentUrl]}`,
					}}
				>
					Xhealth
				</Typography>
			</Link>
			<Link to="/" style={{ textDecoration: "none" }}>
				<Typography
					sx={{
						fontFamily: "poppins",
						fontSize: "1.5rem",
						fontWeight: "700",
						textDecoration: "none",
						color: "white",
						backgroundColor: "",
						padding: "0.35rem",
						borderRadius: "1rem",
						"&:hover": { backgroundColor: `${hover[currentUrl]}` },
					}}
				>
					{lang.menuBar.home}
				</Typography>
			</Link>
		</Box>
	);
};

export default CommonNavbar;
