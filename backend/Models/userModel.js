import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true,
        maxLength: 30,
        minLength: 3,

    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        maxLength: 30,
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        trim: true,
    },
  
},{timestamps: true});

export const User = mongoose.model('User', userSchema);