import express from "express"
import {androidProtect, protect}  from "../middleware/authMiddleware.js"
import { getAllHealthRecords, getHealthRecordSpecific, newHealthRecord,getAllHealthRecordsAndroid } from "../controllers/healthRecordController.js";
import { getUserProfile } from "../controllers/userController.js";

const healthRecordsRouter=express.Router()
   //to get health records associated with a particular doctor

   
healthRecordsRouter.route("/android/all").get(androidProtect,getAllHealthRecordsAndroid)
healthRecordsRouter.route("/android/user").get(androidProtect,getUserProfile)

healthRecordsRouter.get('/doctor',(protect,getHealthRecordSpecific))   
healthRecordsRouter.route("/").get(protect,getAllHealthRecords).post(protect,newHealthRecord)   



//Dynamic access to doctors 
//TODO: implement new protect as user may add doctors to allow permission to see their health records



export default healthRecordsRouter;