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
        getDoctorInfo: builder.query({
            query: () => ({
                url: `${DOCTOR_URL}/profile`,
                method: 'GET'
            })
        }),
        getAllDoctors: builder.query({
            query: () => ({
                url: `${DOCTOR_URL}/all`,
                method: 'GET'
            })
        }),
        updateDoctorInfo: builder.mutation({
            query: data => ({
                url: `${DOCTOR_URL}/profile`,
                method: 'PUT',
                body: data
            })
        }),
        getDoctorApt: builder.query({
            query: () => ({
                url: `/api/users/appointments/doctor`,
                method: 'POST',
                
            })
        }),
        logoutDoctor: builder.mutation({
            query: () => ({
                url: `${DOCTOR_URL}/logout`,
                method: 'POST'
            })
        }),
        changeAptStatus: builder.mutation({
            query: (data) => ({
                url: `/api/users/appointments`,
                method: 'POST',
                body:data
            })
        }),

    })
})

export const {
    useDoctorLoginMutation,
    useLogoutDoctorMutation,
    useGetAllDoctorsQuery,
    useDoctorRegisterMutation,
    useGetDoctorInfoQuery,//profile
    useUpdateDoctorInfoMutation,//update
    useGetDoctorAptQuery,
    useChangeAptStatusMutation,
} = doctorApiSlice;