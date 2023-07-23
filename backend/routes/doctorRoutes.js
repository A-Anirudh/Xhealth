import express from "express";
import { authDoctor, registerDoctor, logoutDoctor, getDoctorProfile, updateDoctorProfile } from "../controllers/doctorController.js";
import { protect } from "../middleware/authMiddleware.js";


const docRouter = express.Router();

docRouter.post('/', registerDoctor);
docRouter.post('/auth', authDoctor);
docRouter.post('/logout', logoutDoctor);
docRouter.route('/profile').get(protect,getDoctorProfile).put(protect,updateDoctorProfile);

export default docRouter;
