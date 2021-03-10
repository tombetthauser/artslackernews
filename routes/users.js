const express = require('express');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

const db = require('../db/models');
const { csrfProtection, asyncHandler } = require('./utils');
const { loginUser, logoutUser } = require('../auth');

const router = express.Router();

router.get('/', function(_req, res) {
  res.send('GET /users page!');
});

router.get('/login', csrfProtection, function(req, res) {
  res.render('users-login', { csrfToken: req.csrfToken() })
});

router.get('/register', csrfProtection, function (req, res) {
  res.render('users-register', { csrfToken: req.csrfToken() })
});

const loginValidators = [
  check('username').exists({ checkFalsy: true }).withMessage('please provide a username'),
  check('password').exists({ checkFalsy: true }).withMessage('please provide a password')
];

router.post('/login', csrfProtection, loginValidators,
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    let errors = [];
    const validatorErrors = validationResult(req);

    if (validatorErrors.isEmpty()) {
      const user = await db.User.findOne({ where: { username } });
      if (user !== null) {
        const passwordMatch = await bcrypt.compare(password, user.hashedPassword.toString());
        if (passwordMatch) {
          loginUser(req, res, user);
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

    res.render('users-login', { username, errors, csrfToken: req.csrfToken() });
  }));

router.post('/logout', (req, res) => {
  logoutUser(req, res);
  req.session.save(() => {
    res.redirect('/');
  })
});

module.exports = router;