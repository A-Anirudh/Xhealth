import express from "express";
// import { authUser, registerUser, logoutUser, getUserProfile, updateUserProfile } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";
import { bookAppointment } from "../controllers/appointmentController.js";


const appointmentRouter = express.Router();

appointmentRouter.post('/book', bookAppointment);


export default appointmentRouter