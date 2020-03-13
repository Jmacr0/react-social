const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();
const PORT = process.env.PLACEHOLDER || 3001;
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
app.use(cookieParser('secret'));

// Express Session
app.use(session({
	// secret is string used as hash
	secret: 'secret',
	saveUninitialized: true,
	resave: false,

}));

// Passport init
// require('../config/passport');
// app.use(passport.initialize());
// // calls deserialize
// app.use(passport.session());

app.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reviewMeDB", { useNewUrlParser: true });

app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`);
});