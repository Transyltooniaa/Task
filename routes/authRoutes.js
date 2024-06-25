const express = require('express');
const { register, verifyUser, login, getUserInfo } = require('../controllers/authController');
const { authenticate } = require('../middlewares/authenticate');
const router = express.Router();

router.post('/register', register);
router.post('/verify', verifyUser);
router.post('/login', login);
router.get('/me', authenticate, getUserInfo);

module.exports = router;
