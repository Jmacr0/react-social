const router = require('express').Router();
const passport = require('passport');
const userController = require('../controllers/userController');

router.route('/')
	.post(userController.findExisting)
	.patch(userController.updateOne);

router.route('/one/:user')
	.get(userController.findUserProfile);

router.route('/password')
	.patch(userController.updateOnePassword);

router.route('/current')
	.get(userController.findCurrentUser);

router.route('/new')
	.post(userController.saveNew);

router.route('/authenticate')
	.get(userController.authenticate);

router.route('/login')
	.post(passport.authenticate('local'), userController.login);

router.route('/logout')
	.get(userController.logout);

module.exports = router;