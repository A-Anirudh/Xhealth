import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Users } from "../sdk/users";
import {
	useAddHealthRecordMutation,
	useGetHealthRecordsMutation,
	useUploadPdfMutation,
} from "../slices/healthRecordSlice";
import { Alert, Box, Button, Grid, Input, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import ClearIcon from "@mui/icons-material/Clear";
import { Link, useNavigate } from "react-router-dom";
import { useChangeAptStatusMutation } from "../slices/doctorsApiSlice";

export const AddHealthRecord = () => {
	const patientEmail = useSelector((state) => state.patientId);
	const doctorId = useSelector((state) => state.auth.doctorInfo._id);
	const {
		lang: { doctor },
	} = useSelector((state) => state.language);
	const aptId = useSelector((state) => state.aptId);
	const theme = useTheme();
	const link = "https://xhealth-git-jagnathreddy9-dev.apps.sandbox-m4.g2pi.p1.openshiftapps.com/api/users/healthRecords/key/";

	// const [records] = useGetHealthRecordsMutation();
	const [addRecord] = useAddHealthRecordMutation();
	const [uploadPdf] = useUploadPdfMutation();
	const [allRecords, setallRecords] = useState();
	const hrs = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
		21, 22, 23,
	];
	const generateEmptyTimings = (count) => {
		return new Array(count).fill(""); // Initialize with empty arrays
	};

	//---------Dynamic input fields states-------
	const [problems, setproblems] = useState([""]);
	const [allmeds, setallmeds] = useState([
		{ name: "", dosage: 0, perDay: 0, gap: 0, timings: [] },
	]);
	const [timing, settiming] = useState([generateEmptyTimings(0)]);
	const [immu, setimmu] = useState([{ name: "", dosage: "" }]);
	const [scans, setScans] = useState([{ name: "", pdfLink: link, typeOf: "" }]); //todo:encodedPDF->(entire pdf)->(base64string)
	const [body, setBody] = useState([""]);
	const [status] = useChangeAptStatusMutation();
	const [alert, setAlert] = useState(false);
	//---------Dynamic input fields states-------

	const [newRecord, setnewRecord] = useState({
		email: patientEmail,
		record: {
			doctorId: doctorId, //get from the local storage

			diagnoses: {
				data: "",
				problems: "", //assign to problem array
			},

			medications: {
				startDate: "",
				endDate: "",
				allMeds: [{}], //assign to medsArray
			},

			immunizations: [], //assign of immunizationArray

			scans: [{}], //assign to scansArray
			time: new Date(),
		},
	});

	// useEffect(() => {
	//   return async () => {
	//     await records({ email: patientEmail }).unwrap().then((data) => setallRecords(data))
	//   }
	// }, [patientEmail])

	if (!newRecord) return "loading";

	//-------Required Functions-----

	const handleOnSubmit = () => {
		setAlert(true);
	};

	const handleOtherChange = (e) => {
		const { name, value } = e.target;
		if (name == "diagnoses") {
			setnewRecord({
				...newRecord,
				record: {
					...newRecord.record,
					diagnoses: { ...newRecord.record.diagnoses, data: value },
				},
			});
		} else if (name == "startDate") {
			setnewRecord({
				...newRecord,
				record: {
					...newRecord.record,
					medications: { ...newRecord.record.medications, startDate: value },
				},
			});
		} else if (name == "endDate") {
			setnewRecord({
				...newRecord,
				record: {
					...newRecord.record,
					medications: { ...newRecord.record.medications, endDate: value },
				},
			});
		}
	};

	//----Dynamic problems----
	const addProblem = () => {
		setproblems([...problems, ""]);
	};
	const handleProblemChange = (e, i) => {
		const value = e.target.value;
		setproblems((prev) => {
			const updatedProblems = [...prev];
			updatedProblems[i] = value;
			setnewRecord((prev) => {
				const prevValue = { ...prev };
				prevValue.record.diagnoses.problems = updatedProblems;
				return prevValue;
			});
			return updatedProblems;
		});
	};
	const handleProblemRemove = (e, i) => {
		const updatedProblems = [...problems];
		updatedProblems.splice(i, 1);

		setproblems(updatedProblems);

		setnewRecord((prev) => ({
			...prev,
			record: {
				...prev.record,
				diagnoses: {
					...prev.record.diagnoses,
					problems: updatedProblems,
				},
			},
		}));
	};
	//----Dynamic problems----

	//----Dynamic Medicines----
	const addMedication = () => {
		setallmeds([
			...allmeds,
			{ name: "", dosage: 0, perDay: 0, gap: 0, timings: [] },
		]);
	};
	const handleRemoveMedication = (i) => {
		const updatedMedicine = [...allmeds];
		const updateTiming = [...timing];

		updatedMedicine.splice(i, 1);
		updateTiming.splice(i, 1);

		setallmeds(updatedMedicine);
		settiming(updateTiming);
	};
	const handleMedicationChange = (e, i) => {
		const prevRecord = { ...newRecord };
		const { name, value } = e.target;
		const updateValue = [...allmeds];
		updateValue[i][name] = value;
		if (name == "perDay") {
			const perDayValue = Number(value);
			updateValue[i][name] = perDayValue;

			updateValue[i].timings = generateEmptyTimings(perDayValue);

			const updatedTiming = [...timing];
			updatedTiming[i] = generateEmptyTimings(perDayValue);
			settiming(updatedTiming);
			setallmeds(updateValue);

			prevRecord.record.medications.allMeds = allmeds;
			setnewRecord(prevRecord);

			return;
		}
		if (name == "dosage" || name == "gap") {
			const perDayValue = Number(value);
			updateValue[i][name] = perDayValue;
			setallmeds(updateValue);
		}
		setallmeds(updateValue);
		prevRecord.record.medications.allMeds = allmeds;
		setnewRecord(prevRecord);
	};
	const handleTimeChange = (e, i, j) => {
		//j is medicine index
		//i is timing index
		const { name, value } = e.target;

		const prev = [...timing];
		prev[j][i] = value;

		settiming(prev);

		const prevMed = [...allmeds];

		prevMed[j].timings = timing[j];
		setallmeds(prevMed);
	};
	//----Dynamic Medicines----

	//----Dynamic immunization----
	const addImmunization = () => {
		setimmu([...immu, { name: "", dosage: "" }]);
	};
	const handleRemoveImmu = (i) => {
		const updateImmu = [...immu];
		updateImmu.splice(i, 1);
		setimmu(updateImmu);

		setnewRecord((prev) => ({
			...prev,
			record: {
				...prev.record,
				immunizations: updateImmu,
			},
		}));
	};
	const handleImmuChange = (e, i) => {
		const { name, value } = e.target;
		if (name == "dosage") {
			setimmu((prev) => {
				const updatedImmu = [...prev];
				updatedImmu[i][name] = Number(value);
				setnewRecord((prev) => {
					const prevValue = { ...prev };
					prevValue.record.immunizations = updatedImmu;
					return prevValue;
				});
				return updatedImmu;
			});
		} else {
			setimmu((prev) => {
				const updatedImmu = [...prev];
				updatedImmu[i][name] = value;
				setnewRecord((prev) => {
					const prevValue = { ...prev };
					prevValue.record.immunizations = updatedImmu;
					return prevValue;
				});
				return updatedImmu;
			});
		}
	};
	//----Dynamic immunization----

	//----Dynamic Scans----
	const addScans = () => {
		setScans([...scans, { name: "", pdfLink: "", typeOf: "" }]);
		setBody([...body, ""]);
	};
	const handleRemoveScan = (i) => {
		const updateScans = [...scans];
		updateScans.splice(i, 1);
		setScans(updateScans);

		setnewRecord((prev) => ({
			...prev,
			record: {
				...prev.record,
				scans: updateScans,
			},
		}));

		const updateBody = [...body];
		updateBody.splice(i, 1);
		setBody(updateBody);
	};
	const handleScanChange = (e, i) => {
		const { name, value } = e.target;
		if (name == "pdfLink") {
			const key = e.target.files[0].name;
			const updateScans = [...scans];
			updateScans[i]["name"] = key;
			updateScans[i]["pdfLink"] = link + key;
			setScans(updateScans);
			setnewRecord({
				...newRecord,
				record: { ...newRecord["record"], scans: scans },
			});

			//encoding
			const file = e.target.files[0];
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onloadend = function () {
				const base64String = reader.result
					.replace("data:", "")
					.replace(/^.+,/, "");
				const updateBody = [...body];
				updateBody[i] = JSON.stringify({
					documentBase64: base64String,
					key: key,
				});
				setBody(updateBody);
			};
		} else {
			const updateScans = [...scans];
			updateScans[i][name] = value;
			setnewRecord({
				...newRecord,
				record: { ...newRecord["record"], scans: updateScans },
			});
		}
	};
	//----Dynamic Scans----
	useEffect(() => {}, [body]);

	const navigate = useNavigate();
	const submitEnd = async () => {
		const data = addRecord(newRecord);
		for (let i = 0; i < body.length; i++) {
			 await uploadPdf(body[i]);
		}
		status({ _id: aptId, newStatus: "Completed" });
		navigate("/dashboard-doctor");
		setAlert(false);
	};

	const submitCancel = () => {
		setAlert(false);
	};

	//-------Required Functions-----
	return (
		<Grid sx={{ marginX: "5rem", boxSizing: "border-box" }}>
			{alert ? (
				<Alert
					severity="warning"
					sx={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
						transform: "translate(-50%, -50%)",
						position: "absolute",
						top: "10%",
						left: "50%",
						marginTop: "2rem",
					}}
				>
					<Typography variant="h6" fontFamily="poppins" margin={2}>
						{doctor.healthRecord.confirmMsg}
					</Typography>
					<Box
						sx={{
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							gap: "5rem",
						}}
					>
						<Button
							onClick={submitCancel}
							sx={{
								color: "white",
								fontFamily: "poppins",
								textTransform: "capitalize",
								backgroundColor: "red",
								":hover": {
									color: "red",
									backgroundColor: "transparent",
									outline: "2px solid red",
								},
							}}
						>
							{doctor.healthRecord.bCancel}
						</Button>
						<Button
							onClick={submitEnd}
							sx={{
								color: "white",
								fontFamily: "poppins",
								textTransform: "capitalize",
								backgroundColor: `${theme["green-btn"]}`,
								":hover": {
									color: `${theme["green-btn"]}`,
									backgroundColor: "transparent",
									outline: `2px solid ${theme["green-btn"]}`,
								},
							}}
						>
							{doctor.healthRecord.bSubmit}
						</Button>
					</Box>
				</Alert>
			) : null}

			<Box
				color={theme.doctor.primary}
				className="title&button"
				display="flex"
				justifyContent="space-between"
				alignItems="center"
				padding={1}
				margin={2}
			>
				<Typography fontFamily="poppins" fontWeight="600" variant="h4">
					{doctor.healthRecord.h1}{" "}
				</Typography>
				<Button
					sx={{
						color: "white",
						backgroundColor: `${theme["green-btn"]}`,
						textTransform: "capitalize",
						fontFamily: "poppins",
						fontSize: "1.2vw",
						padding: "0rem 2vw",
						borderRadius: "10px",
						"&:hover": {
							backgroundColor: "white",
							color: `${theme["green-btn"]}`,
							outline: `2px solid ${theme["green-btn"]}`,
						},
						boxShadow: "0px 4px 11px 0px rgba(0, 0, 0, 0.25)",
					}}
					onClick={handleOnSubmit}
				>
					{doctor.healthRecord.h2}
				</Button>
			</Box>
<Typography variant="h3" fontFamily={'poppins'} fontWeight={'600'} color='grey'>Reason:{localStorage.getItem('reason')}</Typography>
			<Box
				className="diagnosis"
				padding={1}
				margin={2}
				display="flex"
				flexDirection="column"
			>
				<Box display="flex" width="100%" alignItems="center">
					<Typography
						sx={{
							fontFamily: "poppins",
							fontWeight: "600",
							fontSize: "2vw",
							color: `${theme["grey-heading"]}`,
						}}
					>
						{doctor.healthRecord.diagnosis}
					</Typography>
					<Box
						width="100%"
						height="2px"
						backgroundColor={theme["grey-heading"]}
					></Box>
				</Box>
				<Box
					className="inputField"
					backgroundColor=""
					marginTop={2}
					sx={{
						width: "100%",
						border: `1px solid ${theme["grey-border"]}`,
						borderRadius: "10px",
						height: "5vh",
					}}
					display="flex"
					alignItems="center"
				>
					<Typography
						fontFamily="poppins"
						fontWeight="600"
						fontSize="1.0vw"
						padding="0.1rem 2rem"
						borderRight={`2px solid ${theme["grey-border"]}`}
						className="label"
					>
						{doctor.healthRecord.diagnosis}
					</Typography>
					<Input
						type="text"
						disableUnderline
						sx={{ fontFamily: "poppins", marginInline: "2rem", width: "100%" }}
						name="diagnoses"
						value={newRecord.record.diagnoses.data}
						onChange={(e) => handleOtherChange(e)}
					></Input>
				</Box>
			</Box>

			<Box
				className="problems"
				padding={1}
				margin={2}
				display="flex"
				flexDirection="column"
			>
				<Box display="flex" width="100%" alignItems="center">
					<Typography
						sx={{
							fontFamily: "poppins",
							fontWeight: "600",
							fontSize: "2vw",
							color: `${theme["grey-heading"]}`,
						}}
					>
						{doctor.healthRecord.problems.name}
					</Typography>
					<Box width="100%" height="2px" backgroundColor="grey"></Box>
				</Box>

				<Button
					sx={{
						color: "white",
						backgroundColor: `${theme["green-btn"]}`,
						textTransform: "capitalize",
						fontFamily: "poppins",
						fontSize: "1vw",
						padding: "0rem 2vw",
						borderRadius: "10px",
						"&:hover": {
							backgroundColor: "white",
							color: `${theme["green-btn"]}`,
							outline: `2px solid ${theme["green-btn"]}`,
						},
						width: "2vw",
						boxShadow: "0px 4px 11px 0px rgba(0, 0, 0, 0.25);",
					}}
					onClick={addProblem}
				>
					{doctor.healthRecord.addButton}
				</Button>

				<Box
					className="problemsHolder"
					display="flex"
					backgroundColor={theme["grey-bg"]}
					padding={2}
					margin={2}
					borderRadius={2}
					flexWrap={"wrap"}
					gap="1rem"
					alignItems={"left"}
				>
					{problems.map((val, i) => (
						<Box key={i} className="problemCard">
							<Box
								className="inputField"
								display="flex"
								color="white"
								padding={2}
								height="5vh"
								alignItems="center"
								border={`1px solid ${theme["grey-border"]}`}
								backgroundColor="white"
								borderRadius={"0.6rem"}
							>
								<Typography
									className="label"
									color={"black"}
									fontFamily={"poppins"}
									fontWeight={"600"}
									paddingX={"1rem"}
									paddingY={"0.1rem"}
									backgroundColor=""
									borderRight={`2px solid ${theme["grey-border"]}`}
								>
									{doctor.healthRecord.problems.label}
								</Typography>
								<Input
									type="text"
									disableUnderline
									sx={{
										backgroundColor: "white",
										fontFamily: "poppins",
										paddingInline: "2rem",
									}}
									value={val}
									onChange={(e) => handleProblemChange(e, i)}
								></Input>
								<Button onClick={(e) => handleProblemRemove(e, i)}>
									<ClearIcon sx={{ color: `${theme.Cancelled}` }} />
								</Button>
							</Box>
						</Box>
					))}
				</Box>
			</Box>

			<Box
				className="medicines"
				padding={1}
				margin={2}
				display="flex"
				flexDirection="column"
			>
				<Box display="flex" width="100%" alignItems="center">
					<Typography
						sx={{
							fontFamily: "poppins",
							fontWeight: "600",
							fontSize: "2vw",
							color: `${theme["grey-heading"]}`,
						}}
					>
						{doctor.healthRecord.medicines.name}
					</Typography>
					<Box width="100%" height="2px" backgroundColor="grey"></Box>
				</Box>
				<Box
					display="flex"
					alignItems="center"
					flexWrap={"wrap"}
					margin={2}
					gap={"1rem"}
				>
					<Box
						display={"flex"}
						color="white"
						padding={2}
						height="5vh"
						alignItems="center"
						border={`1px solid ${theme["grey-border"]}`}
						backgroundColor="white"
						borderRadius={"0.6rem"}
					>
						<Typography
							color={"black"}
							fontFamily={"poppins"}
							fontWeight={"600"}
							paddingX={"1rem"}
							paddingY={"0.1rem"}
							backgroundColor=""
							borderRight={`2px solid ${theme["grey-border"]}`}
						>
							{doctor.healthRecord.medicines.start}
						</Typography>
						<Input
							type="date"
							disableUnderline
							sx={{
								backgroundColor: "white",
								fontFamily: "poppins",
								paddingInline: "2rem",
							}}
							name="startDate"
							value={newRecord.record.medications.startDate}
							onChange={(e) => handleOtherChange(e)}
						></Input>
					</Box>

					<Box
						display={"flex"}
						color="white"
						padding={2}
						height="5vh"
						alignItems="center"
						border={`1px solid ${theme["grey-border"]}`}
						backgroundColor="white"
						borderRadius={"0.6rem"}
					>
						<Typography
							color={"black"}
							fontFamily={"poppins"}
							fontWeight={"600"}
							paddingX={"1rem"}
							paddingY={"0.1rem"}
							backgroundColor=""
							borderRight={`2px solid ${theme["grey-border"]}`}
						>
							{doctor.healthRecord.medicines.end}
						</Typography>
						<Input
							type="date"
							disableUnderline
							sx={{
								backgroundColor: "white",
								fontFamily: "poppins",
								paddingInline: "2rem",
							}}
							name="endDate"
							value={newRecord.record.medications.endDate}
							onChange={(e) => handleOtherChange(e)}
						></Input>
					</Box>
				</Box>
				<Button
					sx={{
						color: "white",
						backgroundColor: `${theme["green-btn"]}`,
						textTransform: "capitalize",
						fontFamily: "poppins",
						fontSize: "1vw",
						padding: "0rem 2vw",
						borderRadius: "10px",
						"&:hover": {
							backgroundColor: "white",
							color: `${theme["green-btn"]}`,
							outline: `2px solid ${theme["green-btn"]}`,
						},
						width: "2vw",
						boxShadow: "0px 4px 11px 0px rgba(0, 0, 0, 0.25);",
					}}
					onClick={addMedication}
				>
					{doctor.healthRecord.addButton}
				</Button>
				<Box
					className="medicineHolder"
					display="flex"
					backgroundColor={theme["grey-bg"]}
					padding={4}
					margin={2}
					borderRadius={2}
					flexWrap={"wrap"}
					gap="1rem"
					alignItems={"left"}
				>
					{allmeds.map((value, j) => {
						const { name, dosage, perDay, gap, timings } = value;
						return (
							<Box
								key={j}
								className="problemCard"
								display="flex"
								flexDirection={"column"}
								backgroundColor={theme["purple-bg"]}
								paddingX={2}
								paddingY={2}
								borderRadius={3}
								width={"25vw"}
								gap={"0.8rem"}
							>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="space-between"
									marginX={"1rem"}
								>
									<Typography
										className="label"
										sx={{
											fontFamily: "poppins",
											fontSize: "1.5vw",
											fontWeight: "500",
											color: `${theme["magenta"]}`,
										}}
									>
										{doctor.healthRecord.medicines.label.label}
									</Typography>
									<Button onClick={() => handleRemoveMedication(j)}>
										<ClearIcon sx={{ color: `${theme.Cancelled}` }} />
									</Button>
								</Box>
								<Box
									className="inputField"
									display="flex"
									color="white"
									padding={2}
									height="5vh"
									alignItems="center"
									border={`1px solid ${theme["grey-border"]}`}
									backgroundColor="white"
									borderRadius={"0.6rem"}
								>
									<Typography
										color={"black"}
										fontFamily={"poppins"}
										fontWeight={"600"}
										paddingX={"1rem"}
										paddingY={"0.1rem"}
										backgroundColor=""
										borderRight={`2px solid ${theme["grey-border"]}`}
										className="label"
									>
										{doctor.healthRecord.medicines.label.name}
									</Typography>
									<Input
										type="text"
										disableUnderline
										sx={{
											backgroundColor: "white",
											fontFamily: "poppins",
											paddingInline: "2rem",
										}}
										value={name}
										name="name"
										onChange={(e) => handleMedicationChange(e, j)}
									></Input>
								</Box>

								<Box
									className="inputField"
									display="flex"
									color="white"
									padding={2}
									height="5vh"
									alignItems="center"
									border={`1px solid ${theme["grey-border"]}`}
									backgroundColor="white"
									borderRadius={"0.6rem"}
								>
									<Typography
										color={"black"}
										fontFamily={"poppins"}
										fontWeight={"600"}
										paddingX={"1rem"}
										paddingY={"0.1rem"}
										backgroundColor=""
										borderRight={`2px solid ${theme["grey-border"]}`}
									>
										{doctor.healthRecord.medicines.label.dosage}
									</Typography>
									<Input
										type="text"
										disableUnderline
										sx={{
											backgroundColor: "white",
											fontFamily: "poppins",
											paddingInline: "2rem",
										}}
										value={dosage}
										name="dosage"
										onChange={(e) => handleMedicationChange(e, j)}
									></Input>
								</Box>
								<Box
									className="inputField"
									display="flex"
									color="white"
									padding={2}
									height="5vh"
									alignItems="center"
									border={`1px solid ${theme["grey-border"]}`}
									backgroundColor="white"
									borderRadius={"0.6rem"}
								>
									<Typography
										color={"black"}
										fontFamily={"poppins"}
										paddingX={"1rem"}
										fontWeight={"600"}
										borderRight={`2px solid ${theme["grey-border"]}`}
									>
										{doctor.healthRecord.medicines.label.perDay}
									</Typography>
									<Input
										type="text"
										disableUnderline
										sx={{
											backgroundColor: "white",
											fontFamily: "poppins",
											paddingInline: "2rem",
										}}
										value={perDay}
										name="perDay"
										onChange={(e) => handleMedicationChange(e, j)}
									></Input>
								</Box>

								<Box
									className="inputField"
									display="flex"
									color="white"
									padding={2}
									height="5vh"
									alignItems="center"
									border={`1px solid ${theme["grey-border"]}`}
									backgroundColor="white"
									borderRadius={"0.6rem"}
								>
									<Typography
										color={"black"}
										fontFamily={"poppins"}
										fontWeight={"600"}
										paddingX={"1rem"}
										paddingY={"0.1rem"}
										backgroundColor=""
										borderRight={`2px solid ${theme["grey-border"]}`}
									>
										{doctor.healthRecord.medicines.label.gap}
									</Typography>
									<Input
										type="text"
										disableUnderline
										sx={{
											backgroundColor: "white",
											fontFamily: "poppins",
											paddingInline: "2rem",
										}}
										value={gap}
										name="gap"
										onChange={(e) => handleMedicationChange(e, j)}
									></Input>
								</Box>

								{timings.map((val, i) => {
									return (
										<Box key={i} className="problemCard">
											<Box
												className="inputField"
												display="flex"
												padding={2}
												height="5vh"
												alignItems="center"
												border={`1px solid ${theme["grey-border"]}`}
												backgroundColor="white"
												borderRadius={"0.6rem"}
											>
												<Typography
													color={`${theme["magenta"]}`}
													fontFamily={"poppins"}
													fontWeight={"600"}
													paddingX={"1rem"}
													paddingY={"0.1rem"}
													backgroundColor=""
													borderRight={`2px solid ${theme["grey-border"]}`}
												>
													{doctor.healthRecord.medicines.label.time}
												</Typography>
												<select
													style={{
														backgroundColor: "white",
														fontFamily: "poppins",
														paddingInline: "2rem",
														marginLeft: "1rem",
														color: `${theme["magenta"]}`,
														fontWeight: "600",
													}}
													value={timing[j][i]}
													onChange={(e) => handleTimeChange(e, i, j)}
												>
													{hrs.map((item) => (
														<option value={item}>{item + " hrs"}</option>
													))}
												</select>
											</Box>
										</Box>
									);
								})}
							</Box>
						);
					})}
				</Box>
			</Box>

			<Box
				className="immunization"
				padding={1}
				margin={2}
				display="flex"
				flexDirection="column"
			>
				<Box display="flex" width="100%" alignItems="center">
					<Typography
						sx={{
							fontFamily: "poppins",
							fontWeight: "600",
							fontSize: "2vw",
							color: `${theme["grey-heading"]}`,
						}}
					>
						{doctor.healthRecord.immunizations.name}
					</Typography>
					<Box width="100%" height="2px" backgroundColor="grey"></Box>
				</Box>

				<Button
					sx={{
						color: "white",
						backgroundColor: `${theme["green-btn"]}`,
						textTransform: "capitalize",
						fontFamily: "poppins",
						fontSize: "1vw",
						padding: "0rem 2vw",
						borderRadius: "10px",
						"&:hover": {
							backgroundColor: "white",
							color: `${theme["green-btn"]}`,
							outline: `2px solid ${theme["green-btn"]}`,
						},
						width: "2vw",
						boxShadow: "0px 4px 11px 0px rgba(0, 0, 0, 0.25);",
					}}
					onClick={addImmunization}
				>
					{doctor.healthRecord.addButton}
				</Button>
				<Box
					className="immuHolder"
					display="flex"
					backgroundColor={theme["grey-bg"]}
					padding={2}
					margin={2}
					borderRadius={2}
					flexWrap={"wrap"}
					gap="1rem"
					alignItems={"left"}
				>
					{immu.map((value, j) => {
						const { name, dosage } = value;
						return (
							<Box
								key={j}
								className="problemCard"
								display="flex"
								flexDirection={"column"}
								backgroundColor={theme["purple-bg"]}
								paddingX={2}
								paddingY={2}
								borderRadius={3}
								width={"25vw"}
								gap={"0.8rem"}
							>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="space-between"
								>
									<Typography
										className="label"
										sx={{
											fontFamily: "poppins",
											fontSize: "1.5vw",
											fontWeight: "500",
											color: `${theme["magenta"]}`,
										}}
									>
										{doctor.healthRecord.immunizations.label}
									</Typography>
									<Button onClick={() => handleRemoveImmu(j)}>
										<ClearIcon sx={{ color: `${theme.Cancelled}` }} />
									</Button>
								</Box>
								<Box
									className="inputField"
									display="flex"
									color="white"
									padding={2}
									height="5vh"
									alignItems="center"
									border={`1px solid ${theme["grey-border"]}`}
									backgroundColor="white"
									borderRadius={"0.6rem"}
								>
									<Typography
										color={"black"}
										fontFamily={"poppins"}
										fontWeight={"600"}
										paddingX={"1rem"}
										paddingY={"0.1rem"}
										backgroundColor=""
										borderRight={`2px solid ${theme["grey-border"]}`}
									>
										{doctor.healthRecord.immunizations.name}
									</Typography>
									<Input
										type="text"
										disableUnderline
										sx={{
											backgroundColor: "white",
											fontFamily: "poppins",
											paddingInline: "2rem",
										}}
										value={name}
										name="name"
										onChange={(e) => handleImmuChange(e, j)}
									></Input>
								</Box>

								<Box
									className="inputField"
									display="flex"
									color="white"
									padding={2}
									height="5vh"
									alignItems="center"
									border={`1px solid ${theme["grey-border"]}`}
									backgroundColor="white"
									borderRadius={"0.6rem"}
								>
									<Typography
										color={"black"}
										fontFamily={"poppins"}
										fontWeight={"600"}
										paddingX={"1rem"}
										paddingY={"0.1rem"}
										backgroundColor=""
										borderRight={`2px solid ${theme["grey-border"]}`}
									>
										{doctor.healthRecord.immunizations.dosage}
									</Typography>
									<Input
										type="text"
										disableUnderline
										sx={{
											backgroundColor: "white",
											fontFamily: "poppins",
											paddingInline: "2rem",
										}}
										value={dosage}
										name="dosage"
										onChange={(e) => handleImmuChange(e, j)}
									></Input>
								</Box>
							</Box>
						);
					})}
				</Box>
			</Box>

			<Box
				className="scans"
				padding={1}
				margin={2}
				display="flex"
				flexDirection="column"
			>
				<Box display="flex" width="100%" alignItems="center">
					<Typography
						sx={{
							fontFamily: "poppins",
							fontWeight: "600",
							fontSize: "2vw",
							color: `${theme["grey-heading"]}`,
						}}
					>
						{doctor.healthRecord.scans.name}
					</Typography>
					<Box width="100%" height="2px" backgroundColor="grey"></Box>
				</Box>

				<Button
					sx={{
						color: "white",
						backgroundColor: `${theme["green-btn"]}`,
						textTransform: "capitalize",
						fontFamily: "poppins",
						fontSize: "1vw",
						padding: "0rem 2vw",
						borderRadius: "10px",
						"&:hover": {
							backgroundColor: "white",
							color: `${theme["green-btn"]}`,
							outline: `2px solid ${theme["green-btn"]}`,
						},
						width: "2vw",
						boxShadow: "0px 4px 11px 0px rgba(0, 0, 0, 0.25);",
					}}
					onClick={addScans}
				>
					{doctor.healthRecord.addButton}
				</Button>
				<Box
					className="immuHolder"
					display="flex"
					backgroundColor={theme["grey-bg"]}
					padding={2}
					margin={2}
					borderRadius={2}
					flexWrap={"wrap"}
					gap="1rem"
					alignItems={"left"}
				>
					{scans.map((value, j) => {
						const { name, pdfLink, typeOf } = value;
						return (
							<Box
								key={j}
								className="scanCard"
								display="flex"
								flexDirection={"column"}
								backgroundColor={theme["purple-bg"]}
								paddingX={2}
								paddingY={2}
								borderRadius={3}
								width={"30vw"}
								gap={"0.8rem"}
							>
								<Box
									display="flex"
									alignItems="center"
									justifyContent="space-between"
								>
									<Typography
										color={"black"}
										fontFamily={"poppins"}
										fontWeight={"600"}
										paddingX={"1rem"}
										paddingY={"0.1rem"}
										backgroundColor=""
										borderRight={`2px solid ${theme["grey-border"]}`}
										sx={{
											fontFamily: "poppins",
											fontSize: "1.5vw",
											fontWeight: "500",
											color: `${theme["magenta"]}`,
										}}
									>
										{doctor.healthRecord.scans.label}
									</Typography>
									<Button onClick={() => handleRemoveScan(j)}>
										<ClearIcon sx={{ color: `${theme.Cancelled}` }} />
									</Button>
								</Box>
								<Box
									className="inputField"
									display="flex"
									color="white"
									padding={2}
									height="5vh"
									alignItems="center"
									border={`1px solid ${theme["grey-border"]}`}
									backgroundColor="white"
									borderRadius={"0.6rem"}
								>
									<Typography
										color={"black"}
										fontFamily={"poppins"}
										fontWeight={"600"}
										paddingX={"1rem"}
										paddingY={"0.1rem"}
										fontSize={"1rem"}
										borderRight={`2px solid ${theme["grey-border"]}`}
									>
										{"Upload Scan"}
									</Typography>
									<input
										type="file"
										style={{
											backgroundColor: "white",
											fontFamily: "poppins",
											paddingInline: "1.5rem",
											flex: "1",
											color: "black",
											appearance: "none",
										}}
										accept=".pdf"
										name="pdfLink"
										onChange={(e) => handleScanChange(e, j)}
									/>
								</Box>
								<Box
									className="inputField"
									display="flex"
									color="white"
									padding={2}
									height="5vh"
									alignItems="center"
									border={`1px solid ${theme["grey-border"]}`}
									backgroundColor="white"
									borderRadius={"0.6rem"}
								>
									<Typography
										color={"black"}
										fontFamily={"poppins"}
										fontWeight={"600"}
										paddingX={"1rem"}
										paddingY={"0.1rem"}
										backgroundColor=""
										borderRight={`2px solid ${theme["grey-border"]}`}
									>
										{doctor.healthRecord.scans.type}
									</Typography>
									<Input
										type="text"
										disableUnderline
										sx={{
											backgroundColor: "white",
											fontFamily: "poppins",
											paddingInline: "2rem",
											flex: "1",
										}}
										value={typeOf}
										name="typeOf"
										onChange={(e) => handleScanChange(e, j)}
									></Input>
								</Box>
							</Box>
						);
					})}
				</Box>
			</Box>
		</Grid>
	);
};
