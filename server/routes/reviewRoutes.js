const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

router.route('/all')
	.get(reviewController.findAll)

router.route('/all/:type')
	.get(reviewController.findAllType)

router.route('/all/search/:search')
	.get(reviewController.findAllSearch)

router.route('/new')
	.post(reviewController.saveNew)

router.route('/one/:id')
	.get(reviewController.findOne)

module.exports = router;