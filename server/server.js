const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();
const PORT = process.env.PLACEHOLDER || 3001;
const routes = require("./routes/routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
app.use(cookieParser('secret'));

// Passport init
require('./passport/passport').authenticate(passport);

// Express Session
app.use(session({
	// secret is string used as hash
	secret: 'secret',
	saveUninitialized: true,
	resave: false,

}));

app.use(passport.initialize());
// calls deserialize
app.use(passport.session());

app.use('/api', routes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/reviewMeDB", { useNewUrlParser: true });

app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`);
});