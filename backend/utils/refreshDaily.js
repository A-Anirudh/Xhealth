import Doctor from '../models/doctorModel.js'
import User from '../models/userModel.js'

export const clearDocArray = async () =>{
    const allDoc = await Doctor.find()
    // console.log(allDoc)
    for(let i in allDoc){
        console.log(allDoc[i].timeSlotsBooked)
        allDoc[i].timeSlotsBooked=[]
        console.log(allDoc[i].timeSlotsBooked)
        await allDoc[i].save()
    }
    
    console.log('outside for loop')
}

export const clearUserArray = async () =>{
    const allUsers = await User.find()
    // console.log(allUsers)
    for(let i in allUsers){
        console.log(allUsers[i].userTimeSlot)
        allUsers[i].userTimeSlot=[]
        console.log(allUsers[i].userTimeSlot)
        await allUsers[i].save()
    }
    
    console.log('outside for loop')
}
