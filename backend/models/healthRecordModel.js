import mongoose, { Schema } from "mongoose";

const diagnoses=new Schema({
    data:String,
    problems:[String]    //allergies ,etc
})

const medication=new Schema({
    startDate:Date,
    endDate:Date,
    allMeds:[med]
})


const med=new Schema({
    name:String,
    dosage:Number, //in milligrams per one time
    perDay:Number,
    gap:Number,  //gap between days 
    timings:[{
        time:{
            hour:Number,
            minutes:Number
        }
    }]
})



const record=new Schema({
    doctorId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Doctor"
    },
    appointmentId:{
        type:mongoose.Schema.Types.ObjectId,ref:"Appointment"
    },
    diagnoses:diagnoses,
    medications:medication,
    immunizations:[med],
    scans:[{
        name:String,
        pdfLink:String,
        type:{
            String,
            enum:["scan","report","reciept","certificate","bill"]
        }
    }],


    
})

const healthRecords=new Schema({
    userId:String,
    history:record
})

const healthRecordModel=mongoose.model('Health Record',healthRecords)

export default healthRecordModel;
