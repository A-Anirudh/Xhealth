import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import store from "./store.js";
import {
	Box,
	ListItem,
	ListItemText,
	ThemeProvider,
	createTheme,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import {
	AddHealthRecord,
	LoginUser,
	DashboardUser,
	DashboardDoctor,
	LoginDoctor,
	LoginHospital,
	SignupUser,
	Appointments,
	LandingPage,
	DoctorRecommendation,
	PersonalHealthRecords,
	UserProfile,
	BookAppointment,
	SignupDoctor,
	DoctorProfile,
	DashboardHospital,
	SignupHospital,
	DoctorAppointments,
	AllHealthRecords,
	ViewAppointments,
} from "./screens";
import {
	DoctorPrivateRoutes,
	UserPrivateRoutes,
	HospitalPrivateRoutes,
} from "./components";
import "bootstrap/dist/css/bootstrap.min.css";
import { setLang } from "./slices/langSlice.js";
import { AddMetrices } from "./screens/AddMetrices.jsx";

const theme = createTheme({
	patient: {
		background: "#EDC8FF",
		primary: "#804980",
		inputDefault: "#C767C7",
		inputActive: "#804980",
	},
	doctor: {
		background: "#CFC3FF",
		primary: "#5642AA",
		inputDefault: "#ACA2D5",
		inputActive: "#5642AA",
	},
	hospital: {
		background: "#CCFFDE",
		primary: "#1DB954",
		inputDefault: "#9AE1B3",
		inputActive: "#35C367",
	},
	"purple-500": "#5642AA",
	"purple-100": "#DDCDF2",
	"purple-150": "#804980",
	"blue-100": "#F2F6FE",
	"blue-150": "#4145D1",
	"blue-500": "#272848",
	"green-olive": "#79AC6E",
	"green-150": "#AAFF98",
	"gray-200": "#7A7575",
	"yellow-200": "#FFFB93",
	Completed: "#939EFF",
	Scheduled: "#AAFF98",
	"In Progress": "#FFFB93",
	Cancelled: "#FF9393",
	Expired: "#C3C3C8",
	"purple-heading": "#5A4B9A",
	"purple-bg": "#DFD7FF",
	"green-btn": "#51AD49",
	"grey-heading": "#969696",
	magenta: "#6C002E",
	"grey-border": "#BEBEBE",
	"grey-bg": "#F6F6F6",
	inputBackground: "#ECECEC",
	primaryText: "",
	secondaryText: "#C3C3C8",
	success: "#79AC6E",
	breakpoints: {
		values: {
			xs: 0,
			xsm: 450,
			sm: 600,
			md: 900,
			lg: 1226,
			xl: 1536,
			xxl: 4000,
		},
	},
});

const AppRouter = () => {
	const [languageDisplay, setLanguageDisplay] = useState(false);
	const dispatch = useDispatch();
	return (
		<Router>
			<Box
				position="fixed"
				right="2rem"
				bottom="2rem"
				backgroundColor="#58fc5b"
				padding="0.5rem"
				display="flex"
				alignItems="center"
				justifyContent="center"
				height="3rem"
				width="3rem"
				borderRadius="999px"
				zIndex="44444"
				onClick={() => setLanguageDisplay((p) => !p)}
				cursor="pointer"
				aria-label="Language Selector"
			>
				<LanguageIcon />
			</Box>
			<Box
				position="fixed"
				right="2rem"
				bottom="6rem"
				padding="0"
				height="10rem"
				backgroundColor="white"
				borderRadius="0.4rem"
				zIndex="44444"
				onClick={() => setLanguageDisplay((p) => !p)}
				sx={{ overflowY: "scroll" }}
				className="scroll-type"
				display={languageDisplay ? "block" : "none"}
				aria-label="Language Options"
			>
				<ListItem
					sx={{
						display: "flex",
						flexDirection: "column",
						padding: "0",
					}}
				>
					<ListItemText
						sx={{
							padding: "0.5rem 1rem",
							margin: "0",
							width: "100%",
							textAlign: "center",
							cursor: "pointer",
							["&:hover"]: {
								backgroundColor: "lightgray",
							},
						}}
						onClick={() => dispatch(setLang("en"))}
						primary="English"
						aria-label="English"
					/>
					<ListItemText
						sx={{
							padding: "0.5rem 1rem",
							margin: "0",
							width: "100%",
							textAlign: "center",
							cursor: "pointer",
							["&:hover"]: {
								backgroundColor: "lightgray",
							},
						}}
						onClick={() => dispatch(setLang("es"))}
						primary="Spanish"
						aria-label="Spanish"
					/>
					<ListItemText
						sx={{
							padding: "0.5rem 1rem",
							margin: "0",
							width: "100%",
							textAlign: "center",
							cursor: "pointer",
							["&:hover"]: {
								backgroundColor: "lightgray",
							},
						}}
						onClick={() => dispatch(setLang("de"))}
						primary="German"
						aria-label="German"
					/>
					<ListItemText
						sx={{
							padding: "0.5rem 1rem",
							margin: "0",
							width: "100%",
							textAlign: "center",
							cursor: "pointer",
							["&:hover"]: {
								backgroundColor: "lightgray",
							},
						}}
						onClick={() => dispatch(setLang("hi"))}
						primary="Hindi"
						aria-label="Hindi"
					/>
					<ListItemText
						sx={{
							padding: "0.5rem 1rem",
							margin: "0",
							width: "100%",
							textAlign: "center",
							cursor: "pointer",
							["&:hover"]: {
								backgroundColor: "lightgray",
							},
						}}
						onClick={() => dispatch(setLang("kn"))}
						primary="Kannada"
						aria-label="Kannada"
					/>
					<ListItemText
						sx={{
							padding: "0.5rem 1rem",
							margin: "0",
							width: "100%",
							textAlign: "center",
							cursor: "pointer",
							["&:hover"]: {
								backgroundColor: "lightgray",
							},
						}}
						onClick={() => dispatch(setLang("bg"))}
						primary="Bengali"
						aria-label="Bengali"
					/>
					<ListItemText
						sx={{
							padding: "0.5rem 1rem",
							margin: "0",
							width: "100%",
							textAlign: "center",
							cursor: "pointer",
							["&:hover"]: {
								backgroundColor: "lightgray",
							},
						}}
						onClick={() => dispatch(setLang("ta"))}
						primary="Tamil"
						aria-label="Tamil"
					/>
					<ListItemText
						sx={{
							padding: "0.5rem 1rem",
							margin: "0",
							width: "100%",
							textAlign: "center",
							cursor: "pointer",
							["&:hover"]: {
								backgroundColor: "lightgray",
							},
						}}
						onClick={() => dispatch(setLang("mr"))}
						primary="Marathi"
						aria-label="Marathi"
					/>
					<ListItemText
						sx={{
							padding: "0.5rem 1rem",
							margin: "0",
							width: "100%",
							textAlign: "center",
							cursor: "pointer",
							["&:hover"]: {
								backgroundColor: "lightgray",
							},
						}}
						onClick={() => dispatch(setLang("te"))}
						primary="Telugu"
						aria-label="Telugu"
					/>
				</ListItem>
			</Box>
			<Routes>
				<Route path="/" element={<LandingPage />} aria-label="Landing Page" />
				<Route
					path="login-doctor"
					element={<LoginDoctor />}
					aria-label="Doctor Login"
				/>
				<Route
					path="login-hospital"
					element={<LoginHospital />}
					aria-label="Hospital Login"
				/>
				<Route
					path="login-user"
					element={<LoginUser />}
					aria-label="User Login"
				/>
				<Route
					path="signup-user"
					element={<SignupUser />}
					aria-label="User Signup"
				/>
				<Route
					path="signup-doctor"
					element={<SignupDoctor />}
					aria-label="Doctor Signup"
				/>
				<Route
					path="signup-hospital"
					element={<SignupHospital />}
					aria-label="Hospital Signup"
				/>

				<Route path="/" element={<UserPrivateRoutes />}>
					<Route
						path="dashboard-user"
						element={<DashboardUser />}
						aria-label="User Dashboard"
					/>
					<Route
						path="appointments"
						element={<Appointments />}
						aria-label="Appointments"
					/>
					<Route
						path="book-appointment"
						element={<BookAppointment />}
						aria-label="Book Appointment"
					/>
					<Route
						path="doctor-recommendation"
						element={<DoctorRecommendation />}
						aria-label="Doctor Recommendation"
					/>
					<Route
						path="health-records"
						element={<PersonalHealthRecords />}
						aria-label="Personal Health Records"
					/>
					<Route
						path="profile-user"
						element={<UserProfile />}
						aria-label="User Profile"
					/>
					<Route
						path="add-metrices"
						element={<AddMetrices />}
						aria-label="User Profile"
					/>
				</Route>
				<Route path="/" element={<DoctorPrivateRoutes />}>
					<Route
						path="dashboard-doctor"
						element={<DashboardDoctor />}
						aria-label="Doctor Dashboard"
					/>
					<Route
						path="profile-doctor"
						element={<DoctorProfile />}
						aria-label="Doctor Profile"
					/>
					<Route
						path="add-record"
						element={<AddHealthRecord />}
						aria-label="Add Health Record"
					/>
					<Route
						path="view-all-records"
						element={<AllHealthRecords />}
						aria-label="View All Health Records"
					/>
				</Route>
				<Route path="/" element={<HospitalPrivateRoutes />}>
					<Route
						path="doctor-appointments"
						element={<DoctorAppointments />}
						aria-label="Doctor Appointments"
					/>
					<Route
						path="dashboard-hospital"
						element={<DashboardHospital />}
						aria-label="Hospital Dashboard"
					/>
					<Route
						path="doctor/appointments/:docname/:id"
						element={<ViewAppointments />}
						aria-label="View Appointments"
					/>
				</Route>
			</Routes>
		</Router>
	);
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<React.StrictMode>
			<ThemeProvider theme={theme}>
				<AppRouter />
			</ThemeProvider>
		</React.StrictMode>
	</Provider>
);
