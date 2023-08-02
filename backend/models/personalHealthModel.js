import mongoose from "mongoose";

const personalHealthSchema = mongoose.Schema({
    userId :{
        type: mongoose.Schema.Types.ObjectId, ref: 'User'
    },
    heartRate: { type: String, required: true },
    bloodPressure: { type: String, required: true }, 
    glucose: { type: String, required: true },
    weight: { type: String, required:true}, // In kg
    height:{type:String, required:true}, // in cm
    bmi:{type:String,required:true},
    asOnDate:{type:String,required:true, default: new Date(Date.now()).toString()}
},{timestamps:true})


const personalHealth = mongoose.model('personalHealth', personalHealthSchema);
export default personalHealth;