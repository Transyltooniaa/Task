const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');
const User = require('../models/user');
const { jwtSecret } = require('../config');

exports.adminRegister = async (req, res) => {
    const { email, username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({ email, username, password: hashedPassword });
    try {
        await newAdmin.save();
        res.status(201).send('Admin registered');
    } catch (err) {
        res.status(400).send(`Error registering admin: ${err}`);
    }
};

exports.adminLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const admin = await Admin.findOne({ email });
        if (admin && (await bcrypt.compare(password, admin.password))) {
            const token = jwt.sign({ id: admin._id, role: 'admin' }, jwtSecret, { expiresIn: '1h' });
            res.status(200).json({ token });
        } else {
            res.status(400).send('Invalid credentials');
        }
    } catch (err) {
        res.status(400).send('Error logging in');
    }
};

exports.viewAllUsers = async (req, res) => {
    try {
        const users = await User.find().select('username');
        res.status(200).json(users);
    } catch (err) {
        res.status(400).send('Error retrieving users');
    }
};

exports.viewUserDetails = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.params.username }).select('-password');
        res.status(200).json(user);
    } catch (err) {
        res.status(400).send('Error retrieving user details');
    }
};

exports.deleteUser = async (req, res) => {
    try {
        await User.findOneAndDelete({ username: req.params.username });
        res.status(200).send('User deleted');
    } catch (err) {
        res.status(400).send('Error deleting user');
    }
};
