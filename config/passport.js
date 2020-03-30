const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');
const db = require('../models/index');

module.exports = {
	authenticate: (passport) => {
		passport.use(
			new LocalStrategy(
				async (username, password, done) => {
					try {
						const findUser = await db.User
							.findOne({
								username,
							})
						if (!findUser) {
							throw new Error();
						}
						bcrypt.compare(password, findUser.password, (err, isMatch) => {
							if (isMatch) {
								done(null, findUser);
								return;
							}
							throw new Error(err);
						});
					} catch (err) {
						done(null, false, { message: 'The Username or Password Entered is Incorrect.' });
						return;
					}

					passport.serializeUser(function (user, done) {
						done(null, user.id);
					});

					passport.deserializeUser(function (id, done) {
						db.User.findById(id, function (err, user) {
							done(err, user);
						});
					});
				}
			));
	}
}


