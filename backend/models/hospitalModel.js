import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { doctorSchema } from "./doctorModel.js";

const hospitalSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required:true
    }, 
    state: {
        type: String,
        enum: ["Andaman and Nicobar Islands", "Andhra Pradesh", "Arunachal Pradesh", "Assam", "Bihar", "Chandigarh", "Chhattisgarh", "Dadra and Nagar Haveli and Daman and Diu", "Delhi (National Capital Territory of Delhi)", "Goa", "Gujarat", "Haryana", "Himachal Pradesh", "Jharkhand", "Karnataka", "Kerala", "Lakshadweep", "Madhya Pradesh", "Maharashtra", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Odisha", "Puducherry", "Punjab", "Rajasthan", "Sikkim", "Tamil Nadu", "Telangana", "Tripura", "Uttar Pradesh", "Uttarakhand", "West Bengal"],
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
    hospitalRegistrationNumber:{
        type:String,
        required:true
    },
    doctorsList : {
        type: [doctorSchema],
        default :[]
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


hospitalSchema.pre('save', async function (next) {
    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10) // SALT is like a key
    this.password = await bcrypt.hash(this.password, salt)

})

hospitalSchema.methods.matchPasswords = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

const Hospital = mongoose.model('Hospital', hospitalSchema);
export default Hospital;