var express = require('express');
const db = require('../db/models');
const { check, validationResult } = require('express-validator');
const { csrfProtection, asyncHandler } = require('./utils');

var Sequelize = require('sequelize');
const Op = Sequelize.Op;

var router = express.Router();

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const comment = await db.Comment.findByPk(commentId, { include: [ "user", "post" ] })
  res.render('comment-show', { comment, csrfToken: req.csrfToken() });
}));

router.get('/new/:id', csrfProtection, asyncHandler(async (req, res) => {
  res.render('comment-add', { csrfToken: req.csrfToken() });
}));

const postValidators = [
  check('text')
    .exists({ checkFalsy: true }).withMessage('comment text cannot be empty')
];

router.post('/new', csrfProtection, postValidators, asyncHandler(async (req, res) => {
    if (res.locals.user) {
      const { text, postId, commentId } = req.body;
      const validatorErrors = validationResult(req);
      const userId = res.locals.user.id;
      const comment = db.Comment.build({ text, userId, postId, commentId });
  
      if (validatorErrors.isEmpty()) {
        await comment.save();
        req.session.save(() => {
          if (postId) {
            res.redirect(`/posts/${postId}`);
          } else {
            res.redirect(`/posts`);
          }
        })
      } else {
        const errors = validatorErrors.array().map((error) => error.msg);
        res.render('comment-add', { ext, postId, commentId, errors, csrfToken: req.csrfToken() });
      }
    } else {
      res.locals.commentStorage = { commentId: req.body.commentId, postId: req.body.postId, text: req.body.text};
      res.redirect('/users/login')
    }
  }));
  

router.get('/:id/delete', csrfProtection, asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const comment = await db.Comment.findByPk(commentId, { include: [ "user", "post" ] });
  if (res.locals.user && ((comment.user.id === res.locals.user.id) || (res.locals.user.username === 'tombetthauser'))) {
    res.render('comment-delete', { csrfToken: req.csrfToken(), comment });
  } else {
    res.redirect(`/posts/${post ? post.id : ''}`);
  }
}));

router.post('/:id/delete', csrfProtection, asyncHandler(async (req, res) => {
  const commentId = parseInt(req.params.id, 10);
  const comment = await db.Comment.findByPk(commentId, { include: [ "post" ] });
  const postId = comment.post ? comment.post.id : '';
  await comment.destroy();
  req.session.save(() => {
    res.redirect(`/posts/${postId}`);
  })
}));

module.exports = router;
