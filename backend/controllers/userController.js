import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// TODO user profile view doctor permissions allowance!

/**
 * @desc Auth user/set token
* @route  POST to /api/users/auth
* @Access Public
*/
const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})
    if(user && (await user.matchPasswords(password))){
 
        generateToken(res, user._id,'user');
        return res.status(201).json({
            _id:user._id,
            firstName: user.firstName,
            email:user.email,
        });
    } else{
        res.status(401);
        throw new Error('Invalid email or password')
    }
});

/**
 * @desc Register a new user
 * @route POST to /api/users
 * @access Public
 * @params - email, password, firstName, lastName, phoneNumber, dateOfBirth, gender, state, bloodGroup, city, pincode
 */

const registerUser = asyncHandler(async (req, res) => {
    const {email,password,firstName, lastName, phoneNumber, dateOfBirth, gender, state, bloodGroup, city, pincode } = req.body;
    const userExists = await User.findOne({email});
    
    if (phoneNumber.length !==10){
        res.status(400);
        throw new Error("Phone number should be only 10 digits. Do no include country code!")
    }

    if(userExists){
        res.status(400);
        throw new Error('user already exists!');
        // Uses our error handler that we created
    }

    const user = await User.create({
        
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
        pincode
    });
    if(user){
        generateToken(res, user._id,'user');
        res.status(201).json({
            _id:user._id,
            firstName: user.firstName,
            email:user.email,

        });
    } else{
        res.status(400);
        throw new Error('Invalid user data!')
    }
});

/**
 * @desc Logout
 * @route POST to  /api/users/logout
 * @access Public
 */

const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt-user','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"User logged out"})

});

/**
 * @desc get user profile
 * @route GET to /api/users/profile
 * @route GET to /api/users/profile/android
 * @access Private
 */
const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id :req.user._id,
        email :req.user.email,
        firstName:req.user.firstName,
        lastName:req.user.lastName,
        phoneNumber:req.user.phoneNumber,
        bloodGroup: req.user.bloodGroup,
        dateOfBirth: req.user.dateOfBirth,
        gender:req.user.gender,
        state:req.user.state,
        city:req.user.city,
        pincode:req.user.pincode,
        userTimeSlots : req.user.userTimeSlot,
    }
    // console.log(user)
    res.status(200).json(user)

});

/**
 * @desc Update User Profile
 * @route PUT to /api/users/profile
 * @access Private
 */

const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.phoneNumber = req.body.phoneNumber || user.phoneNumber;        
        user.email = req.body.email || user.email;
        user.bloodGroup = req.body.bloodGroup || user.bloodGroup;
        user.dateOfBirth = req.body.dateOfBirth || user.dateOfBirth;
        user.gender = req.body.gender || user.gender;
        user.state = req.body.state || user.state;
        user.city = req.body.city || user.city;
        user.pincode = req.body.pincode || user.pincode;     
        if(req.body.password){
            user.password = req.body.password;
        }
        const updatedUser = await user.save();
        res.status(200).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email
        })
    } else{
        res.status(404);
        throw new Error('User not found')
    }

    

});
// cron.schedule('0 0 * * *', clearUserArray);
export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};

// clearUserArray()