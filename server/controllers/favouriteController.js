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
	}
}