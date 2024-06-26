const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const adminRoutes = require('./routes/adminRoutes');
const config = require('./config');
require('dotenv').config();
require('./database/MongoConnection');

const PORT = config.port || 3000;


app.use(bodyParser.json());

const publicDirectoryPath = path.join(__dirname,'/public');
const viewsPath = path.join(__dirname,'/templates/views');
const partialsPath = path.join(__dirname,'/templates/partials')

app.set('view engine', 'hbs');
app.set('views',viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath)


app.use('/api/auth', authRoutes);
app.use('/api/user', userRoutes);
app.use('/api/admin', adminRoutes);

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});