import asyncHandler from "express-async-handler";
import User from '../models/userModel.js'
import generateToken from '../utils/generateToken.js'

// @desc Auth user/set token
// route = POST to /api/users/auth
// Access = Public

const authUser = asyncHandler(async (req, res) => {
    const {email, password} = req.body;
    const user = await User.findOne({email})

    if(user && (await user.matchPasswords(password))){
        generateToken(res, user._id);
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email,
        });
    } else{
        res.status(401);
        throw new Error('Invalid email or password')
    }


    res.status(200).json({message:"Auth user"})

});

// @desc Register a new user
// route = POST to /api/users
// Access = Public


const registerUser = asyncHandler(async (req, res) => {
    const {name,email,password} = req.body;
    const userExists = await User.findOne({email});

    if(userExists){
        res.status(400);
        throw new Error('user already exists!');
        // Uses our error handler that we created
    }
    const user = await User.create({
        name,
        email,
        password
    });
    if(user){
        generateToken(res, user._id);
        res.status(201).json({
            _id:user._id,
            name: user.name,
            email:user.email,
        });
    } else{
        res.status(400);
        throw new Error('Invalid user data!')
    }
});

// @desc Logout
// route = POST to /api/users/logout
// Access = Private


const logoutUser = asyncHandler(async (req, res) => {
    res.cookie('jwt','',{
        httpOnly:true,
        expires:new Date(0)
    })
    res.status(200).json({message:"User logged out"})

});

// @desc get user profile
// route = GET to /api/users/profile
// Access = Private


const getUserProfile = asyncHandler(async (req, res) => {
    const user = {
        _id :req.user._id,
        email :req.user.email,
        name:req.user.name
    }
    // console.log(user)
    res.status(200).json(user)

});

// @desc Update User Profile
// route = PUT to /api/profile
// Access = Private


const updateUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if(user){
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;

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

    res.status(200).json({message:"update user profile"})

});

export {authUser, registerUser, logoutUser, getUserProfile, updateUserProfile};