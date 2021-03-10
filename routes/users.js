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
      const user = await db.User.findOne({ where: { username } });

      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
        if (passwordMatch) {
          loginUser(req, res, user);

          // wrap redirect in session.save to force session update before redirecting
          req.session.save(() => {
            res.redirect(`/`);
          })
          return
        }
      }
      
      errors.push('login failed for the provided username and password');
    } else {
      errors = validatorErrors.array().map((error) => error.msg);
    }

    res.render('users-login', {
      username,
      errors,
      csrfToken: req.csrfToken(),
    });
  }));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  req.session.save(() => {
    res.redirect('/');
  })
});

router.get('/register', function(req, res, next) {
  res.send('GET /users/register page!');
});

module.exports = router;
