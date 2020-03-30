const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.route('/')
	.post(userController.findOne)
	.patch(userController.updateOne);

router.route('/password')
	.patch(userController.updateOnePassword);

router.route('/current')
	.get(userController.findUser)

router.route('/new')
	.post(userController.saveNew);

router.route('/authenticate')
	.get(userController.authenticate);

router.route('/login')
	.post(passport.authenticate('local'), userController.login);

router.route('/logout')
	.get(userController.logout);

module.exports = router;