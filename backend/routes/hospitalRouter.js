import express from "express";
import { registerHospital, logoutHospital, hospitalAuth } from "../controllers/hospitalController.js";

const hospitalRouter = express.Router();

hospitalRouter.post('/', registerHospital);
hospitalRouter.post('/auth', hospitalAuth);
hospitalRouter.post('/logout', logoutHospital);

export default hospitalRouter;
