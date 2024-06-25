const express = require('express');
const { updateUserInfo } = require('../controllers/userController');
const { authenticate } = require('../middlewares/authenticate');
const router = express.Router();

router.put('/update', authenticate, updateUserInfo);

module.exports = router;
