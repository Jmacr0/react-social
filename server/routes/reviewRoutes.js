const router = require('express').Router();
const reviewController = require('../controllers/reviewController');

router.route('/all')
	.get(reviewController.findAll)

router.route('/new')
	.post(reviewController.saveNew)

router.route('/one/:id')
	.get(reviewController.findOne)

module.exports = router;