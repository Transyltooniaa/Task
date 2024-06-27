const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { jwtSecret } = require('../config');
const { sendMail } = require('../utils/sendMail');

exports.register = async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const newUser = new User({ email, username, password: hashedPassword, otp });

    try {
        await newUser.save();
        await sendMail(email, 'OTP Verification', `Your OTP is ${otp}`);
        res.status(201).send('User registered! Please verify your email.');
    } catch (err) {
        res.status(400).send(`Error registering user ${err}`);
    }
};

exports.verifyUser = async (req, res) => {
    const { email, otp } = req.body;

    try {
        const users = await User.find({ email });

        if (users.length > 1) {
            const latestUser = users[users.length - 1];

            await User.deleteMany({ 
                email: email, 
                _id: { $ne: latestUser._id } 
            });
        }
        const latestUser = users[users.length - 1];

        if (latestUser.otp === otp) {
            latestUser.verified = true;
            latestUser.otp = undefined;
            await latestUser.save();
            res.status(200).send('User verified!');
        } else {
            res.status(400).send('Invalid OTP');
        }
    } catch (err) {
        res.status(400).send(`Error verifying user: ${err.message}`);
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).send('User not found');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).send('Invalid password');
        }
        if (!user.verified) {
            return res.status(400).send('User not verified');
        }
        const token = jwt.sign({ id: user._id }, jwtSecret, { expiresIn: '1h' });
        res.status(200).json({ token });
    } catch (err) {
        res.status(500).send(`Error logging in: ${err.message}`);
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(400).send('Error retrieving user info');
    }
};
