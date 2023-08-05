import asyncHandler from "express-async-handler";
import Doctor from '../models/doctorModel.js'
import Hospital from "../models/hospitalModel.js";
import generateToken from '../utils/generateToken.js'

/**
 * @desc : Auth hospital
 * @access : Public
 * @route : POST to /api/hospitals/auth
 */

const hospitalAuth = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const hosp = await Hospital.findOne({email})
    // console.log(req.cookies.jwt)
    
    if(hosp && (await hosp.matchPasswords(password))){
        generateToken(res, hosp._id,'hospital');
        res.status(201).json({
            _id:hosp._id,
            name: hosp.name,
            email:hosp.email,
        });
    } else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
});
/**
 * @desc : Register a new hospital
 * @access : Public
 * @route : POST to /api/hospitals
 */

const registerHospital = asyncHandler(async (req, res) => {
    const {name,email,password,phoneNumber,state,city, pincode,hospitalRegistrationNumber  } = req.body;
    const hospExists = await Hospital.findOne({email});
    const docs = await Doctor.find({currentHospitalWorkingName : name});    
    if (phoneNumber.length !==10){
        res.status(400);
        throw new Error("Phone number should be only 10 digits. Do no include country code!")
    }

    if(hospExists){
        res.status(400);
        throw new Error('Account already exists');
        // Uses our error handler that we created
    }

    const hosp = await Hospital.create({
        name,
        email,
        password,
        phoneNumber,
        state, city, pincode,
        hospitalRegistrationNumber,
    });
    if(hosp){
        generateToken(res, hosp._id,'hospital');
        res.status(201).json({
            _id:hosp._id,
            name: hosp.name,
            email:hosp.email,

        });
    } else{
        res.status(400);
        throw new Error('Invalid data')
    }
});

/**
 * @desc : Logout
 * @access : PRIVATE
 * @route : POST to /api/hospital/logout
 */

const logoutHospital = asyncHandler(async (req, res) => {
        res.cookie('jwt-hospital','',{
            httpOnly:true,
            expires:new Date(0)
        })
    res.status(200).json({message:"Hospital logged out"})
});

/**
 * @desc : get doctor profile
 * @access : PRIVATE
 * @route : GET to /api/doctors/profile
 */

// const getDoctorProfile = asyncHandler(async (req, res) => {

//     console.log(req.doctor)
//     const doc = {
//         _id :req.doctor._id,
//         email :req.doctor.email,
//         firstName:req.doctor.firstName,
//         lastName:req.doctor.lastName,
//         phoneNumber:req.doctor.phoneNumber,
//         bloodGroup: req.doctor.bloodGroup,
//         dateOfBirth: req.doctor.dateOfBirth,
//         gender:req.doctor.gender,
//         state:req.doctor.state,
//         city:req.doctor.city,
//         pincode:req.doctor.pincode,
//         qualification: req.doctor.qualification,
//         department: req.doctor.department,
//         experience: req.doctor.experience,
//         currentHospitalWorkingName: req.doctor.currentHospitalWorkingName,
//         registrationNumber: req.doctor.registrationNumber,
//         workingHourStart:req.doctor.workingHourStart,
//         workingHourEnd:req.doctor.workingHourEnd,
//         timeSlotsBooked: req.doctor.timeSlotsBooked
//     }
//     // console.log(user)
//     res.status(200).json(doc)

// });

/**
 * @desc : Update Doctor Profile
 * @access : PRIVATE
 * @route : PUT to /api/doctors/profile
 */

// const updateDoctorProfile = asyncHandler(async (req, res) => {
//     console.log('doctor Profile update')

//     const doc = await Doctor.findById(req.doctor._id)
//     if(doc){
//         doc.firstName = req.body.firstName || doc.firstName;
//         doc.lastName = req.body.lastName || doc.lastName;
//         doc.phoneNumber = req.body.phoneNumber || doc.phoneNumber;        
//         doc.email = req.body.email || doc.email;
//         doc.bloodGroup = req.body.bloodGroup || doc.bloodGroup;
//         doc.dateOfBirth = req.body.dateOfBirth || doc.dateOfBirth;
//         doc.gender = req.body.gender || doc.gender;
//         doc.state = req.body.state || doc.state;
//         doc.city = req.body.city || doc.city;
//         doc.pincode = req.body.pincode || doc.pincode;
//         doc.department = req.body.department || doc.department;
//         doc.qualification = req.body.qualification || doc.qualification;
//         doc.experience = req.body.experience || doc.experience;
//         doc.currentHospitalWorkingName = req.body.currentHospitalWorkingName || doc.currentHospitalWorkingName;
//         doc.registrationNumber = req.body.registrationNumber || doc.registrationNumber;
//         doc.workingHourStart = req.body.workingHourStart || doc.workingHourStart,
//         doc.workingHourEnd = req.body.workingHourEnd || doc.workingHourEnd;
//         if(req.body.password){
//             doc.password = req.body.password;
//         }
//         const updatedDoctor = await doc.save();
//         res.status(200).json({
//             _id:updatedDoctor._id,
//             firstName:updatedDoctor.firstName,
//             lastName:updatedDoctor.lastName,
//             email:updatedDoctor.email
//         })
//     } else{
//         res.status(404);
//         throw new Error('Doctor not found')
//     }

// });

export {hospitalAuth, registerHospital,logoutHospital};



