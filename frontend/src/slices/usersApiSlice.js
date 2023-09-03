// contains all of the endpoints to work with the backend

import { apiSlice } from "./apiSlice";

const USERS_URL = "/api/users";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		userLogin: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/auth`,
				method: "POST",
				body: data,
			}),
		}),
		userSignup: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}`,
				method: "POST",
				body: data,
			}),
		}),
		getUserInfo: builder.query({
			query: () => ({
				url: `${USERS_URL}/profile`,
				method: "GET",
			}),
		}),
		updateUserInfo: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/profile`,
				method: "PUT",
				body: data,
			}),
		}),
		getPersonalHeath: builder.query({
			query: () => ({
				url: `${USERS_URL}/metrics`,
				method: "GET",
			}),
		}),
		getAppointments: builder.query({
			query: () => ({
				url: `${USERS_URL}/appointments`,
				method: "GET",
			}),
		}),
		getAllAppointments: builder.query({
			query: () => ({
				url: `${USERS_URL}/appointments/all`,
				method: "GET",
			}),
		}),
		logoutUser: builder.mutation({
			query: () => ({
				url: `${USERS_URL}/logout`,
				method: "POST",
			}),
		}),
		updateAppointmentStatus: builder.mutation({
			query: (data) => {
				return {
					url: `${USERS_URL}/appointments`,
					method: "POST",
					body: data,
				};
			},
		}),
		editAppointment: builder.mutation({
			query: (data) => {
				return {
					url: `${USERS_URL}/appointments`,
					method: "PUT",
					body: data,
				};
			},
		}),
		setAppointment: builder.mutation({
			query: (data) => {
				return {
					url: `${USERS_URL}/appointments/book`,
					method: "POST",
					body: data,
				};
			},
		}),
		doctorAppointments: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/appointments/doctor`,
				method: "POST",
				body: data,
			}),
		}),
		updateHealthMetrices: builder.mutation({
			query: (data) => ({
				url: `${USERS_URL}/metrics`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const {
	useUserLoginMutation,
	useUserSignupMutation,
	useGetUserInfoQuery,
	useGetPersonalHeathQuery,
	useGetAppointmentsQuery,
	useLogoutUserMutation,
	useUpdateAppointmentStatusMutation,
	useUpdateUserInfoMutation,
	useSetAppointmentMutation,
	useEditAppointmentMutation,
	useDoctorAppointmentsMutation,
	useGetAllAppointmentsQuery,
	useUpdateHealthMetricesMutation,
} = usersApiSlice;

// Create our own endpoints in this file and it will inject them into the endpoints in the apiSlice file
// in our form, we just need to dispatch the login action and it will do the work

// Mutation is a specific type of state update operation that modifies the state in a Redux store
// slice is used for grouping
