const express = require("express");
const router = express.Router();
const db = require('../models');
const bcrypt = require('bcryptjs');
const passport = require('passport');

// Check if authenticated
router.get('/user/authenticate', (req, res) => {
	res.json(req.user ? true : false);
})

// Review Routes
router.get('/review/all', (req, res) => {
	db.Review.find({})
		.then(allReviews => {
			res.json(allReviews);
		})
		.catch(err => {
			res.json(err);
		})
})

router.post('/review/new', async (req, res) => {
	try {
		const { item, title, rating, pros, cons, description } = req.body;
		const { username } = req.user;
		const loggedUser = await db.User
			.findOne({ username })
			.populate('reviews');
		const newReview = await db.Review
			.create({
				author: loggedUser.username,
				item,
				title,
				rating,
				pros,
				cons,
				description
			});
		const updateUser = await db.User
			.findOneAndUpdate({
				username: loggedUser.username
			}, {
				$push: {
					reviews: newReview
				}
			}, {
				new: true
			});
		console.log(updateUser);
		res.status(200).json('/');
	} catch (err) {
		console.log(err)
		res.status(500);
	}
})

// User Routes
router.post('/user/new', ({ body: { username, email, password } }, res) => {
	db.User.findOne({
		username,
	})
		.then(async (user) => {
			if (user) {
				console.log('Username already Exists!')
				return;
			}
			const hashedPassword = bcrypt.hashSync(password, 10);
			const newUser = await db.User.create({
				username,
				email,
				password: hashedPassword,
			})
			return newUser;
		})
		.then(user => {
			console.log(`New User Created: ${user}`);
			res.status(200);
		})
		.catch(err => {
			console.log(err);
		})
})

router.post('/user/login', passport.authenticate('local'), (req, res) => {
	console.log('successfully logged in');
	console.log(req.user)
	res.status(200).json('/');
});

router.get('/user/logout', (req, res) => {
	req.logout();
	console.log('logged out!')
	console.log(req.user)
	res.status(200).json('/sign-up');
})

// Test
router.post('/find', (req, res) => {
	db.User.findOne({ username: 'Jmacro0' })
		.select('review')
		.populate('review', 'title')
		.then(data => {
			console.log(data)
			res.json(data);
		})
})

module.exports = router;