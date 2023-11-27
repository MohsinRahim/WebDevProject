const express = require('express');
const router = express.Router();
const { Cart, CartItem } = require('../models/cart');
const MenuItem = require('../models/menuItem');
const authenticate = require('../middleware/authenticate');

// Add an item to the user's cart
router.post('/add-to-cart', authenticate, async (req, res) => {
    const { menuItemId, quantity } = req.body;

    try {
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ error: 'Menu item not found' });
        }

        const user = req.user;
        let cart = await Cart.findOne({ user });

        if (!cart) {
            cart = new Cart({ user, items: [] });
        }

        // Check if the item already exists in the cart
        const existingItem = cart.items.find(item => item.menuItem.toString() === menuItemId);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.items.push(new CartItem({ menuItem: menuItemId, quantity }));
        }

        await cart.save();

        // Calculate the total price
        cart = await Cart.findOne({ user }).populate('items.menuItem');
        const total = cart.items.reduce((acc, item) => {
            return acc + item.quantity * item.menuItem.price;
        }, 0);

        res.status(200).json({ cart, total });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get the user's cart with correct total bill
router.get('/get-cart', authenticate, async (req, res) => {
    const user = req.user;
    const cart = await Cart.findOne({ user }).populate('items.menuItem');

    if (!cart) {
        return res.status(200).json({ items: [], totalBill: 0 });
    }

    // Calculate the total bill by iterating through the cart items
    let totalBill = 0;
    cart.items.forEach((cartItem) => {
        const itemTotal = cartItem.menuItem.price * cartItem.quantity;
        totalBill += itemTotal;
    });

    res.status(200).json({ items: cart.items, totalBill });
});

// Remove one instance of an item from the user's cart
router.post('/remove-from-cart', authenticate, async (req, res) => {
    const { menuItemId } = req.body;
    const user = req.user;

    try {
        const cart = await Cart.findOne({ user });

        if (!cart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        // Find the first instance of the item in the cart
        const index = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);

        if (index !== -1) {
            // Remove one instance of the item from the cart
            if (cart.items[index].quantity > 1) {
                cart.items[index].quantity--;
            } else {
                // If the quantity is 1, remove the entire item from the cart
                cart.items.splice(index, 1);
            }

            await cart.save();
        }

        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});



// // Remove one instance of an item from the user's cart
// router.post('/remove-from-cart', authenticate, async (req, res) => {
//     const { menuItemId } = req.body;
//     const user = req.user;

//     try {
//         const cart = await Cart.findOne({ user });

//         if (!cart) {
//             return res.status(404).json({ error: 'Cart not found' });
//         }

//         // Find the first instance of the item in the cart
//         const index = cart.items.findIndex(item => item.menuItem.toString() === menuItemId);

//         if (index !== -1) {
//             // Remove one instance of the item from the cart
//             cart.items.splice(index, 1);
//             await cart.save();
//         }

//         res.status(200).json(cart);
//     } catch (err) {
//         console.log(err);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// });


// Clear the user's cart
router.post('/clear-cart', authenticate, async (req, res) => {
    const user = req.user;

    try {
        const cart = await Cart.findOne({ user });

        if (cart) {
            cart.items = [];
            await cart.save();
        }

        res.status(200).json(cart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
