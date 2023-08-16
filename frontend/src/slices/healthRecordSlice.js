import { apiSlice } from "./apiSlice";

const HR_URL = "/api/users/healthRecords/";

export const healthRecordSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getHealthRecords: builder.query({
            query: () => ({
                url: `${HR_URL}`,
                method: 'GET'
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

export const { useGetHealthRecordsQuery, useAddHealthRecordMutation } = healthRecordSlice;