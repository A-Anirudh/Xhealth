// Following functions are needed
// 1. Book Apointment - Done
// 2. View all my appointments - Done
// 3. Delete or Cancel appointment - Done
// 4. Edit booked appointment

import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import Doctor from "../models/doctorModel.js";
import Appointment from "../models/appointmentModel.js";
import { checkDocAvailability, checkUserAvailability } from "../utils/checkAvail.js";
import { addDocArray, addUserArray, removeDocArray, removeUserArray } from "../utils/slotArrayHandler.js";

// @Desc: book an appointment for a doctor
// route: POST /api/users/appointments/book
// access : private

const bookAppointment = asyncHandler(async (req, res) => {
    const { doctorId, appointmentDate, appointmentStartTime, reason, status } = req.body;
    // console.log(doctorId)
    try {
        const doc = await Doctor.findOne({ _id: doctorId })
        const user = await User.findOne({ _id: req.user._id })
        // console.log(doc)
        const allAptOfDoc = await Appointment.find({ doctor: doc._id })
        // console.log(allAptOfDoc);
        // ? Function to convert time in "HH:mm" format to minutes since midnight
        const convertTimeToMinutes = (time) => {
            const [hours, minutes] = time.split(":");
            return parseInt(hours, 10) * 60 + parseInt(minutes, 10);
        };
        const convertedAppointmentStartTime = convertTimeToMinutes(appointmentStartTime);
        const convertedWorkingHourStart = convertTimeToMinutes(doc.workingHourStart);
        const convertedWorkingHourEnd = convertTimeToMinutes(doc.workingHourEnd);
        // Checking if appointment time is within working hours of doctor
        if (convertedAppointmentStartTime < convertedWorkingHourStart || convertedAppointmentStartTime > convertedWorkingHourEnd) {
            res.status(400)
            throw new Error("Doctor not available!")
        }
        // Format of date from input
        const [year, month, date] = appointmentDate.split('-')
        const [hour, min] = appointmentStartTime.split(':')
        console.log(hour, min)
        const d = new Date(year, month-1, date, hour, min)
        console.log(d)

        // ? Check if doctor is free or has an appointment
        // console.log(doc)
        console.log(d.toString())
        checkDocAvailability(doc, d)
        // ? Check if user has another appointment at that time
        // console.log(user.userTimeSlot)
        checkUserAvailability(user, d)
        // * Step 3: Book a New Appointment
        const newAppointment = new Appointment({
            userId: req.user._id,
            doctorId: doctorId,
            appointmentDate: d.toString(),
            appointmentStartTime: appointmentStartTime,
            reason: reason,
            status: status || "Scheduled",
        });

        //  ? Add time to doctor time slots
        //   console.log(doc.timeSlotsBooked)
        //  TODO: Add the functions and remove the below 2 lines

        addDocArray(doc, d);
        addUserArray(user, d);
        await doc.save();
        await newAppointment.save();
        await user.save()

        res.status(201).json({ message: "Appointment booked successfully.", appointment: newAppointment });

    } catch (error) {
        res.status(res.statusCode === 200 ? 500 : res.statusCode); // Preserve existing status code if it's not an HTTP error
        throw new Error(error.message || "An error occurred while booking the appointment.");
    }
});


// @desc : View all my appointments
// route : GET /api/users/appointments
// Access : private
const viewAllMyAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ userId: req.user._id })
    res.status(200).json(appointments)
})

// @desc delete appointment
// route : POST /api/users/appointments
// Access : private
const deleteAppointments = asyncHandler(async (req, res) => {
    // console.log(req.user)
    try {
        const deletedAppointments = await Appointment.findOne({ _id: req.body._id, userId: req.user._id })
        console.log(`date to be cancelled is ${deletedAppointments.appointmentDate}`)
        if (deletedAppointments === null) {
            res.status(400)
            throw new Error("Appointment does not exist for the user")
        }
        if(deletedAppointments.status === 'Cancelled'){
            res.status(200)
            throw new Error("Appointment already cancelled!");
            
        }
        deletedAppointments.status = 'Cancelled';
        /*
        ? Changing format of date and time
        const [year, month, date] = deletedAppointments.appointmentDate.split('-')
        const [hour, min] = deletedAppointments.appointmentStartTime.split(":")
        console.log(year, month, date, hour, min);
        const d = new Date(year, month, date, hour, min);*/
        // ? Removing time slot from doctor array
    
        const doc = await Doctor.findOne({ _id: deletedAppointments.doctorId })
        // console.log(`doc is ${doc}`)

        removeDocArray(doc, deletedAppointments);

        //   Removing from user array
        const user = await User.findOne({ _id: req.user._id });
        // console.log(`user is ${user}`)

        removeUserArray(user, deletedAppointments);

        await doc.save();
        await user.save();
        await deletedAppointments.save();
        res.status(200).json({
            deletedAppointments,
            message: "Appointment cancelled successfully"
        });
    } catch (error) {
        res.status(res.statusCode === 200 ? 500 : res.statusCode); // Preserve existing status code if it's not an HTTP error
        throw new Error(error.message || "An error occurred while cancelling the appointment. Please try again later");
    }
})

// @desc : edit appointment
// Route : PUT /api/users/appointment
// access : private
const editAppointment = asyncHandler(async (req, res) => {
    const apt = await Appointment.findById(req.body._id)
    const doc = await Doctor.findById(apt.doctorId)
    if (apt) {
        apt.doctorId = req.body.doctorId || apt.doctorId
        if (req.body.appointmentStartTime) {
            // TODO: EDIT feature: doctor, date and time can only be edited.
            // ? Change doctorList and userList for timings and date as well.. Hardwork needs to be done.
        }

    }
    console.log('asdf')
})

export { bookAppointment, viewAllMyAppointments, deleteAppointments };