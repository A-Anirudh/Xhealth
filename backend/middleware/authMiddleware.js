import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';
import Doctor from '../models/doctorModel.js';
import Hospital from '../models/hospitalModel.js';

const protect = asyncHandler(async (req,res,next) =>{
    let doctor_token, user_token, hospital_token;
    doctor_token = req.cookies['jwt-doctor']
    user_token = req.cookies['jwt-user']
    hospital_token = req.cookies['jwt-hospital']
    if(user_token && req.baseUrl.includes('users')){
        try{
            const dedcoded = jwt.verify(user_token, process.env.JWT_SECRET);
            req.user = await User.findById(dedcoded.userId).select('-password');
            next();
        } catch(error) {
            res.status(401);
            throw new Error("Not authorized, Invalid token")
        }
    } else if(doctor_token){
        try{
            const dedcoded = jwt.verify(doctor_token, process.env.JWT_SECRET);
            req.doctor = await Doctor.findById(dedcoded.userId).select('-password');
            next();
        } catch(error) {
            res.status(401);
            throw new Error("Not authorized, Invalid token for doctors")
        }
    } else if(hospital_token){
        try{
            const dedcoded = jwt.verify(hospital_token, process.env.JWT_SECRET);
            req.doctor = await Hospital.findById(dedcoded.userId).select('-password');
            next();
        } catch(error) {
            res.status(401);
            throw new Error("Not authorized, Invalid token for hospital")
        }
    }
     else{
        res.status(401);
        throw new Error('Not authorized, no token available!');         //not just doctors
    }

})

const androidProtect=asyncHandler(async (req,res,next) =>{
    const {email, password} = req.headers;
    const user = await User.findOne({email})
    
    if(user && (await user.matchPasswords(password))){
        req.user = user;
        next();
    } else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
})
export {protect,androidProtect}