const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');
const app = express();
const PORT = process.env.PORT || 3001;
const routes = require("./routes");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(express.static("public"));
app.use(cookieParser('secret'));

// Passport init
require('./config/passport').authenticate(passport);

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

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.join(__dirname, 'client', 'build', 'index.html')); //relative path  
	})
}

app.listen(PORT, () => {
	console.log(`App listening on PORT ${PORT}`);
});