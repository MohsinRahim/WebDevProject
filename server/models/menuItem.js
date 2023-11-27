const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    category: String, // You can expand the categories as needed
    image: String, // You can store image URLs or references here
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant' }, // Reference to the restaurant
});

const MenuItem = mongoose.model('MenuItem', menuItemSchema);

module.exports = MenuItem;
