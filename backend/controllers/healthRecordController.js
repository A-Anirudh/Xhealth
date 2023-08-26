import asyncHandler from "express-async-handler"
import healthRecordModel from "../models/healthRecordModel.js";
import User from "../models/userModel.js";


async function getHealthRecordInstance(email) {
    if (email) {
        const userHealthRecord = await healthRecordModel.findOne({ email: email })
        return userHealthRecord;
    } else {
        res.status(400)
        throw new Error("Email not found")
    }
}


//endpoint:  GET - /api/users/healthRecords/
// {
//     email:"me@example.com",
// }


const getAllHealthRecords = asyncHandler(async (req, res) => {
    const { email } = req.body
    const user = await User.findOne({ email: email })

    if (req.user) {

        const userHR = await getHealthRecordInstance(email);
        if (userHR) {
            res.status(200).json(userHR);
        } else {
            res.status(404).json({ message: "No health record found for user " + email })
        }

    } else if (req.doctor) {
        if (user.permissionCheck.includes(req.doctor._id)) {
            const userHR = await getHealthRecordInstance(email);
            if (userHR) {
                res.status(200).json(userHR);
            } else {
                res.status(404).json({ message: "No health record found for user " + email })
            }
        } else {
            res.status(400)
            throw new Error("Doctor does not have access to this patients health record")
        }
    } else {
        res.status(400)
        throw new Error("Permision denied")
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
    // console.log(req.body.record)
    if (userHR) {
        try {
            if (req.body.record) {


                const newRecord = req.body.record;

                // TODO// newRecord.appointmentId=await Appointment.findOne({userId:ObjectId('64be4f42a61f3e7c8f021edf'),doctorId:ObjectId('64bd9629b4d628dc3bdc744f')})         //there is a problem in here
                //push newRecord to history (because its gonna be with our software >_<)
                userHR.history.push(newRecord);
                userHR.save();
                res.status(200).json({ "message": "Success" })
            } else {
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


const storeDocument=(req,res)=>{
    const {documentBase64,key}=req.body;
        // console.log(documentBase64);
        console.log(key)
            var params = {
                Body: documentBase64.toString(),
                Bucket: "cloud-object-storage-cos-standard-wwf", 
                Key: key
            };
            cos.putObject(params, function(err, data) {
                if (err) {
                    console.log(err, err.stack); 
                    res.status(401).json({status:"error",error:err,message:err.stack})
                }          // an error occurred
                else{     
                    console.log(data); 
                    res.status(200).json({status:"success",data})
                }          // successful response
            });            
}


const getDocument=(req,res)=>{
    cos.getObject({Key:req.params.keyId,Bucket:"cloud-object-storage-cos-standard-wwf"})
    .on('complete',(response)=>{
        // Get the base64 encoded PDF from your server
        pdfBase64="non"
        if(response.data.Body)
        
        var pdfBase64 = response.data.Body?.toString();
        
        // Set the content type and send the base64 encoded PDF as the response body
        res.setHeader('Content-Type', 'application/pdf');
        res.send(Buffer.from(pdfBase64, 'base64'));
    }).on('error',(error)=>{
        res.status(404).json(error)
    })
    .send()
}


export { getHealthRecordSpecific, getAllHealthRecords, newHealthRecord, getAllHealthRecordsAndroid,storeDocument,getDocument };