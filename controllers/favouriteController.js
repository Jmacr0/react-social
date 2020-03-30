const db = require('../models/index');

module.exports = {
	saveNew: async (req, res) => {
		try {
			console.log('start try!')
			const { author, review } = req.body;
			console.log(author, review)
			const newFavourite = await db.Favourite
				.create({
					review,
					author,
				});
			console.log('new-favourite: ', newFavourite)
			const favouriteUser = await db.User
				.findByIdAndUpdate(author, {
					$push: {
						favourites: newFavourite
					}
				}, {
					new: true
				});
			const favouriteReview = await db.Review
				.findByIdAndUpdate(review, {
					$push: {
						favourites: newFavourite
					}
				}, {
					new: true
				});
			res.status(200).json(newFavourite);
		} catch (err) {
			res.status(500);
		}
	},
	removeFavourite: async (req, res) => {
		try {
			const { author, review } = req.body;
			console.log('unfavouriting.....')
			console.log(author, review)
			const unfavouriteFavourite = await db.Favourite.findOne({
				author,
				review
			})
				.remove()
				.exec();
			const { _id } = unfavouriteFavourite;
			console.log(unfavouriteFavourite);
			const unfavouriteUser = await db.User
				.findByIdAndUpdate(author, {
					$pull: {
						favourites: { _id }
					}
				}, {
					multi: true
				});
			const unfavouriteReview = await db.Review
				.findByIdAndUpdate(review, {
					$pull: {
						favourites: { _id }
					}
				}, {
					multi: true
				});
			res.status(200).json(unfavouriteFavourite);
		} catch (err) {
			res.status(500);
		}
	},
	getAllUserFavourites: async (req, res) => {
		try {
			const userFavourites = await db.User.findById(req.user.id)
				.populate({
					path: 'favourites',
					populate: {
						path: 'review',
						model: 'Review',
						populate: {
							path: 'favourites',
							model: 'Favourite'
						}
					}
				})
			console.log(userFavourites);
			res.status(200).json(userFavourites);
		} catch (err) {
			console.log(err);
		}
	}
}