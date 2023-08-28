import express from "express";

import { androidProtect, protect } from "../middleware/authMiddleware.js";
import { bookAppointment, viewAllMyAppointments, changeAppointmentStatus, editAppointment, getAppointmentDetailBasedOnDoctor, allAppointments } from "../controllers/appointmentController.js";


const appointmentRouter = express.Router();

appointmentRouter.post('/book', protect, bookAppointment);
appointmentRouter.route('/android').get(androidProtect, viewAllMyAppointments)
appointmentRouter.route('/').post(protect, changeAppointmentStatus).get(protect, viewAllMyAppointments).put(protect, editAppointment);
appointmentRouter.post('/doctor', protect, getAppointmentDetailBasedOnDoctor)
appointmentRouter.get('/all',protect,allAppointments)


export default appointmentRouter;