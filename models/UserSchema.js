const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	username: {
		type: String,
		unique: true,
		trim: true,
		required: "Username is Required"
	},
	email: {
		type: String,
		unique: true,
		match: [/.+@.+\..+/, "Please enter a valid e-mail address"]
	},
	password: {
		type: String,
		trim: true,
		required: "Password is Required",
		validate: [({ length }) => length >= 6, "Password should be longer."]
	},
	bio: {
		type: String,
		trim: true,
		default: 'Your bio goes here. Edit your profile to change!'
	},
	img: {
		type: String,
		trim: true,
		default: 'https://via.placeholder.com/150'
	},
	experience: {
		type: Number,
		default: 0,
		required: true,
	},
	reviews: [{
		type: Schema.Types.ObjectId,
		ref: 'Review'
	}],
	favourites: [{
		type: Schema.Types.ObjectId,
		ref: 'Favourite'
	}],
	comments: [{
		type: Schema.Types.ObjectId,
		ref: 'Comment'
	}],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const User = model("User", UserSchema);

module.exports = User;
