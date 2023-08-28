

import { apiSlice } from './apiSlice.js';

const HOSPITAL_URL = '/api/hospitals'

export const hospitalApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        hospitalLogin: builder.mutation({
            query: data => ({
                url: `${HOSPITAL_URL}/auth`,
                method: 'POST',
                body: data
            }),
        }),
        hospitalRegister: builder.mutation({
            query: data => ({
                url: `${HOSPITAL_URL}`,
                method: 'POST',
                body: data
            })
        }),
        hospitalLogout: builder.mutation({
            query: data => ({
                url: `${HOSPITAL_URL}/logout`,
                method: 'POST',
            })
        })
    })
})

export const {
    useHospitalLoginMutation,
    useHospitalLogoutMutation,
    useHospitalRegisterMutation
} = hospitalApiSlice;