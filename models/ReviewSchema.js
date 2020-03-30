const { Schema, model } = require("mongoose");

const ReviewSchema = new Schema({
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	item: {
		type: String,
		trim: true,
		required: "Item Name is Required"
	},
	title: {
		type: String,
		trim: true,
		required: "Title is Required"
	},
	pros: {
		type: String,
		trim: true,
	},
	cons: {
		type: String,
		trim: true,
	},
	category: {
		type: String,
		default: 'Miscellaneous'
	},
	rating: {
		type: Number,
		min: 1,
		max: 5,
		required: true
	},
	description: {
		type: String,
		trim: true,
		required: true
	},
	img: {
		type: String,
		default: 'https://via.placeholder.com/150'
	},
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	favourites: [{
		type: Schema.Types.ObjectId,
		ref: 'Favourite'
	}],
	createdAt: {
		type: Date,
		default: Date.now
	},
	updatedAt: {
		type: Date,
		default: Date.now
	}
});

const Review = model("Review", ReviewSchema);

module.exports = Review;