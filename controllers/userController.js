const db = require('../models/index');
const bcrypt = require('bcryptjs');

module.exports = {
	authenticate: (req, res) => {
		const response = {
			user: (req.user ? true : false),
			id: (req.user ? req.user.id : '')
		}
		res.json(response);
	},
	login: (req, res) => {
		console.log('successfully logged in');
		console.log(req.user)
		res.status(200).json('/');
	},
	logout: (req, res) => {
		req.logout();
		console.log('logged out!')
		console.log(req.user)
		res.status(200).json('/sign-up');
	},
	findExisting: (req, res) => {
		const { username, email } = req.body;
		db.User.findOne({
			username,
			email
		})
			.then(user => {
				if (!user) {
					res.status(200).json(null);
				}
				let isLogged = {
					currentUser: false
				};
				if (user.username === req.user.username) {
					isLogged.currentUser = true;
				}
				const { _doc } = user;
				res.status(200).json({ ..._doc, isLogged });
			})
			.catch(err => {
				res.status(404).json(err);
			})
	},
	findCurrentUser: (req, res) => {
		db.User.findById(req.user.id)
			.populate({
				path: 'reviews',
				populate: {
					path: 'author',
					model: 'User'
				}

			})
			.populate('favourites')
			.then(user => {
				res.status(200).json(user);
			}).catch(err => {
				res.status(500).json(err);
			})
	},
	findUserProfile: ({ params }, res) => {
		db.User.findOne({
			username: params.user
		})
			.populate('reviews')
			.then(user => {
				res.status(200).json(user);
			}).catch(err => {
				res.status(500).json(err);
			})
	},
	updateOne: (req, res) => {
		const { username, email, bio, img } = req.body;
		db.User.findByIdAndUpdate(req.user.id, {
			username,
			email,
			bio,
			img
		}, {
			new: true
		})
			.then(updatedUser => {
				res.status(200).json(updatedUser);
			})
			.catch(err => {
				res.status(500).json(err);
			})
	},
	updateOnePassword: (req, res) => {
		const { currentPassword, newPassword } = req.body;
		bcrypt.compare(currentPassword, req.user.password, (err, isMatch) => {
			if (isMatch) {
				const hashedPassword = bcrypt.hashSync(newPassword, 10);
				db.User.findByIdAndUpdate(req.user.id, {
					password: hashedPassword
				}, {
					new: true
				})
					.then(updatedUser => {
						res.status(200).json({
							message: 'Password succesfully updated!',
							type: 'success'
						});
					})
					.catch(err => {
						res.status(500).json(err);
					})
			} else {
				res.json({
					message: 'Current password did not match',
					type: 'danger'
				});
			}
		});
	},
	saveNew: ({ body: { username, email, password } }, res) => {
		db.User.findOne({
			username,
			email,
		})
			.then(async (user) => {
				if (user) {
					console.log('Username or Email already Exists!')
					return;
				}
				const hashedPassword = bcrypt.hashSync(password, 10);
				const newUser = await db.User.create({
					username,
					email,
					password: hashedPassword,
				})
				return newUser;
			})
			.then(user => {
				console.log(`New User Created: ${user}`);
				res.status(200).json(user);
			})
			.catch(err => {
				console.log(err);
				res.json({
					message: 'Username or Email already Exists!',
					type: 'danger'
				})
			})
	}
}