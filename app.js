const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
require('./database/MongoConnection');

const PORT = process.env.port || 3000;


const publicDirectoryPath = path.join(__dirname,'/public');
const viewsPath = path.join(__dirname,'/templates/views');
const partialsPath = path.join(__dirname,'/templates/partials')

app.set('view engine', 'hbs');
app.set('views',viewsPath);
app.use(express.static(publicDirectoryPath));
hbs.registerPartials(partialsPath)

app.listen(PORT, () => {
    console.log('Server is running on port 3000');
});