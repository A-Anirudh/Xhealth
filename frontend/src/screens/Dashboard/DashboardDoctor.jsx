import { useEffect, useState } from 'react'
import { Users } from '../../sdk/users';
import { useTheme } from '@emotion/react';
import { Box, Button, Grid, Typography } from '@mui/material';
import userProfile from "../../assets/profile.svg";
import dropdown from "../../assets/dropdown.png";
import coverImg from "../../assets/Doctors-pana 1.png";
import boyimg from "../../assets/boyimg.png";
import heart from "../../assets/heart.png";
import bw from "../../assets/bw.png";
import bp from "../../assets/bp.png";
import gl from "../../assets/gl.png";
import { Link } from "react-router-dom";
import AppointmentCard from './AppointmentCard';
export const DashboardDoctor = () => {
	const theme = useTheme();
	const user = new Users();
	const [doctorInfo, refetchDoctor] = user.getDoctorInfo();
	const [aptBasedOnDoc, refetchapt] = user.getDocApt();


	useEffect(() => {
		(async () => {
			await refetchDoctor()

		})
	}, [])
if(!aptBasedOnDoc) return "loading"
console.log(aptBasedOnDoc)


	return (
		<Grid className="main-container" container  
		>
			<Grid
				item
				xl={12}
				margin="4rem 6rem 2rem"
				container
				justifyContent="space-around"
				sx={{
					[theme.breakpoints.down("lg")]: {
						margin: "4rem 1rem 2rem"
					},
					[theme.breakpoints.down("sm")]: {
						margin: "2rem 1rem"
					},
				}}
			>
				<Grid
					item
					xl={8}
					boxShadow="0 4px 4px rgba(0,0,0,0.25)"
					borderRadius={4}
					overflow="hidden"
					border={`4px solid ${theme.doctor.primary}`}
				>
					<Box
						display="flex"
						alignItems="center"
						justifyContent="space-around"
						padding="0 7rem"
						sx={{
							[theme.breakpoints.down("md")]: {
								padding: "0",
								width: "90vw"
							},
							[theme.breakpoints.down("sm")]: {
								padding: "0",
								// width: "initial"
							},
						}}
					>
						<Box
							textAlign="center"
							minWidth="28rem"
							sx={{
								[theme.breakpoints.down("lg")]: {
									margin: "3rem",
								},
								[theme.breakpoints.down("sm")]: {
									margin: "2rem 0",
								},
							}}
						>
							<Typography
								variant="h3"
								display="flex"
								gap={2}
								fontWeight="bold"
								justifyContent="center"
								alignItems="center"
								fontFamily="Poppins"
								fontSize="2.8rem"
								sx={{
									[theme.breakpoints.down("sm")]: {
										fontSize: "2rem",
										gap: 1
									},
									[theme.breakpoints.down("xsm")]: {
										fontSize: "1.5rem"
									},
								}}
							>
								<Typography
									variant="h4"
									fontWeight="bold"
									fontFamily="Poppins"

									color={`${theme["purple-500"]}`}
									sx={{
										[theme.breakpoints.down("sm")]: {
											fontSize: "2rem"
										},
										[theme.breakpoints.down("xsm")]: {
											fontSize: "1.5rem"
										},
									}}
								// onClick={() => {
								//   appointments.find(item => {
								//     if (item.status === "Scheduled" && new Date(item.appointmentDate) < new Date()) {
								//       const data = {
								//         _id: item._id,
								//         newStatus: "Expired"
								//       }
								//       updateApt(data);
								//     }
								//   })
								// }}
								>
									Welcome
								</Typography>
								Dr. {doctorInfo?.firstName}!
							</Typography>
							<Typography
								variant="h5"
								fontFamily="Poppins"

								sx={{
									display: "inline",
									[theme.breakpoints.down("sm")]: {
										fontSize: "1.2rem"
									},
									[theme.breakpoints.down("xsm")]: {
										fontSize: "1rem"
									},
								}}
							>Empowering Health, One Patient at a Time </Typography>
						</Box>
						<Box
							sx={{
								[theme.breakpoints.down("lg")]: {
									display: "none"
								},
							}}
						>
							<img src={coverImg} alt="doctors image" />
						</Box>
					</Box>

				</Grid>
				<Grid item
					xl={3}
					backgroundColor="white"
					padding="1rem 1.5rem"
					borderRadius={4}
					boxShadow="0 4px 4px rgba(0,0,0,0.25)"
					position="relative"
					sx={{
						[theme.breakpoints.down("xl")]: {
							display: "none"
						},
					}}
				>

					<Typography variant="h5" fontFamily="Poppins" fontWeight={500} color={theme["blue-150"]} margin={0}>Profile</Typography>
					<Link
						style={{
							alignItems: "center",
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							top: "0",
							height: "100%",
							position: "absolute",
							left: "0",
							width: "100%",
							textDecoration: "none"
						}}
						to="/profile-doctor"
					>
						<img src={boyimg} alt="user avatar" />


						<Typography fontFamily="Poppins" color='black' fontSize='2rem' fontWeight='700' variant="h5">{doctorInfo?.firstName}</Typography>
						<Typography fontFamily="Poppins" color={theme['gray-200']} fontSize='1rem' variant="h5">{doctorInfo?.department}</Typography>

					</Link>
				</Grid>
			</Grid>


			<Grid className='cards-container'
			item xl={12}
			display='flex'
			flexDirection='column'
			 margin="4rem" 
			 borderRadius='1rem'
			  backgroundColor={theme.doctor.background}
			   width='100% '
			   padding='2rem' 
			   alignItems='center' 
			   justifyContent='center' 
			   overflow='auto' 
			   gap='1rem'
			//    maxHeight='100vh'
			   >
				
				{Object.keys(aptBasedOnDoc.apts)?.map((item) => (<AppointmentCard idx={Number(item)+1}name={aptBasedOnDoc.users_array[Number(item)].firstName+"\t"+aptBasedOnDoc.users_array[Number(item)].lastName} time={aptBasedOnDoc.apts[Number(item)].appointmentStartTime+"\thrs"} id={aptBasedOnDoc.users_array[Number(item)].email}/>) )}

			</Grid>
		</Grid>
	)
}

