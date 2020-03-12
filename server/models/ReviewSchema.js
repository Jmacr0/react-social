const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
	author: {
		type: String,
		ref: 'User'
	},
	title: {
		type: String,
		trim: true,
		required: "Title is Required"
	},
	body: {
		type: String,
		trim: true,
		required: true
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	img: {
		type: String,
		default: 'https://via.placeholder.com/150'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Review = model("Review", ReviewSchema);

module.exports = Review;