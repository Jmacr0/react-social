const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
	_id: Schema.Types.ObjectId,
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
	experience: {
		type: Number,
		required: true,
	},
	reviews: [{
		type: Schema.Types.ObjectId,
		ref: 'Review'
	}],
	favourites: [{
		type: Schema.Types.ObjectId,
		ref: 'Review'
	}],
	createdAt: {
		type: Date,
		default: Date.now
	}
});

const User = model("User", UserSchema);

module.exports = User;
