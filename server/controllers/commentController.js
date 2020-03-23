const db = require('../models/index');

module.exports = {
	saveNew: async (req, res) => {
		try {
			console.log('start try!')
			const { review, body } = req.body;
			const { username, id } = req.user;
			const newComment = await db.Comment
				.create({
					review,
					author: id,
					body,
				});
			console.log('new-comment: ', newComment)
			const commentUser = await db.User
				.findOneAndUpdate({
					username,
				}, {
					$push: {
						comments: newComment
					}
				}, {
					new: true
				});
			const commentReview = await db.Review
				.findByIdAndUpdate(review, {
					$push: {
						comments: newComment
					}
				}, {
					new: true
				});
			res.status(200).json(newComment);
		} catch (err) {
			res.status(500);
		}
	}
}