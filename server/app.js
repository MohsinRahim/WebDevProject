require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const users = require('./routes/users');
const auth = require('./routes/auth');
const restaurants = require('./routes/restaurants');
const meals = require('./routes/meals');
const menuItemsRouter = require('./routes/menuItems'); // Adjust the path as needed
const reviews = require('./routes/reviews');
const cart = require('./routes/cart');
const cors = require("cors")

const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/foodApp', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/restaurants', restaurants);
app.use('/api/meals', meals);
app.use('/api/menuItems', menuItemsRouter);
app.use('/api/reviews', reviews);
app.use('/api/cart', cart);

// Port
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));

