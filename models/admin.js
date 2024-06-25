const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
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
    }},

    username: { 
        type: String, 
        required: true, 
        unique: true ,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isAlphanumeric(value)) {
                throw new Error('Username is invalid')
            }
        }
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
        },
    }
}, { timestamps: true });

module.exports = mongoose.model('Admin', adminSchema);
