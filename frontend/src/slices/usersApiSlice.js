// contains all of the endpoints to work with the backend

import { apiSlice } from "./apiSlice";

const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        login: builder.mutation({
            query: data => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data 
            })
        }),
        getUserInfo: builder.query({
            query: () => ({
                url: `${USERS_URL}/profile`,
                method: 'GET',
            })
        }),
    })
});

export const {
    useLoginMutation,
    useGetUserInfoQuery // Add this line to export the hook for the new GET endpoint
} = usersApiSlice;

// Create our own endpoints in this file and it will inject them into the endpoints in the apiSlice file
// in our form, we just need to dispatch the login action and it will do the work











// Mutation is a specific type of state update operation that modifies the state in a Redux store