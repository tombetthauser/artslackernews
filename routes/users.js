const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');

const router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('GET /users page!');
});

router.get('/login', csrfProtection, function(req, res, next) {
  // res.send('GET /users/login page!');
  res.render('users-login', { csrfToken: req.csrfToken() })
});

const loginValidators = [
  check('username')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a username'),
  check('password')
    .exists({ checkFalsy: true })
    .withMessage('Please provide a password'),
];

router.post('/login', csrfProtection, loginValidators,
  asyncHandler(async (req, res) => {
    const {
      username,
      password,
    } = req.body;

    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      // Attempt to get the user by their email address.
      const user = await db.User.findOne({ where: { username } });

      if (user !== null) {
        // If the user exists then compare their password
        // to the provided password.
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());

        if (passwordMatch) {
          // If the password hashes match, then login the user
          // and redirect them to the default route.
          loginUser(req, res, user);
          return res.redirect(`/#${user.username}-${user.id}`);
        }
      }

      // Otherwise display an error message to the user.
      errors.push('Login failed for the provided email address and password');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('users-login', {
      username,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));

router.get('/register', function(req, res, next) {
  res.send('GET /users/register page!');
});

module.exports = router;
