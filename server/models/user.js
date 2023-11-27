const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const userSchema = new mongoose.Schema({
	firstName: { type: String, required: true },
	lastName: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
});

userSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, "your-secret-key", {
		expiresIn: "7d",
	});
	return token;
};

const User = mongoose.model("user", userSchema);

const validate = (data) => {
	const schema = Joi.object({
		firstName: Joi.string().required().label("First Name"),
		lastName: Joi.string().required().label("Last Name"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = { User, validate };


//from here

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 2,
//         maxlength: 255,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         minlength: 5,
//         maxlength: 255,
//         validate: {
//             validator: function (v) {
//                 return /\S+@\S+\.\S+/.test(v); // Simple email format validation
//             },
//             message: 'Invalid email format',
//         },
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 8, // Adjust as needed
//         maxlength: 1024, // Adjust as needed
//     },
//     role: {
//         type: String,
//         enum: ['user', 'restaurant owner'],
//         default: 'user',
//     },
// });

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign(
//         { _id: this._id, role: this.role },
//         'your-secret-key', // Replace 'your-secret-key' with your actual secret key
//         { expiresIn: '1h' }
//     );
//     return token;
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;

//till here


// //Project Code
// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const jwtSecretKey = 'your-secret-key';

// const userSchema = new mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//         minlength: 2,
//         maxlength: 255,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true,
//         minlength: 5,
//         maxlength: 255,
//         validate: {
//             validator: function (v) {
//                 // Simple email format validation
//                 return /\S+@\S+\.\S+/.test(v);
//             },
//             message: 'Invalid email format',
//         },
//     },
//     password: {
//         type: String,
//         required: true,
//         minlength: 8, // Adjust as needed
//         maxlength: 1024, // Adjust as needed
//     },
//     role: {
//         type: String,
//         enum: ['user', 'restaurant owner'],
//         default: 'user',
//     },
// });

// // Hash user password before saving it to the database
// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();

//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // Generate JWT token for the user
// userSchema.methods.generateAuthToken = function () {
//     const token = jwt.sign(
//         { _id: this._id, role: this.role },
//         jwtSecretKey, // Use the hardcoded secret key
//         { expiresIn: '1h' }
//     );
//     return token;
// // userSchema.methods.generateAuthToken = function () {
// //     const token = jwt.sign(
// //         { _id: this._id, role: this.role },
// //         process.env.JWT_SECRET, // Replace with your actual secret key stored in environment variables
// //         { expiresIn: '1h' } // Token expiration time
// //     );
// //     return token;
// };

// const User = mongoose.model('User', userSchema);

// module.exports = User;




// // const mongoose = require('mongoose');
// // const bcrypt = require('bcryptjs');
// // const jwt = require('jsonwebtoken');

// // const userSchema = new mongoose.Schema({
// //     name: {
// //         type: String,
// //         required: true,
// //         minlength: 2,
// //         maxlength: 255,
// //     },
// //     email: {
// //         type: String,
// //         required: true,
// //         unique: true,
// //         minlength: 5,
// //         maxlength: 255,
// //     },
// //     password: {
// //         type: String,
// //         required: true,
// //         minlength: 8, // Adjust as needed
// //         maxlength: 1024, // Adjust as needed
// //     },
// // });

// // // Hash user password before saving it to the database
// // userSchema.pre('save', async function (next) {
// //     if (!this.isModified('password')) return next();

// //     const salt = await bcrypt.genSalt(10);
// //     this.password = await bcrypt.hash(this.password, salt);
// //     next();
// // });

// // // Generate JWT token for the user
// // userSchema.methods.generateAuthToken = function () {
// //     const token = jwt.sign(
// //         { _id: this._id },
// //         'your-secret-key', // Replace with your actual secret key
// //         { expiresIn: '1h' } // Token expiration time
// //     );
// //     return token;
// // };

// // const User = mongoose.model('User', userSchema);

// // module.exports = User;






