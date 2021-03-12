var express = require('express');
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var router = express.Router();

router.get('/', asyncHandler(async (req, res) => {
  let posts = [];
  if (Object.entries(req.query).length === 0) {
    posts = await db.Post.findAll({ include: ["user"], order: [['createdAt', 'DESC']] });
  } else {
    const keys = Object.keys(req.query)

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i]
      const postSet = await db.Post.findAll({ 
        where: {
          [key]: {
            [Op.like]: '%' + req.query[key] + '%'
          }
        },
        include: ["user"], 
        order: [['createdAt', 'DESC']] 
      });

      posts.push(...postSet)
    }
  }
  res.render('index', { posts });
}));

router.get('/new', csrfProtection, asyncHandler(async (req, res) => {
  res.render('posts-add', { csrfToken: req.csrfToken() });
}));

const postValidators = [
  check('title')
    .exists({ checkFalsy: true }).withMessage('post must have a title')
    .isLength({ min: 10 }).withMessage('post title must not be less than 10 characters long')
    .isLength({ max: 50 }).withMessage('post title must not be more than 50 characters long'),
];

router.post('/new', csrfProtection, postValidators,
  asyncHandler(async (req, res) => {
    const { title, type, url, text } = req.body;
    const validatorErrors = validationResult(req);
    const userId = res.locals.user.id;
    const post = db.Post.build({ title, type, url, text, userId });

    if (validatorErrors.isEmpty()) {
      await post.save();
      req.session.save(() => {
        res.redirect('/');
      })
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('post-add', { title, url, text, csrfToken: req.csrfToken() });
    }
  }));

module.exports = router;
