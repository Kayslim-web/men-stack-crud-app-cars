require('dotenv').config();
const express = require('express');
require('./config/database');

const app = express();

//Models

const fruit = require('./models/fruit');
const PORT = process.env.PORT ? process.env.PORT : '3000';
app.listen(PORT, () => {
    console.info(`App started on port: ${PORT}`);
});

app.get('/', async (req, res) => {
    res.render('index.ejs');
})
