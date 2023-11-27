const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
// const User = require('../models/user');
const { User, validate } = require("../models/user");
const authenticate = require('../middleware/authenticate');


router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		await new User({ ...req.body, password: hashPassword }).save();
		res.status(201).send({ message: "User created successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});


//from here
// User Registration
// router.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;

//     if (role !== 'user' && role !== 'restaurant owner') {
//         return res.status(400).send('Invalid role. You can only register as a user or restaurant owner.');
//     }

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).send('User already registered.');

//     user = new User({
//         name,
//         email,
//         password: await bcrypt.hash(password, 10),
//         role,
//     });

//     await user.save();  

//     const token = user.generateAuthToken();
//     res.header('x-auth-token', token).send({ message: 'User registered successfully', token });
// });


// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Step 1: Find the user by email
//         const user = await User.findOne({ email });

//         if (user) {
//             // Step 2: Check if the password matches using bcrypt
//             const match = await bcrypt.compare(password, user.password);

//             if (match) {
//                 // Step 3: Generate a JWT token for the user
//                 const token = jwt.sign({ _id: user._id }, 'your-secret-key'); // Replace with your secret key
//                 res.json({ status: 'ok', token });
//             } else {
//                 // Password does not match
//                 console.log('Password does not match');
//                 res.json({ status: 'error', message: 'Incorrect password' });
//             }
//         } else {
//             // User not found
//             console.log('User not found');
//             res.json({ status: 'error', message: 'User not found' });
//         }
//     } catch (err) {
//         // Internal server error
//         console.error('Error during login:', err);
//         res.json({ status: 'error', message: 'Internal server error' });
//     }
// });
//till here


// //login
// router.post('/login', async (req, res) => {
//     try {
//         const { email, password } = req.body;

//         // Find the user by email
//         const user = await User.findOne({ email });

//         if (user) {
//             // Check if the password matches using bcrypt
//             const match = await bcrypt.compare(password, user.password);

//             if (match) {
//                 // Generate a JWT token for the user
//                 const token = jwt.sign({ _id: user._id }, 'your-secret-key'); // Replace with your secret key
//                 res.json({ status: 'ok', token });
//             } else {
//                 res.json({ status: 'error', message: 'Incorrect password' });
//             }
//         } else {
//             res.json({ status: 'error', message: 'User not found' });
//         }
//     } catch (err) {
//         res.json({ status: 'error', message: 'Internal server error' });
//     }
// });

// // User Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (!user) {
//             // User not found
//             return res.status(400).send('Invalid email or password.');
//         }

//         // Compare the entered password with the stored hashed password
//         const validPassword = await bcrypt.compare(password, user.password);

//         if (validPassword) {
//             // Password is valid, generate a token and send a success message
//             const token = user.generateAuthToken();
//             return res.send({ message: 'Login successful', token });
//         } else {
//             // Password is invalid
//             return res.status(400).send('Invalid email or password.');
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).send('Internal server error');
//     }
// });

// // User Registration
// router.post('/register', async (req, res) => {
//     const { name, email, password, role } = req.body;

//     // Ensure only 'user' and 'restaurant owner' roles can be registered
//     if (role !== 'user' && role !== 'restaurant owner') {
//         return res.status(400).send('Invalid role. You can only register as a user or restaurant owner.');
//     }

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).send('User already registered.');

//     user = new User({
//         name,
//         email,
//         password: await bcrypt.hash(password, 10),
//         role,
//     });

//     await user.save();

//     const token = user.generateAuthToken();
//     res.header('x-auth-token', token).send({ message: 'User registered successfully', token });
// });

// //hur login
// // User Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     try {
//         const user = await User.findOne({ email });

//         if (user) {
//             const match = await bcrypt.compare(req.body.password, user.password);

//             if (match) {
//                 const token = user.generateAuthToken();
//                 return res.send({ message: 'Login successful', token });
//             } else {
//                 return res.status(400).send('Invalid email or password.');
//             }
//         } else {
//             return res.status(400).send('Invalid email or password.');
//         }
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).send('Internal server error');
//     }
// });



// // User Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     console.log('Login request received. Email:', email);

//     try {
//         const user = await User.findOne({ email });
//         if (!user) {
//             console.log('User not found for email:', email);
//             return res.status(400).send('Invalid email or password.');
//         }

//         console.log('Retrieved hashed password:', user.password);

//         const validPassword = await bcrypt.compare(password, user.password);

//         console.log('Password verification result:', validPassword);

//         if (!validPassword) {
//             console.log('Invalid password for user:', email);
//             return res.status(400).send('Invalid email or password.');
//         }

//         const token = user.generateAuthToken();
//         res.send({ message: 'Login successful', token });
//     } catch (error) {
//         console.error('Error during login:', error);
//         res.status(500).send('Internal server error');
//     }
// });


// // User Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     console.log('Login request received. Email:', email);

//     const user = await User.findOne({ email });
//     if (!user) {
//         console.log('User not found for email:', email);
//         return res.status(400).send('Invalid email or password.');
//     }

//     const validPassword = await bcrypt.compare(password, user.password);

//     console.log('Password verification result:', validPassword);

//     if (!validPassword) {
//         console.log('Invalid password for user:', email);
//         return res.status(400).send('Invalid email or password.');
//     }

//     const token = user.generateAuthToken();
//     res.send({ message: 'Login successful', token });
// });


// // User Login
// router.post('/login', async (req, res) => {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).send('Invalid email or password.');

//     const validPassword = await bcrypt.compare(password, user.password);
//     if (!validPassword) return res.status(400).send('Invalid email or password.');

//     const token = user.generateAuthToken();
//     res.send({ message: 'Login successful', token });
// });

// Get User Profile
router.get('/profile', authenticate, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

// Update User Information
router.put('/profile', authenticate, async (req, res) => {
    const { name, email, password } = req.body;
    const userId = req.user._id;

    try {
        let user = await User.findById(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        // Update user information
        user.name = name || user.name;
        user.email = email || user.email;

        if (password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        // Optionally, you can re-generate the JWT token if any user information is updated
        const token = user.generateAuthToken();

        res.send({ message: 'User information updated successfully', token });
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

// Delete User Account
router.delete('/profile', authenticate, async (req, res) => {
    const userId = req.user._id;

    try {
        const user = await User.findByIdAndRemove(userId);

        if (!user) {
            return res.status(404).send('User not found');
        }

        res.send('User account deleted successfully');
    } catch (error) {
        res.status(500).send('Internal server error');
    }
});

module.exports = router;



// const express = require('express');
// const router = express.Router();
// const bcrypt = require('bcryptjs');
// const User = require('../models/user');
// const authenticate = require('../middleware/authenticate');

// //Create User
// router.post('/', async (req, res) => {
//     const { name, email, password } = req.body;

//     let user = await User.findOne({ email });
//     if (user) return res.status(400).send('User already registered.');

//     user = new User({
//         name,
//         email,
//         password: await bcrypt.hash(password, 10),
//     });

//     await user.save();

//     const token = user.generateAuthToken();
//     res.header('x-auth-token', token).send({ message: 'User registered successfully', token });
// });

// //Get User
// router.get('/me', authenticate, async (req, res) => {
//     const user = await User.findById(req.user._id).select('-password');
//     res.send(user);
// });

// // Update User Information
// router.put('/me', authenticate, async (req, res) => {
//     const { name, email, password } = req.body;
//     const userId = req.user._id;

//     try {
//         let user = await User.findById(userId);

//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         // Update user information
//         user.name = name || user.name;
//         user.email = email || user.email;

//         if (password) {
//             const salt = await bcrypt.genSalt(10);
//             user.password = await bcrypt.hash(password, salt);
//         }

//         await user.save();

//         // Optionally, you can re-generate the JWT token if any user information is updated
//         const token = user.generateAuthToken();

//         res.send({ message: 'User information updated successfully', token });
//     } catch (error) {
//         res.status(500).send('Internal server error');
//     }
// });

// // Delete User Account
// router.delete('/me', authenticate, async (req, res) => {
//     const userId = req.user._id;

//     try {
//         const user = await User.findByIdAndRemove(userId);

//         if (!user) {
//             return res.status(404).send('User not found');
//         }

//         res.send('User account deleted successfully');
//     } catch (error) {
//         res.status(500).send('Internal server error');
//     }
// });

// module.exports = router;



