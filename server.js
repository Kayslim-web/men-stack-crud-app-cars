require('dotenv').config();
require('./config/database');
const express = require('express');
const methodOverride = require('method-override');
const morgan = require('morgan');
const path = require('path');

// Models
const Car = require('./models/car');

const app = express();
const PORT = process.env.PORT ? process.env.PORT : '3000';

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));



  
// Routes
app.get('/', async (req, res) => {
  res.render('index.ejs');
});



// CARS ROUTES
app.get('/cars', async (req, res) => {
  const cars = await Car.find({});

  res.render('cars/index.ejs', { cars });
});

// setup a route to show a form to add a car
app.get('/cars/new', (req, res) => {
  res.render('cars/new.ejs');
});
// handle the submission of the form
app.post('/cars', async (req, res) => {
  // pull the info from teh req.body
  if (req.body.isManualTransmission) {
    req.body.isManualTransmission = true;
  } else {
    req.body.isManualTransmission = false;
  }

  // Model.create(body info)
  await Car.create(req.body);
  // send the user to some place (redirect to some other route)
  res.redirect('/cars');
});

app.get('/cars/:id', async (req, res) => {
  // grab the id from the params
  const carId = req.params.id;
  // use the id to find the record in the database
  const car = await Car.findById(carId);
  // render the show template
  res.render('cars/show.ejs', { car: car });
});

app.delete('/cars/:id', async (req, res) => {
  // grab the id from the params
  const carId = req.params.id;
  // use the id to find the record and delete in the database
  await Car.findByIdAndDelete(carId);

  // send them back to the list of all cars
  res.redirect('/cars');
});

// setup a route to show a form to edit a car
app.get('/cars/:id/edit', async (req, res) => {
  // grab the id from the params
  const carId = req.params.id;

  // find the car in the database
  const car = await Car.findById(carId);
  // render the edit form and pass it the car we want to edit
  res.render('cars/edit.ejs', { car: car });
});

// handle the submission of the form
app.put('/cars/:id', async (req, res) => {
  // grab the id from the params
  const carId = req.params.id;

  if (req.body.isManualTransmission) {
    req.body.isManualTransmission = true;
  } else {
    req.body.isManualTransmission = false;
  }

  // use the id to find the record and delete in the database
  await Car.findByIdAndUpdate(carId, req.body);

  // send them back to the list of all car
  res.redirect(`/cars/${carId}`);
});

app.listen(PORT, () => {
  console.info(`App started on port: ${PORT}`);
});