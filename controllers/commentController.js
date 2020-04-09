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
			await db.User
				.findOneAndUpdate({
					username,
				}, {
					$push: {
						comments: newComment
					}
				}, {
					new: true
				});
			await db.Review
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
	},
	getOne: async (req, res) => {
		try {
			const comment = await db.Comment.findById(req.params.id);
			res.status(200).json(comment);
		} catch (err) {
			console.log(err);
		}
	},
	updateOne: async (req, res) => {
		try {
			console.log(req.body);
			const { _id, review, author, body, updatedAt } = req.body;
			const updateComment = await db.Comment.findByIdAndUpdate(_id, {
				body,
				updatedAt: Date.now()
			});
			res.status(200).json(updateComment);
		} catch (err) {
			console.log(err);
		}
	},
	deleteOne: async (req, res) => {
		try {
			const { comment, author, review } = req.body;
			const deleteComment = await db.Comment.deleteOne({ _id: comment });
			await db.User.findByIdAndUpdate(author, {
				$pull: {
					comments: {
						$in: [{
							_id: comment
						}]
					}
				}
			}, {
				new: true
			});
			await db.Review.findByIdAndUpdate(review, {
				$pull: {
					comments: {
						$in: [{
							_id: comment
						}]
					}
				}
			}, {
				new: true
			});
			res.status(200).json(deleteComment);
		} catch (err) {
			console.log(err);
			res.status(500);
		}
	}
}