// models/meal.js
const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
    name: String,
    calories: Number, // Represent the calorie range directly (e.g., 400, 500, 600, 700, 800)
    recipes: [String],
    isMacroBalance: Boolean,
});

const Meal = mongoose.model('Meal', mealSchema);

module.exports = Meal;


// const mongoose = require('mongoose');

// const mealSchema = new mongoose.Schema({
//     name: String,
//     calories: Number,
//     recipes: [String],
//     isMacroBalance: Boolean,
//     restaurantName: String // Add a restaurantName field to link meals to restaurants
// });

// const Meal = mongoose.model('Meal', mealSchema);

// module.exports = Meal;
