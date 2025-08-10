const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');


const app = express();

// Connect MongoDB
mongoose.connect('mongodb+srv://basha:king@freefire.lrfkfsu.mongodb.net/blogging?retryWrites=true&w=majority&appName=FreeFire')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

// Middlewares

// const bodyParser = require('body-parser');
app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// Routes
app.use('/admin', require('./routes/admin'));
app.use('/', require('./routes/blog'));





// Start server
// app.listen(5000, () => console.log('Server running on http://localhost:5000'));

module.exports = app;

