// Following functions are needed
// 1. Book Apointment
// 2. Edit booked appointment
// 3. Delete or Cancel appointment
// 4. View appointment detail
// 5. View all my appointments

import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

// @Desc: book an appointment for a doctor
// route: POST /api/appointment/book
// access : private

const bookAppointment = asyncHandler(async (req,res) => {
    const {userId, doctorId, appointmentDate, startTime, reason, status} = req.body;
    // console.log(doctorId)
    const doc = await Doctor.findOne({_id:doctorId})
    // console.log(doc)
    const allAptOfDoc = await Appointment.find({doctor:doc._id})
    console.log(allAptOfDoc);
    if(startTime>workingHourStart || startTime<){
        res.status(400)
        throw new Error("Doctor not available!")
    }

})

export {bookAppointment};

