const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config');

exports.authenticate = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied. No token provided.');

    try {
        const decoded = jwt.verify(token, jwtSecret);
        req.user = decoded;
        next();
    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            return res.status(401).send('Token expired. Please login again.');
        }
        res.status(400).send('Invalid token');
    }
};


exports.authenticateAdmin = (req, res, next) => {
    const token = req.header('Authorization').replace('Bearer ', '');
    if (!token) return res.status(401).send('Access denied');

    try {
        const decoded = jwt.verify(token, jwtSecret);
        if (decoded.role !== 'admin') {
            return res.status(403).send('Access forbidden');
        }
        req.user = decoded;
        next();
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};
