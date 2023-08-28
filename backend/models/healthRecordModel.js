import mongoose, { Schema } from "mongoose";

const healthRecords=new Schema({
    email:String,
    history:[{    
        doctorId:String,
        appointmentId:{
            type: mongoose.Schema.Types.ObjectId, ref: 'Appointment'
        },
        diagnoses:{ 
            data:String,
            problems:[String]
        },
        medications:{    
            startDate:Date,
            endDate:Date,
            allMeds:[{    
                name:String,
                dosage:Number, //in milligrams per one time
                perDay:Number,
                gap:Number,  //gap between days 
                timings:[String]
            }]
        },
        immunizations:[{
            name: String,
            dosage: Number
        }],
        scans:[{
            name:String,
            pdfLink:String,
            typeOf:String
        }],
        time:String,
    }]
})




const healthRecordModel=mongoose.model('healthRecord',healthRecords)

export default healthRecordModel;

