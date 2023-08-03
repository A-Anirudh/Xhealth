import { apiSlice } from './apiSlice.js';

const DOCTOR_URL = '/api/doctors'

export const doctorApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        doctorLogin: builder.mutation({
            query: data => ({
                url: `${DOCTOR_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        doctorRegister: builder.mutation({
            query: data => ({
                url: `${DOCTOR_URL}`,
                method: 'POST',
                body: data
            })
        }),
        useDoctorInfo: builder.query({
            query: () => ({
                url: `${DOCTOR_URL}/profile`,
                method: 'GET'
            })
        })
    })
})

export const {
    useDoctorLoginMutation,
    useDoctorInfoQuery
} = doctorApiSlice;