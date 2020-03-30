const router = require('express').Router();
const commentController = require('../controllers/commentController');

router.route('/new')
	.post(commentController.saveNew)

router.route('/one/edit/:id')
	.get(commentController.getOne)

router.route('/one/edit')
	.patch(commentController.updateOne)

router.route('/one/delete')
	.delete(commentController.deleteOne)

module.exports = router;