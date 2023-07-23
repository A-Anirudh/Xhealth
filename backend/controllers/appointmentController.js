// Following functions are needed
// 1. Book Apointment
// 2. Edit booked appointment
// 3. Delete or Cancel appointment
// 4. View appointment detail
// 5. View all my appointments

import asyncHandler from "express-async-handler";
import User from "../models/userModel";
import Doctor from "../models/doctorModel";
import Appointment from "../models/appointmentModel";

// @Desc: book an appointment for a doctor
// route: POST /api/appointment/book
// access : private

const bookApt = asyncHandler(async (req,res) => {
    const {user, doctor, appointmentDate, startTime, reason, status} = req.body;
    const doc = await Doctor.findOne({email:doctor.email})
    if(startTime>workingHourStart){
        res.status()
    }
    console.log(doc)
    
})  