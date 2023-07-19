import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
}, {
    timestamps: true
});


userSchema.pre('save', async function(next){
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