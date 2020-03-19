const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
	review: {
		type: Schema.Types.ObjectId,
		ref: 'Review'
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	body: {
		type: String,
		trim: true,
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Comment = model("Comment", CommentSchema);

module.exports = Comment;
