const express = require('express');
const router = express.Router();
const Review = require('../models/review');
const authenticate = require('../middleware/authenticate');

// Create a new review for a restaurant
router.post('/', authenticate, async (req, res) => {
    const { restaurantId, rating, comment } = req.body;
    const userId = req.user._id; // User making the review

    try {
        const review = new Review({
            restaurant: restaurantId,
            user: userId,
            rating,
            comment,
        });

        await review.save();
        res.status(201).json(review);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all reviews for a specific restaurant by restaurant ID
router.get('/by-restaurant/:restaurantId', async (req, res) => {
    const { restaurantId } = req.params;

    try {
        const reviews = await Review.find({ restaurant: restaurantId }).populate('user', 'name'); // Populate user details

        res.status(200).json(reviews);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// ... (other review routes as needed, e.g., update or delete)

module.exports = router;
