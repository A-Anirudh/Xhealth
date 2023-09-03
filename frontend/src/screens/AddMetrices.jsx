import { Box } from "@mui/material";
import React, { useEffect } from "react";
import { useUpdateHealthMetricesMutation } from "../slices/usersApiSlice";
import { Users } from "../sdk/users";

export const AddMetrices = () => {
	const user = new Users();
	const [setMetrices] = useUpdateHealthMetricesMutation();
	const [personalHealth, refetchHealth] = user.getPersonalHealth();
	useEffect(() => {
		refetchHealth();
	}, [refetchHealth]);
	useEffect(() => {
		(async () => {
			console.log(
				await setMetrices({
					heartRate: "34",
					bloodPressure: "34/56",
					glucose: "34",
					weight: "34",
					height: "34",
					bmi: "34",
				})
			);

			console.log(await personalHealth);
		})();
	}, [personalHealth, refetchHealth]);
	return <Box></Box>;
};
