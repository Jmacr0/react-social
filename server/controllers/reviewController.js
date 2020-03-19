const db = require('../models/index');

module.exports = {
	findAll: (req, res) => {
		db.Review.find({})
			.sort({ createdAt: 'desc' })
			.then(allReviews => {
				res.json(allReviews);
			})
			.catch(err => {
				res.json(err);
			})
	},
	findOne: (req, res) => {
		const { id } = req.params;
		db.Review.findById(id)
			.populate({
				path: 'comments',
				populate: {
					path: 'author',
					model: 'User',
					select: 'username'
				}
			})
			.then(review => {
				res.json(review);
			})
			.catch(err => {
				res.json(err);
			})
	},
	saveNew: async (req, res) => {
		try {
			const { item, title, rating, category, pros, cons, description } = req.body;
			const { username } = req.user;

			const newReview = await db.Review
				.create({
					author: username,
					item,
					title,
					rating,
					category,
					pros,
					cons,
					description
				});
			const updateUser = await db.User
				.findOneAndUpdate({
					username,
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
	}
}