import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    appointments: [],
    userInfo: {},
    healthMetrices: [],
}

const userSlice = createSlice({
    name: "userData",
    initialState,
    reducers: {
        setAppointments: ""
    }
})