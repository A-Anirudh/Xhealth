import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { bookAppointment,viewAllMyAppointments,changeAppointmentStatus,editAppointment } from "../controllers/appointmentController.js";


const appointmentRouter = express.Router();

appointmentRouter.post('/book', protect, bookAppointment);
appointmentRouter.route('/').delete(protect,changeAppointmentStatus).get(protect, viewAllMyAppointments).put(protect,editAppointment);


export default appointmentRouter;