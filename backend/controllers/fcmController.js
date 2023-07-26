import asyncHandler from "express-async-handler";
import {Tokens} from "../models/tokensModel.js"
import User from "../models/userModel.js"
import app from "../models/firebaseAdmin.js";
import {getMessaging} from "firebase-admin/messaging"

const regUserWithToken= asyncHandler(async (req,res) =>{
    const {email , password ,token,}=req.body;
    console.log(req.body);
    const user =await User.findOne({email})
    
    if(user && (await user.matchPasswords(password))){
        const user=await Tokens.findOneAndUpdate({email},{token},{new:true})
        if(user){
            res.status(201).json({"status":"Success","email":email,"token":token})
        }else{
            const tokenGenerated=Tokens.create({email,token})
            // console.log(req.body);
            if(tokenGenerated){
                res.status(201).json({"status":"Success","email":email,"token":token})
            }else{
                res.status(400).json({"status":"Error","email":email,"token":token})
            }
        }
    } else {
        res.status(401).json({"status":"Error","email":email,"token":token});
    }
})

const sendNotification=asyncHandler(async(req,res)=>{
    // This registration token comes from the client FCM SDKs.
    const {email,body,title}=req.body
    const registrationToken =await Tokens.findOne({email});
    if(registrationToken){
        const message = {
            notification:{
              title:title,
              body:body
            },
            token: registrationToken.token
        };

        getMessaging().send(message)
        .then((response) => {
              // Response is a message ID string.
              console.log('Successfully sent message:', response);
              res.status(200).json({message:response})
        })
        .catch((error) => {
            res.status(400).json({error: error})
        });
        
    }else{
        res.status(401).json({"error":"User Not Found"})
    }
}
)
      
      

export {regUserWithToken,sendNotification}