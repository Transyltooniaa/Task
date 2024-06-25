const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verified: { type: Boolean, default: false },
    location: String,
    age: Number,
    work: String,
    dob: Date,
    description: String,
    otp: String
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
