var express = require('express');
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var router = express.Router();

router.get('/:id(\\d+)', asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await db.Post.findByPk(postId, { 
    include: [
      { model: db.User, as: "user" },
      { 
        model: db.Comment, 
        as: "comments",
        include: [
          { model: db.User, as: "user" },
          { 
            model: db.Comment, 
            as: "comments", 
            include: [
              { model: db.User, as: "user" },
              { 
                model: db.Comment, 
                as: "comments",
                include: [
                    { model: db.User, as: "user" }
                  ]
              }
            ]
          }
        ]
      },
    ] 
  } );

  res.render('comment-show', { comment });
}));

router.get('/new/:id', csrfProtection, asyncHandler(async (req, res) => {
  res.render('comment-add', { csrfToken: req.csrfToken() });
}));

const postValidators = [
  check('text')
    .exists({ checkFalsy: true }).withMessage('comment text cannot be empty')
];

router.post('/new', csrfProtection, postValidators,
  asyncHandler(async (req, res) => {
    const { text, postId, commentId } = req.body;
    const validatorErrors = validationResult(req);
    const userId = res.locals.user.id;
    const comment = db.Comment.build({ text, userId, postId, commentId });

    if (validatorErrors.isEmpty()) {
      await comment.save();
      req.session.save(() => {
        res.redirect(`/posts/${postId}`);
      })
    } else {
      const errors = validatorErrors.array().map((error) => error.msg);
      res.render('comment-add', { ext, postId, commentId, errors, csrfToken: req.csrfToken() });
    }
  }));
  

router.get('/:id/delete', csrfProtection, asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const post = await db.Comment.findByPk(commentId);
  if (res.locals.user && post.user.id === res.locals.user.id) {
    res.render('comment-delete', { csrfToken: req.csrfToken(), post });
  } else {
    res.redirect(`/posts/${post.id}`);
  }
}));

router.post('/:id/delete', csrfProtection, asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const comment = await db.Comment.findByPk(commentId, {
    include: [{ model: db.Post, as: "post" },
] });
  await comment.destroy();
  res.redirect(`/posts/${comment.post.id}`);
}));

module.exports = router;
