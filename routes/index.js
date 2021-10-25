const router = require('express').Router();

const { signin, signout, createUser } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { signinValidation, signupValidation } = require('../middlewares/validation');

router.post('/signin', signinValidation, signin);

router.post('/signout', signout);

router.post('/signup', signupValidation, createUser);

router.use('/users', auth, require('./users'));

router.use('/movies', auth, require('./movies'));

module.exports = router;
