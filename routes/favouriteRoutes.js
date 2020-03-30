const router = require('express').Router();
const favouriteController = require('../controllers/favouriteController');

router.route('/new')
	.post(favouriteController.saveNew)

router.route('/remove')
	.patch(favouriteController.removeFavourite)

router.route('/getAll')
	.get(favouriteController.getAllUserFavourites)

module.exports = router;