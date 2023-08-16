import mongoose from "mongoose";

const appointmentSchema = mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Doctor'
    },
    appointmentDate: { type: String, required: true },
    appointmentStartTime: { type: String, required: true }, 
    reason: { type: String, required: true },
    status: { type: String, enum: ['Scheduled', 'Completed', 'Cancelled', 'In Progress', 'Expired'], default: 'Scheduled' },

},{timestamps:true})


const Appointment = mongoose.model('Appointment', appointmentSchema);
export default Appointment;