const router = require('express').Router();
const favouriteController = require('../controllers/favouriteController');

router.route('/new')
	.post(favouriteController.saveNew)

router.route('/remove')
	.delete(favouriteController.removeFavourite)

module.exports = router;