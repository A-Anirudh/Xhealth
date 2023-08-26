import { apiSlice } from "./apiSlice";

const HR_URL = "/api/users/healthRecords";

export const healthRecordSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getHealthRecords: builder.mutation({
            query: (data) => ({
                url: `${HR_URL}/getAll`,
                method: 'POST',
                body:data
            })
        }),
        addHealthRecord: builder.mutation({
            query: (data) => ({
                url: `${HR_URL}`,
                method: 'POST',
                body: data
            })
        }),
    })
})

export const { useGetHealthRecordsMutation, useAddHealthRecordMutation } = healthRecordSlice;