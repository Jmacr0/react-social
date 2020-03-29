const db = require('../models/index');

module.exports = {
	findAll: (req, res) => {
		db.Review.find({})
			.populate('favourites')
			.populate('author')
			.sort({ createdAt: 'desc' })
			.then(allReviews => {
				res.json(allReviews);
			})
			.catch(err => {
				res.json(err);
			})
	},
	findAllType: (req, res) => {
		const { type } = req.params;
		db.Review.find({
			category: type
		})
			.populate('favourites')
			.populate('author')
			.sort({ createdAt: 'desc' })
			.then(allReviews => {
				res.json(allReviews);
			})
			.catch(err => {
				res.json(err);
			})
	},
	findAllSearch: (req, res) => {
		const { search } = req.params;
		db.Review.find({
			'item': { "$regex": search, "$options": "i" }
		})
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
				path: 'author',
				model: 'User',
				select: 'username'
			})
			.populate({
				path: 'comments',
				populate: {
					path: 'author',
					model: 'User',
					select: 'username'
				}
			})
			.populate('favourites')
			.then(review => {
				res.json(review);
			})
			.catch(err => {
				res.json(err);
			})
	},
	saveNew: async (req, res) => {
		try {
			const { item, title, rating, category, pros, cons, img, description } = req.body;
			const { id, username } = req.user;
			console.log('backend!!!!')
			console.log(req.user)
			console.log(req.body)

			const newReview = await db.Review
				.create({
					author: id,
					item,
					title,
					rating,
					category,
					pros,
					cons,
					img,
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
			res.status(200).json(updateUser);
		} catch (err) {
			console.log(err)
			res.status(500);
		}
	},
	updateOne: async (req, res) => {
		const { _id, item, title, rating, category, pros, cons, img, description } = req.body;
		const updateReview = await db.Review.findByIdAndUpdate(_id,
			{
				item,
				title,
				rating,
				category,
				pros,
				cons,
				img,
				description
			}, {
			new: true
		});
		console.log(updateReview);
		res.status(200).json({ updateReview, redirect: `/review/one/edit/${_id}` })
	},
	deleteOne: async (req, res) => {
		try {
			console.log('deleting....', req.body);
			const { review, author } = req.body;
			const deletedReview = await db.Review.deleteOne({ _id: review });
			const deleteFromUser = await db.User.findByIdAndUpdate(author, {
				$pull: {
					reviews: { _id: review }
				}
			}, {
				new: true
			});
			console.log('deleting from user....', deleteFromUser);
			const deleteFromComments = await db.Comment.deleteMany({ review });
			const deleteFromFavourites = await db.Favourite.deleteMany({ review });
			res.status(200).json(deleteFromUser);
		} catch (err) {
			console.log(err);
			res.status(500);
		}
	}
}