import express from "express"
import {protect}  from "../middleware/authMiddleware.js"
import { getAllHealthRecords, getHealthRecordSpecific, newHealthRecord } from "../controllers/healthRecordController.js";

const healthRecordsRouter=express.Router()
   //to get health records associated with a particular doctor


healthRecordsRouter.route("/").get(protect,getAllHealthRecords).post(protect,newHealthRecord)   

healthRecordsRouter.get('/doctor',(protect,getHealthRecordSpecific))   


//Dynamic access to doctors 
//TODO: implement new protect as user may add doctors to allow permission to see their health records



export default healthRecordsRouter;