// Following functions are needed
// 1. Book Apointment - Done
// 2. View all my appointments - Done
// 3. Delete or Cancel appointment - Done
// 4. Edit booked appointment

import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";

// @Desc: book an appointment for a doctor
// route: POST /api/users/appointments/book
// access : private

const bookAppointment = asyncHandler(async (req,res) => {
    const {doctorId, appointmentDate, appointmentStartTime, reason, status} = req.body;
    // console.log(doctorId)
    try{
        const doc = await Doctor.findOne({_id:doctorId})
        // console.log(doc)
        const allAptOfDoc = await Appointment.find({doctor:doc._id})
        // console.log(allAptOfDoc);
        // Function to convert time in "HH:mm" format to minutes since midnight
        const convertTimeToMinutes = (time) => {
            const [hours, minutes] = time.split(":");
            return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
        };
        const convertedAppointmentStartTime = convertTimeToMinutes(appointmentStartTime);
        const convertedWorkingHourStart = convertTimeToMinutes(doc.workingHourStart);
        const convertedWorkingHourEnd = convertTimeToMinutes(doc.workingHourEnd);
    // Checking if appointment time is within working hours of doctor
        if(convertedAppointmentStartTime<convertedWorkingHourStart || convertedAppointmentStartTime>convertedWorkingHourEnd){
            res.status(400)
            throw new Error("Doctor not available!")
        }
        // Format of date from input
        const [year, month, date] = appointmentDate.split('-')
        const [hour, min] =  appointmentStartTime.split(':')
        const d = new Date(year, month, date, hour, min)

        // Check if doctor is free or has an appointment
        console.log(doc)
        console.log(d.toString())
        
        if(doc.timeSlotsBooked.includes(d.toString())){
            res.status(400)
            throw new Error("Slot not available")
        }
            // Step 3: Book a New Appointment
    const newAppointment = new Appointment({
        userId: req.user._id,
        doctorId: doctorId,
        appointmentDate: new Date(appointmentDate),
        appointmentStartTime: appointmentStartTime,
        reason: reason,
        status: status || "Scheduled",
      });

    //   Add time to doctor time slots
      console.log(doc.timeSlotsBooked)

      doc.timeSlotsBooked.push(d.toString());
      await doc.save();  
      await newAppointment.save();
  
      res.status(201).json({ message: "Appointment booked successfully.", appointment: newAppointment });
  
    }  catch (error) {
        res.status(res.statusCode === 200 ? 500 : res.statusCode); // Preserve existing status code if it's not an HTTP error
        throw new Error(error.message || "An error occurred while booking the appointment.");
      }
});

// @desc : View all my appointments
// route : GET /api/users/appointments
// Access : private
const viewAllMyAppointments = asyncHandler(async (req,res)=>{
    const appointments = await Appointment.find({userId:req.user._id})
    res.status(200).json(appointments)
})

// @desc delete appointment
// route : POST /api/users/appointment/:id
// Access : private
const deleteAppointments = asyncHandler(async (req, res)=>{
    console.log(req.user)
    try{
        const deletedAppointments = await Appointment.findOne({_id:req.body._id, userId : req.user._id})
        if(deletedAppointments === null){
            res.status(400)
            throw new Error("Appointment does not exist for the user")
        }
        deletedAppointments.status = 'Cancelled';

        // Removing time slot from doctor array
        const doc = await Doctor.findOne({_id :deletedAppointments.doctorId})
        console.log(doc)
        const index = doc.timeSlotsBooked.indexOf(deletedAppointments.appointmentStartTime)
        if (index > -1) { // only splice array when item is found
            doc.timeSlotsBooked.splice(index, 1); // 2nd parameter means remove one item only
          }
        await doc.save()
        await deletedAppointments.save()
        res.status(200).json({
            deletedAppointments,
            message:"Appointment cancelled successfully"
        });
    } catch (error) {
        res.status(res.statusCode === 200 ? 500 : res.statusCode); // Preserve existing status code if it's not an HTTP error
        throw new Error(error.message || "An error occurred while cancelling the appointment. Please try again later");
      }
})

// @desc : edit appointment
// Route : PUT /api/users/appointment
// access : private
const editAppointment = asyncHandler(async  (req, res)=>{
    const apt = await Appointment.findById(req.body._id)
    const doc = await Doctor.findById(apt.doctorId)
    if (apt){
        apt.appointmentDate = req.body.doctorId || apt.doctorId
        if(req.body.appointmentStartTime){

        }

    }
})
export {bookAppointment,viewAllMyAppointments,deleteAppointments};

