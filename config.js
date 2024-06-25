require('dotenv').config();

module.exports = {
    dbUser : process.env.DB_USER,
    dbPassword : process.env.DB_PASSWORD,
    jwtSecret: process.env.JWT_SECRET,
    emailUser: process.env.EMAIL_USER,
    emailPass: process.env.EMAIL_PASS
};

