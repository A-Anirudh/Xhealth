import asyncHandler from "express-async-handler";
import Doctor from '../models/doctorModel.js'
import generateToken from '../utils/generateToken.js'
import Hospital from "../models/hospitalModel.js";
import { doctorsList, hopitalList } from "../data/doctors.js";
/**
 * @desc : Auth doctor/set token
 * @access : Public
 * @route : POST to /api/doctors/auth
 */

const authDoctor = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const doc = await Doctor.findOne({email})
    // console.log(req.cookies.jwt)
    
    if(doc && (await doc.matchPasswords(password))){
        generateToken(res, doc._id,'doctor');
        res.status(201).json({
            _id:doc._id,
            firstName: doc.firstName,
            email:doc.email,
        });
    } else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
});
/**
 * @desc : Register a new doc
 * @access : Public
 * @route : POST to /api/doctors
 */

const registerDoctor = asyncHandler(async (req, res) => {
    const {email,password,firstName, lastName, phoneNumber, dateOfBirth, gender, state, bloodGroup, city, pincode,department,qualification,experience,registrationNumber,currentHospitalWorkingName,workingHourStart,workingHourEnd,gradCollegeName } = req.body;
    const doctorExists = await Doctor.findOne({email});
    const hospital = await Hospital.findOne({name:currentHospitalWorkingName});

    console.log(hospital)
    
    if (phoneNumber.length !==10){
        res.status(400);
        throw new Error("Phone number should be only 10 digits. Do no include country code!")
    }
    if(doctorExists){
        res.status(400);
        throw new Error('doctor already exists!');
        // Uses our error handler that we created
    }

    const doc = await Doctor.create({
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        dateOfBirth, 
        gender, 
        state, 
        bloodGroup, 
        city, 
        pincode,department,qualification,experience,registrationNumber,currentHospitalWorkingName,workingHourStart,workingHourEnd, gradCollegeName
    });
    if(doc){
        if (hospital) {
            hospital.doctorsList.push(doc);
            await hospital.save()
        }
        generateToken(res, doc._id,'doctor');
        res.status(201).json({
            _id:doc._id,
            firstName: doc.firstName,
            email:doc.email,
        });
    } else{
        res.status(400);
        throw new Error('Invalid doc data!')
    }
    
    
});

/**
 * @desc : Logout
 * @access : PRIVATE
 * @route : POST to /api/doctors/logout
 */

const logoutDoctor = asyncHandler(async (req, res) => {
        res.cookie('jwt-doctor','',{
            httpOnly:true,
            expires:new Date(0)
        })
    res.status(200).json({message:"Doctor logged out"})
});

/**
 * @desc : get doctor profile
 * @access : PRIVATE
 * @route : GET to /api/doctors/profile
 */

const getDoctorProfile = asyncHandler(async (req, res) => {

    console.log(req.doctor)
    const doc = {
        _id :req.doctor._id,
        email :req.doctor.email,
        firstName:req.doctor.firstName,
        lastName:req.doctor.lastName,
        phoneNumber:req.doctor.phoneNumber,
        bloodGroup: req.doctor.bloodGroup,
        dateOfBirth: req.doctor.dateOfBirth,
        gender:req.doctor.gender,
        state:req.doctor.state,
        city:req.doctor.city,
        pincode:req.doctor.pincode,
        qualification: req.doctor.qualification,
        department: req.doctor.department,
        experience: req.doctor.experience,
        currentHospitalWorkingName: req.doctor.currentHospitalWorkingName,
        registrationNumber: req.doctor.registrationNumber,
        workingHourStart:req.doctor.workingHourStart,
        workingHourEnd:req.doctor.workingHourEnd,
        timeSlotsBooked: req.doctor.timeSlotsBooked
    }
    // console.log(user)
    res.status(200).json(doc)

});

/**
 * @desc : Update Doctor Profile
 * @access : PRIVATE
 * @route : PUT to /api/doctors/profile
 */


const updateDoctorProfile = asyncHandler(async (req, res) => {
    console.log('doctor Profile update')

    const doc = await Doctor.findById(req.doctor._id)
    if(doc){
        doc.firstName = req.body.firstName || doc.firstName;
        doc.lastName = req.body.lastName || doc.lastName;
        doc.phoneNumber = req.body.phoneNumber || doc.phoneNumber;        
        doc.email = req.body.email || doc.email;
        doc.bloodGroup = req.body.bloodGroup || doc.bloodGroup;
        doc.dateOfBirth = req.body.dateOfBirth || doc.dateOfBirth;
        doc.gender = req.body.gender || doc.gender;
        doc.state = req.body.state || doc.state;
        doc.city = req.body.city || doc.city;
        doc.pincode = req.body.pincode || doc.pincode;
        doc.department = req.body.department || doc.department;
        doc.qualification = req.body.qualification || doc.qualification;
        doc.experience = req.body.experience || doc.experience;
        doc.currentHospitalWorkingName = req.body.currentHospitalWorkingName || doc.currentHospitalWorkingName;
        doc.registrationNumber = req.body.registrationNumber || doc.registrationNumber;
        doc.workingHourStart = req.body.workingHourStart || doc.workingHourStart,
        doc.workingHourEnd = req.body.workingHourEnd || doc.workingHourEnd;
        if(req.body.password){
            doc.password = req.body.password;
        }
        const updatedDoctor = await doc.save();
        res.status(200).json({
            _id:updatedDoctor._id,
            firstName:updatedDoctor.firstName,
            lastName:updatedDoctor.lastName,
            email:updatedDoctor.email
        })
    } else{
        res.status(404);
        throw new Error('Doctor not found')
    }

});

/**
 * @desc : list all doctors
 * @access : PRIVATE
 * @route : GET 'api/doctors/all'
 */

const allDoctor = asyncHandler(async (req,res) => {
    const allDoc =await Doctor.find({}).select("-password");
    res.status(200).json({
        allDoc
    });
});



export {authDoctor, registerDoctor, logoutDoctor, getDoctorProfile, updateDoctorProfile,allDoctor};

// Remove all elements in timeSlotsBooked array for all doctors
// cron.schedule('0 0 * * *', clearDocArray);


// clearDocArray()


// doctorsList.forEach(async element => {
//     const hos = await Hospital.findOne({name : element.currentHospitalWorkingName})

//     const doc = Doctor.create({
//         email: element.email,
//         password: element.password,
//         firstName: element.firstName,
//         lastName: element.lastName,
//         phoneNumber:element.phoneNumber,
//         dateOfBirth:element.dateOfBirth, 
//         gender:element.gender, 
//         state:element.state, 
//         bloodGroup:element.bloodGroup, 
//         city:element.city, 
//         pincode:element.pincode,
//         department:element.department,
//         qualification:element.qualification,
//         experience:element.experience,
//         registrationNumber:element.registrationNumber,
//         currentHospitalWorkingName:element.currentHospitalWorkingName,
//         workingHourStart:element.workingHourStart,
//         workingHourEnd:element.workingHourEnd,
//         gradCollegeName:element.gradCollegeName
//     });
//     if(hos){
//         hos.doctorsList.push(doc)
//     }
// });

