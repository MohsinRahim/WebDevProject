// routes/meals.js
const express = require('express');
const router = express.Router();
const Meal = require('../models/meal');
const Restaurant = require('../models/restaurant');
const authenticate = require('../middleware/authenticate');

// Create a new meal
router.post('/', authenticate, async (req, res) => {
    const { name, calories, recipes, isMacroBalance, restaurantId } = req.body;

    const restaurant = await Restaurant.findById(restaurantId);
    if (!restaurant) return res.status(400).send('Invalid restaurant.');

    const meal = new Meal({ name, calories, recipes, isMacroBalance });
    await meal.save();
    restaurant.meals.push(meal._id);
    await restaurant.save();

    res.status(201).json(meal);
});

// Read all meals
router.get('/', async (req, res) => {
    const meals = await Meal.find();
    res.json(meals);
});

// Read meals by calorie range
router.get('/by-calorie-range/:range', async (req, res) => {
    const { range } = req.params;
    const meals = await Meal.find({ calories: parseInt(range) });
    res.json(meals);
});

// Update a meal by ID
router.put('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    const { name, calories, recipes, isMacroBalance } = req.body;
    const updatedMeal = await Meal.findByIdAndUpdate(id, { name, calories, recipes, isMacroBalance }, { new: true });
    res.json(updatedMeal);
});

// Delete a meal by ID
router.delete('/:id', authenticate, async (req, res) => {
    const { id } = req.params;
    await Meal.findByIdAndDelete(id);
    res.sendStatus(204);
});

module.exports = router;
