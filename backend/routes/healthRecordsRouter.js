import express from "express"
import {protect}  from "../middleware/authMiddleware.js"
import { getAllHealthRecords, getHealthRecordSpecific, newHealthRecord } from "../controllers/healthRecordController.js";

const healthRecordsRouter=express.Router()

healthRecordsRouter
.get('/doctor',(protect,getHealthRecordSpecific))     //to get health records associated with a particular doctor
.get('/getAll',(protect,getAllHealthRecords))    
//Dynamic access to doctors 
//TODO: implement new protect as user may add doctors to allow permission to see their health records
.post("/",(protect,newHealthRecord))


export default healthRecordsRouter;