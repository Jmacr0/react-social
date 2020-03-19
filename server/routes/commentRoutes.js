const router = require('express').Router();
const commentController = require('../controllers/commentController');

router.route('/new')
	.post(commentController.saveNew)

module.exports = router;