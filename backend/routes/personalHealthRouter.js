import express from "express";

import { protect } from "../middleware/authMiddleware.js";
import { addMetrics, deletePersonalHealthMetric, getAllMyMetrics } from "../controllers/personalHealthController.js";


const personalHealthRouter = express.Router();

personalHealthRouter.get('/', protect, getAllMyMetrics);
personalHealthRouter.post('/',protect,addMetrics)
personalHealthRouter.delete('/',deletePersonalHealthMetric);

export default personalHealthRouter;