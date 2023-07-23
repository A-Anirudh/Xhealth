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
    const {userId, doctorId, appointmentDate, appointmentStartTime, reason, status} = req.body;
    // console.log(doctorId)
    try{
        const doc = await Doctor.findOne({_id:doctorId})
        // console.log(doc)
        const allAptOfDoc = await Appointment.find({doctor:doc._id})
        console.log(allAptOfDoc);
        // Function to convert time in "HH:mm" format to minutes since midnight
        const convertTimeToMinutes = (time) => {
            const [hours, minutes] = time.split(":");
            return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
        };
        const convertedAppointmentStartTime = convertTimeToMinutes(appointmentStartTime);
        const convertedWorkingHourStart = convertTimeToMinutes(doc.workingHourStart);
        const convertedWorkingHourEnd = convertTimeToMinutes(doc.workingHourEnd);
        if(convertedAppointmentStartTime<convertedWorkingHourStart || convertedAppointmentStartTime>convertedWorkingHourEnd){
            res.status(400)
            throw new Error("Doctor not available!")
        }
        // Need to check if starTime is present in bookedTimeSlots of a doctor. Doctor's bookedTimeSlots should be reset everyday
        console.log(doc)
        if(doc.timeSlotsBooked.includes(appointmentStartTime)){
            res.status(400)
            throw new Error("Choose another time")
        }
            // Step 3: Book a New Appointment
    const newAppointment = new Appointment({
        userId: userId,
        doctorId: doctorId,
        appointmentDate: new Date(appointmentDate),
        appointmentStartTime: appointmentStartTime,
        reason: reason,
        status: status || "Scheduled",
      });
      console.log(doc.timeSlotsBooked)
      doc.timeSlotsBooked.push(appointmentStartTime);
      await doc.save();
    
  
      await newAppointment.save();
  
      res.status(201).json({ message: "Appointment booked successfully.", appointment: newAppointment });
  
    }  catch (error) {
        res.status(res.statusCode === 200 ? 500 : res.statusCode); // Preserve existing status code if it's not an HTTP error
        throw new Error(error.message || "An error occurred while booking the appointment.");
      }



});

export {bookAppointment};

