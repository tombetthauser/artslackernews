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

const registrationValidators = [
  check('username')
    .exists({ checkFalsy: true }).withMessage('please provide a username')
    .isLength({ min: 3 }).withMessage('username must not be less than 3 characters long')
    .isLength({ max: 50 }).withMessage('username must not be more than 50 characters long')
    .custom(value => !/\s/.test(value))
    .withMessage('spaces are allowed in your username (what were you thinking?)')
    .custom((value) => {
      return db.User.findOne({ where: { username: value } })
        .then((user) => {
          if (user) {
            return Promise.reject('username is already in use');
          }
        });
    }),
  check('password')
    .exists({ checkFalsy: true }).withMessage('please provide a value for password')
    .isLength({ min: 3 }).withMessage('password must not be less than 3 characters long')
    .isLength({ max: 50 }).withMessage('password must not be more than 50 characters long')
    .custom(value => !/\s/.test(value))
    .withMessage('spaces are allowed in your password (you monster)'),
  check('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('confirm password must match password');
    }
    return true;
  }),

  // optionally check password for special characters etc
  // check('password')
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/, 'g')
    // .withMessage('Password must contain at least 1 lowercase letter, uppercase letter, number, and special character (i.e. "!@#$%^&*")'),
];

router.post('/register', csrfProtection, registrationValidators,
  asyncHandler(async (req, res) => {
    const { username, password } = req.body;
    const validatorErrors = validationResult(req);
    const user = db.User.build({ username });

    if (validatorErrors.isEmpty()) {
      const hashedPassword = await bcrypt.hashSync(password);
      user.hashedPassword = hashedPassword;
      await user.save();
      loginUser(req, res, user);
      req.session.save(() => {
        res.redirect('/');
      })
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('users-register', { user, errors, csrfToken: req.csrfToken() });
    }
  }));

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