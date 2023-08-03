import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({baseUrl: 'http://localhost:8080'});

export const apiSlice = createApi({
    baseQuery,
    tagTypes: ['User'], // used for caching instead of fetching everytime from database
    endpoints: (builder) => ({}),

})