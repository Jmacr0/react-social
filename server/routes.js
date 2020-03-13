const express = require("express");
const router = express.Router();
const db = require('./models');

router.get('/reviews', (req, res) => {
	db.Review.find({})
		.then(data => {
			console.log(data)
			res.json(data);
		})
		.catch(err => {
			res.json(err);
		})
})

router.post('/new-user', ({ body: { username, email, password } }, res) => {
	db.User.create({
		username,
		email,
		password
	})
})

router.post('/new-review', async (req, res) => {
	try {
		console.log(req.body)
		const user = await
			db.User
				.findOne({ username: 'Jmacro0' })
				.populate('reviews');
		const newReview = await db.Review.create({
			author: user.username,
			title: req.body.title,
			body: req.body.body
		});
		// newReview.save();
		// user.reviews.push(newReview);
		// user.save();
		const newUser = await db.User.findOneAndUpdate({
			username: user.username
		}, {
			$push: {
				reviews: newReview
			}
		}, {
			new: true
		});
		console.log(newUser);
		res.end();
	} catch (err) {
		console.log(err)
		res.status(500);
	}
})

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