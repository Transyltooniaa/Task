const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },

    username: {
        type: String,
        required: true, 
        unique: true 
    },

    password: { 
        type: String, 
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },

    verified: { 
        type: Boolean,
         default: false 
    },

    location: String,
    age: Number,
    work: String,
    dob: Date,
    description: String,
    otp: String
}, { timestamps: true });


module.exports = mongoose.model('User', userSchema);
