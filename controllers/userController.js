const User = require('../models/user');

exports.updateUserInfo = async (req, res) => {
    const updates = req.body;
    try {
        await User.findByIdAndUpdate(req.user.id, updates);
        res.status(200).send('User info updated');
    } catch (err) {
        res.status(400).send('Error updating user info');
    }
};
