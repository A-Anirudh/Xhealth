import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    user :{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'
    },
    appointmentDate: { type: Date, required: true },
    startTime: { type: String, required: true }, 
    reason: { type: String, required: true },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled', 'In Progress'], default: 'Scheduled' },

},{timestamps:true})


const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;