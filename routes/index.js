const router = require('express').Router();

const { routerMovie } = require('./movies');
const { routerUser } = require('./users');
const { NotFoundError } = require('../error/NotFoundError');
const { auth } = require('../middlewares/auth');
const { createUser, login, out } = require('../controllers/users');
const { createUserValidation, loginValidation } = require('../utils/validation');
const { errorMessage } = require('../utils/error');

router.post('/signup', createUserValidation, createUser);
router.post('/signin', loginValidation, login);
router.post('/signout', out);

router.all(auth);

router.use('/users', routerUser);
router.use('/movies', routerMovie);

router.all('*', () => {
  throw new NotFoundError(errorMessage.notPageFoundMessage);
});

module.exports = router;
