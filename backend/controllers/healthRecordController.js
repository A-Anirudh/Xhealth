import asyncHandler from "express-async-handler"
import healthRecordModel from "../models/healthRecordModel.js";
import Appointment from "../models/appointmentModel.js"


async function getHealthRecordInstance(email) {
    const userHealthRecord = await healthRecordModel.findOne({ email: email })
    return userHealthRecord;
}


//endpoint:  GET - /api/users/healthRecords/
// {
//     email:"me@example.com",
// }


const getAllHealthRecords = asyncHandler(async (req, res) => {
    const { email } = req.body
    const userHR = await getHealthRecordInstance(email);
    if (userHR) {
        res.status(200).json(userHR);
    } else {
        res.status(404).json({ message: "No health record found for user " + email })
    }
});


const getAllHealthRecordsAndroid = asyncHandler(async (req, res) => {
    const { email } = req.headers
    const userHR = await getHealthRecordInstance(email);
    if (userHR) {
        res.status(200).json(userHR);
    } else {
        res.status(404).json({ message: "No health record found for user " + email })
    }
});



// endpoint:  POST - /api/users/healthRecords/
// EXAMPLE REQUEST FOR ADDING HEALTH RECORDS
// {   
//     "email":"emailToIdentifyPotentialDataLeaks53",
//     "record":{  
//         "doctorId":"String",
//         "diagnoses":{ 
//             "data":"good looking people's(money)",
//             "problems":["String","fs","fsd"]
//         },
//         "medications":{    
//             "startDate":"5/3/2015",
//             "endDate":"5/3/2015",
//             "allMeds":[{    
//                 "name":"String",
//                 "dosage":2, //in milligrams per one time
//                 "perDay":3,
//             "gap":0,  //gap between days 
//                 "timings":[9,14,17]
//             },{    
//                 "name":"new med",
//                 "dosage":4, //in milligrams per one time
//                 "perDay":2,
//                 "gap":0,  //gap between days 
//                 "timings":[9,17]
//             }]
//         },
//         "immunizations":[{"name":"fdsf","dosage":3},{"name":"gegef","dosage":5}],
//         "scans":[{
//             "name":"String",
//             "pdfLink":"String",
//             "typeOf":"scanIg"
//         }]
//     }
// }   



const newHealthRecord = asyncHandler(async (req, res) => {
    var userHR = await getHealthRecordInstance(req.body.email);
    console.log(req.body.record)
    if (userHR) {
        try {
            if(req.body.record){

            
            const newRecord = req.body.record;
            // TODO// newRecord.appointmentId=await Appointment.findOne({userId:ObjectId('64be4f42a61f3e7c8f021edf'),doctorId:ObjectId('64bd9629b4d628dc3bdc744f')})         //there is a problem in here
            //push newRecord to history (because its gonna be with our software >_<)
            userHR.history.push(newRecord);
            userHR.save();
            res.status(200).json({ "message": "Success" })
            } else{
                res.status(400)
                throw new Error("Record needed in body")
                
            }
        } catch (err) {
            res.status(400)
            throw new Error(err.message)
        }
    } else {
        //create new record
        try {
            const obj = new healthRecordModel();
            obj.email = req.body.email;
            obj.history = [req.body.record];
            //TODO// obj.appointmentId=await Appointment.findOne({userId:ObjectId('64be4f42a61f3e7c8f021edf'),doctorId:ObjectId('64bd9629b4d628dc3bdc744f')})         //there is a problem in here
            obj.save();
            res.status(200).json({ "message": "Success" })
        } catch (err) {
            new Error(err.message)
        }
    }
});

const getHealthRecordSpecific = asyncHandler(async (req, res) => { });

export { getHealthRecordSpecific, getAllHealthRecords, newHealthRecord, getAllHealthRecordsAndroid };

