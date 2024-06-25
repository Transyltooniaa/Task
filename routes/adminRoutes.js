const express = require('express');
const { adminRegister, adminLogin, viewAllUsers, viewUserDetails, deleteUser } = require('../controllers/adminController');
const { authenticateAdmin } = require('../middlewares/authenticate');
const router = express.Router();

router.post('/register', adminRegister);
router.post('/login', adminLogin);
router.get('/users', authenticateAdmin, viewAllUsers);
router.get('/users/:username', authenticateAdmin, viewUserDetails);
router.delete('/users/:username', authenticateAdmin, deleteUser);

module.exports = router;
