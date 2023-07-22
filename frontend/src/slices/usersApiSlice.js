// contains all of the endpoints to work with the backend

import { apiSlice } from "./apiSlice";

const USERS_URL = 'http://localhost:8000/api/users'; //Can put this in another page if needed called constants, but for this application, we have only users. for bigger projects use a different file. It will be easier to manage

export const usersApiSlice = apiSlice.injectEndpoints({


    endpoints: (builder) => ({
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/auth`,
                method: 'POST',
                body: data 
            })
        })
    }

    
    
    
    )
}) 
// Create our own endpoints in this file and it will inject them into the endpoints in the apiSlice file
// in our form, we just need to dispatch the login action and it will do the work








export const { useLoginMutation } = usersApiSlice;


// Mutation is a specific type of state update operation that modifies the state in a Redux store