import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import Doctor from "./doctorModel.js";

const userSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: Doctor //Denots Doctor model
      },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    bloodGroup: {
        type: String,
        enum:[  "A+",  "A-",  "B+",  "B-",  "AB+",  "AB-",  "O+",  "O-"],
        required: true,
    },
    dateOfBirth: {
        type: Date,
        required: true,
    },
    gender: {
        type: String,
        enum: ['Male','Female'],
        required: true,
    },
    state: {
        type: String,
        enum: [  "Andaman and Nicobar Islands",  "Andhra Pradesh",  "Arunachal Pradesh",  "Assam",  "Bihar",  "Chandigarh",  "Chhattisgarh",  "Dadra and Nagar Haveli and Daman and Diu",  "Delhi (National Capital Territory of Delhi)",  "Goa",  "Gujarat",  "Haryana",  "Himachal Pradesh",  "Jharkhand",  "Karnataka",  "Kerala",  "Lakshadweep",  "Madhya Pradesh",  "Maharashtra",  "Manipur",  "Meghalaya",  "Mizoram",  "Nagaland",  "Odisha",  "Puducherry",  "Punjab",  "Rajasthan",  "Sikkim",  "Tamil Nadu",  "Telangana",  "Tripura",  "Uttar Pradesh",  "Uttarakhand",  "West Bengal"],
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    pincode: {
        type: String,
        required: true,
    },
    userTimeSlot:{
        type:[String]
    },
    permissionCheck:{
        type:[String],
        default:[]
    }

}, {
    timestamps: true
});


userSchema.pre('save', async function(next){
    // only hash the password if it has been modified (or is new)
    if(!this.isModified('password')){
        next();
    } 
    const salt  = await bcrypt.genSalt(10) // SALT is like a key
    this.password = await bcrypt.hash(this.password, salt)

})

userSchema.methods.matchPasswords = async function(enterePassword){
    return await bcrypt.compare(enterePassword, this.password);
}

const User = mongoose.model('User', userSchema);
export default User;
