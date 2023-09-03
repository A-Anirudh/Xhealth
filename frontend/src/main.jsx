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
// import { LoginUser, DashboardUser, DashboardDoctor, LoginDoctor, LoginHospital, SignupUser, Appointments, LandingPage, DoctorRecommendation, PersonalHealthRecords, UserProfile, BookAppointment, SignupDoctor, DoctorProfile, AddHealthRecord } from './screens';
// import { DoctorPrivateRoutes, UserPrivateRoutes } from './components';
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
import LanguageIcon from "@mui/icons-material/Language";
import {
	DoctorPrivateRoutes,
	UserPrivateRoutes,
	HospitalPrivateRoutes,
} from "./components";

// import './index.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { setLang } from "./slices/langSlice.js";

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
			>
				<LanguageIcon />
			</Box>
			<Box
				position="fixed"
				right="2rem"
				bottom="6rem"
				padding="0"
				backgroundColor="white"
				borderRadius="1rem"
				zIndex="44444"
				onClick={() => setLanguageDisplay((p) => !p)}
				overflow="hidden"
				display={languageDisplay ? "block" : "none"}
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
						onClick={() => dispatch(setLang("ml"))}
						primary="Malayalam"
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
						primary="Telegu"
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
					/>
				</ListItem>
			</Box>
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="login-doctor" element={<LoginDoctor />} />
				<Route path="login-hospital" element={<LoginHospital />} />
				<Route path="login-user" element={<LoginUser />} />
				<Route path="signup-user" element={<SignupUser />} />
				<Route path="signup-doctor" element={<SignupDoctor />} />
				<Route path="signup-hospital" element={<SignupHospital />} />

				<Route path="/" element={<UserPrivateRoutes />}>
					<Route path="dashboard-user" element={<DashboardUser />} />
					<Route path="appointments" element={<Appointments />} />
					<Route path="book-appointment" element={<BookAppointment />} />
					<Route
						path="doctor-recommendation"
						element={<DoctorRecommendation />}
					/>
					<Route path="health-records" element={<PersonalHealthRecords />} />
					<Route path="profile-user" element={<UserProfile />} />
				</Route>
				<Route path="/" element={<DoctorPrivateRoutes />}>
					{/* <Route path='doctor-appointments' element={<DoctorAppointments />} /> */}
					<Route path="dashboard-doctor" element={<DashboardDoctor />} />
					<Route path="profile-doctor" element={<DoctorProfile />} />
					<Route path="add-record" element={<AddHealthRecord />} />
					<Route path="view-all-records" element={<AllHealthRecords />} />
				</Route>
				<Route path="/" element={<HospitalPrivateRoutes />}>
					<Route path="doctor-appointments" element={<DoctorAppointments />} />
					<Route path="dashboard-hospital" element={<DashboardHospital />} />
					<Route
						path="doctor/appointments/:docname/:id"
						element={<ViewAppointments />}
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
