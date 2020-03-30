const { Schema, model } = require("mongoose");

const FavouriteSchema = new Schema({
	review: {
		type: Schema.Types.ObjectId,
		ref: 'Review'
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const Favourite = model("Favourite", FavouriteSchema);

module.exports = Favourite;
