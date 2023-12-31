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
import { convertTimeToMinutes } from "../utils/timeToMinutes.js";


// @Desc: book an appointment for a doctor
// route: POST /api/users/appointments/book
// access : private

const bookAppointment = asyncHandler(async (req, res) => {

    const { doctorId, appointmentDate, appointmentStartTime, reason, status } = req.body;
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    console.log(dateRegex.test(appointmentDate))
    if (dateRegex.test(appointmentDate)){
        try {
            const doc = await Doctor.findOne({ _id: doctorId })
            const user = await User.findOne({ _id: req.user._id })

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
            const d = new Date(year, month - 1, date, hour, min)
            if (d < new Date()) {
                res.status(400)
                throw new Error("Appointment date cannot be before todays date!")
            }
    
            // ? Check if doctor is free or has an appointment
            // console.log(doc)
            checkDocAvailability(doc, d, res)
            // ? Check if user has another appointment at that time
            // console.log(user.userTimeSlot)
            checkUserAvailability(user, d, res)
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
            user.permissionCheck.push(doc._id);
            await user.save()
            await doc.save()
            await newAppointment.save();
    
            res.status(201).json({ message: "Appointment booked successfully.", appointment: newAppointment });
    
        } catch (error) {
            res.status(res.statusCode === 200 ? 500 : res.statusCode); // Preserve existing status code if it's not an HTTP error
            throw new Error(error.message || "An error occurred while booking the appointment.");
        }
    
    } else{
        res.status(400)
        throw new Error("Invalid date")
    }
});



// @desc : View all my appointments
// route : GET /api/users/appointments
// route : GET /api/users/appointments/android
// Access : private
const viewAllMyAppointments = asyncHandler(async (req, res) => {
    const appointments = await Appointment.find({ userId: req.user._id })
    const sortedAppointments = appointments.sort((a, b) => new Date(a.appointmentDate) - new Date(b.appointmentDate))
    res.status(200).json(sortedAppointments)
})

const allAppointments = asyncHandler(async (req,res)=>{
    const allAppointments = await Appointment.find({})
    const users_array = []
    for(let i=0;i<allAppointments.length;i++){
        let user = await User.findOne({ _id: allAppointments[i].userId })
                .select("-password");
            users_array.push({id:user._id,name:`${user.firstName} ${user.lastName}`})
            
    }
    console.log("uar",(users_array))
    res.status(200).json({"apt_data":allAppointments,"user_data":users_array})
    
})

// @desc Update appointment status
// route : POST /api/users/appointments
// Access : private
const changeAppointmentStatus = asyncHandler(async (req, res) => {
    const { newStatus } = req.body;
    console.log("new status",req.body._id)
    try {
        const updatedAppointmentStatus = await Appointment.findOne({ _id: req.body._id })
        // console.log(`date to be cancelled is ${updatedAppointmentStatus.appointmentDate}`)
        if (updatedAppointmentStatus === null) {
            res.status(400)
            throw new Error("Appointment does not exist for the user")
        }
        if (updatedAppointmentStatus.status === 'Cancelled' && newStatus === 'Cancelled') {
            res.status(200)
            throw new Error("Appointment already cancelled!");
        }
        updatedAppointmentStatus.status = newStatus;
        /*
        ? Changing format of date and time
        const [year, month, date] = updatedAppointmentStatus.appointmentDate.split('-')
        const [hour, min] = updatedAppointmentStatus.appointmentStartTime.split(":")
        console.log(year, month, date, hour, min);
        const d = new Date(year, month, date, hour, min);*/
        // ? Removing time slot from doctor array

        const doc = await Doctor.findOne({ _id: updatedAppointmentStatus.doctorId })
        // console.log(`doc is ${doc}`)

        removeDocArray(doc, updatedAppointmentStatus.appointmentDate);

        //   Removing from user array
        const user = await User.findOne({ _id: updatedAppointmentStatus.userId });
        // console.log(`user is ${user}`)
        removeUserArray(user, updatedAppointmentStatus.appointmentDate);
        const index = user.permissionCheck.indexOf(doc._id)
        if (newStatus != 'In Progress') {
            if (index > -1) {
                user.permissionCheck.splice(index, 1)
            }
        }

        await doc.save()
        await user.save()

        await updatedAppointmentStatus.save();
        res.status(200).json({
            updatedAppointmentStatus,
            message: "Appointment cancelled successfully"
        });
    } catch (error) {
        res.status(res.statusCode === 200 ? 500 : res.statusCode); // Preserve existing status code if it's not an HTTP error
        throw new Error(error.message || "An error occurred while cancelling the appointment. Please try again later");
    }
})

/**
 * @desc : edit appointment
 * @Route : PUT /api/users/appointment
 * @access : private
 * @body
   ->  `aptId` ID of appointment to edit - `Required`      
   ->  `newDoctorId` Id of new doctor   
   ->  `newAppointmentDate` new Appointment Date  
   ->  `new AppointmentTime` new Appointment Time        
   -> Condition assumed is             
- doctorId may or maynot change
- If `newAppointmentDate`, there will be change in time as well and you should send in `Date.toString()` format only to all functions
- If `newAppointmentTime` is being posted, date is not changing
 */


const editAppointment = asyncHandler(async (req, res) => {
    const { aptId, newDoctorId, newAppointmentDate, newAppointmentTime } = req.body
    const apt = await Appointment.findById(aptId);
    const newDoc = await Doctor.findById(newDoctorId);
    const currentUser = await User.findById(req.user._id);
    // TODO : Check all the code and functions below again!

    if(apt.status === 'Scheduled'){
        if (apt) {
            const [hour, min] = newAppointmentTime.split(":")
            const year = new Date(newAppointmentDate).getFullYear();
            const month = new Date(newAppointmentDate).getMonth();
            const date = new Date(newAppointmentDate).getDate();
            const newD = new Date(year, month, date, hour, min)
            checkUserAvailability(currentUser, newD, res)
            checkDocAvailability(newDoc, newD, res);
            removeUserArray(currentUser, apt.appointmentDate);
            addUserArray(currentUser, newD.toString())
            removeDocArray(newDoc, apt.appointmentDate)
            addDocArray(newDoc, newD.toString());
            apt.doctorId = newDoctorId || apt.doctorId
            apt.appointmentDate = newD.toString() || apt.appointmentDate;
            apt.appointmentStartTime = newAppointmentTime || apt.appointmentStartTime;
            newDoc.save();
            apt.save();
            currentUser.save();
        }
        res.status(200).json("Appointment updates successfully")
    } else{
        res.status(400)
        throw new Error("Appointment completed! Cannot update now!")
    }
})

const getAppointmentDetailBasedOnDoctor = asyncHandler(async (req, res) => {
    const doctorId = req.doctor;
    const postDoctorId  = req.body._id;
    if (postDoctorId){
        const apts = await Appointment.find({ doctorId: postDoctorId, status:'Scheduled' });
        const users_array = []
        for (let i = 0; i < apts.length; i++) {
            let user = await User.findOne({ _id: apts[i].userId })
                .select("-password");
            users_array.push(user)
        }
    
        if (apts) {
            res.status(200).json({ apts, users_array })
        } else {
            res.status(400)
            throw new Error("appointment not found")
        }
    

    } else if(doctorId){
        const startDate = new Date()
        const endDate = new Date()
        startDate.setHours(0,0,0,0);
        endDate.setHours(23,59,59,999);

        const apts = await Appointment.find({ doctorId: doctorId._id, status:'Scheduled', appointmentDate: {
            $gte:startDate,
            $lt:endDate
        } });
        const users_array = []
        for (let i = 0; i < apts.length; i++) {
            let user = await User.findOne({ _id: apts[i].userId })
                .select("-password");
            users_array.push(user)
        }
    
        if (apts) {
            res.status(200).json({ apts, users_array })
        } else {
            res.status(400)
            throw new Error("appointment not found")
        }
    } else{
        res.status(400)
        throw new Error("No doctor found")
    }

});

export { bookAppointment, viewAllMyAppointments,allAppointments, changeAppointmentStatus, editAppointment, getAppointmentDetailBasedOnDoctor };
