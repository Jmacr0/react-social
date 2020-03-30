const express = require("express");
const router = express.Router();
const db = require('../models');
const reviewRoutes = require('./reviewRoutes');
const userRoutes = require('./userRoutes');
const commentRoutes = require('./commentRoutes');
const favouriteRoutes = require('./favouriteRoutes');

// Review Routes
router.use('/review', reviewRoutes);
// User Routes
router.use('/user', userRoutes);
// Comment Routes
router.use('/comment', commentRoutes);
// Favourite Routes
router.use('/favourite', favouriteRoutes);
// Test
router.post('/find', (req, res) => {
	db.User.findOne({ username: 'Jmacro0' })
		.select('review')
		.populate('review', 'title')
		.then(data => {
			console.log(data)
			res.json(data);
		})
})

module.exports = router;