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
        uploadPdf: builder.mutation({
            query: (data) => ({
                url: `${HR_URL}/addPdf`,
                method: 'POST',
                body:data,
                headers: {"Content-type": "application/json; charset=UTF-8"}      
            })
        }),
    })
})

export const { useGetHealthRecordsMutation, useAddHealthRecordMutation,useUploadPdfMutation } = healthRecordSlice;