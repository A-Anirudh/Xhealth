import asyncHandler from "express-async-handler";
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
    const { name, email, password, phoneNumber, state, city, pincode, hospitalRegistrationNumber } = req.body;

    // Check if a hospital with the same email already exists
    const existingHospital = await Hospital.findOne({ email });
    if (existingHospital) {
        res.status(400).json({ message: 'Email address already in use' });
    } else {
        // Continue with account creation if the email is not in use
        if (phoneNumber.length !== 10) {
            res.status(400).json({ message: 'Phone number should be only 10 digits. Do not include the country code.' });
        } else {
            // Create a new hospital account
            const newHospital = await Hospital.create({
                name,
                email,
                password,
                phoneNumber,
                state,
                city,
                pincode,
                hospitalRegistrationNumber,
            });

            // Generate a token and send a success response
            if (newHospital) {
                generateToken(res, newHospital._id, 'hospital');
                res.status(201).json({
                    _id: newHospital._id,
                    name: newHospital.name,
                    email: newHospital.email,
                });
            } else {
                res.status(400).json({ message: 'Invalid data' });
            }
        }
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

export {hospitalAuth, registerHospital,logoutHospital};



