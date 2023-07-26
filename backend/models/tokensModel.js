import mongoose from "mongoose";

const tokenSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
}, {
    timestamps: true
});


const Tokens = mongoose.model('Tokens', tokenSchema);

export {Tokens}
