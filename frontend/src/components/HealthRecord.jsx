import { Box, Button, Grid, Typography, useTheme } from "@mui/material";
import React from "react";

export const HealthRecord = () => {
	const theme = useTheme();
	return (
		<Box display="flex" alignItems="center" flexDirection="column">
			<Box
				display="flex"
				flexDirection="column"
				width="60%"
				marginTop="5rem"
				gap={3}
			>
				<Box display="flex" alignItems="center" width="100%">
					<Typography variant="h3">Health Record</Typography>
				</Box>
				<Box
					width="100%"
					backgroundColor={theme["purple-100"]}
					borderRadius="1rem 1rem 0 0"
					padding={4}
					minHeight="100vh"
				>
					<Grid
						container
						backgroundColor="white"
						padding="1rem"
						borderRadius={4}
					>
						<Grid item xs={4}>
							<Typography variant="h6">
								<strong>Name:</strong> Saksham
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant="h6">
								<strong>Age:</strong> 4
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant="h6">
								<strong>Email:</strong> mail
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant="h6">
								<strong>Phone:</strong> 44444
							</Typography>
						</Grid>
						<Grid item xs={4}>
							<Typography variant="h6">
								<strong>Address:</strong> 44444
							</Typography>
						</Grid>
					</Grid>
				</Box>
			</Box>
		</Box>
	);
};
