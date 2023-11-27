const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: String,
    logo: String,
    website: String,
    location: String,
    phoneNumber: String,
    menu: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }], // Link to menu items
    reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Review' }], // Link to reviews
    // Add other restaurant-specific fields as needed
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = Restaurant;


// const mongoose = require('mongoose');

// const restaurantSchema = new mongoose.Schema({
//     name: String,
//     logo: String,
//     website: String,
//     location: String,
//     phoneNumber: String,
//     meals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
// });

// const Restaurant = mongoose.model('Restaurant', restaurantSchema);

// module.exports = Restaurant;
