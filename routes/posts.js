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
      let postSet;
      if (key === 'userId') {
        postSet = await db.Post.findAll({ 
          where: { [key]: parseInt(req.query[key]) },
          include: ["user"], 
          order: [['createdAt', 'DESC']] 
        });  
      } else {
        if (Array.isArray(req.query[key])) {
          let subPostSet = []
          for (let j = 0; j < req.query[key].length; j++) {
            const subKey = req.query[key][j];
            let subPosts = await db.Post.findAll({
              where: { [key]: { [Op.like]: '%' + subKey + '%' } },
              include: ["user"],
              order: [['createdAt', 'DESC']]
            });
            posts.push(...subPosts);
          }
          postSet = subPostSet;
        } else {
          postSet = await db.Post.findAll({ 
            where: { [key]: { [Op.like]: '%' + req.query[key] + '%' } },
            include: ["user"], 
            order: [['createdAt', 'DESC']] 
          });
        }
      }

      posts.push(...postSet)
    }
  }
  res.render('index', { posts });
}));

router.get('/:id(\\d+)', csrfProtection, asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await db.Post.findByPk(postId, { 
    include: [
      { model: db.User, as: "user" },
      { 
        model: db.Comment, 
        as: "comments",
        separate: true,
        order: [['updatedAt', 'asc']],
        include: [
          { model: db.User, as: "user" },
          { 
            model: db.Comment, 
            as: "comments", 
            separate: true,
            order: [['updatedAt', 'asc']],
            include: [
              { model: db.User, as: "user" },
              { 
                model: db.Comment, 
                as: "comments",
                separate: true,
                order: [['updatedAt', 'asc']],
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

  // sort first layer comments by date
  // if (post.comments.length > 1) {
  //   const comments1 = post.comments.slice();
  //   let isSorted = false;
  //   while (!isSorted) {
  //     for (let i = 0; i < comments1.length - 1; i++) {
  //       isSorted = true;
  //       const ele1 = comments1[i];
  //       const ele2 = comments1[i + 1];
  //       if (ele1.updatedAt < ele2.updatedAt) {
  //         [comments1[i], comments1[i + 1]] = [comments1[i + 1], comments1[i]];
  //         isSorted = false;
  //       }
  //     }
  //   }
  //   post.comments = comments1;
  // }

  // sort second layer comments by date
  // for (let i = 0; i < post.comments.length; i++) {
  //   const levelOneComment = post.comments[i];
  //   if (levelOneComment.comments.length > 1) {
  //     const levelTwoComments = levelOneComment.comments.slice();
  //     let isSorted = false;
  //     while (!isSorted) {
  //       for (let i = 0; i < levelTwoComments.length - 1; i++) {
  //         isSorted = true;
  //         const ele1 = levelTwoComments[i];
  //         const ele2 = levelTwoComments[i + 1];
  //         if (ele1.updatedAt < ele2.updatedAt) {
  //           [levelTwoComments[i], levelTwoComments[i + 1]] = [levelTwoComments[i + 1], levelTwoComments[i]];
  //           isSorted = false;
  //         }
  //       }
  //     }
  //     post.comments[i].comments = levelTwoComments;
  //   }
  // }

  // sort third layer comments by date
  // for (let i = 0; i < post.comments.length; i++) {
  //   const levelOneComment = post.comments[i];
  //   if (levelOneComment.comments.length > 1) {
  //     for (let j = 0; j < levelOneComment.comments.length; j++) {
  //       const levelTwoComment = post.comments[i].comments[j];
  //       if (levelTwoComment.comments.length > 1) {
  //         const levelThreeComments = levelTwoComment.comments.slice();
  //         let isSorted = false;
  //         while (!isSorted) {
  //           for (let k = 0; k < levelThreeComments.length - 1; k++) {
  //             isSorted = true;
  //             const ele1 = levelThreeComments[k];
  //             const ele2 = levelThreeComments[k + 1];
  //             if (ele1.updatedAt < ele2.updatedAt) {
  //               [levelThreeComments[k], levelThreeComments[k + 1]] = [levelThreeComments[k + 1], levelThreeComments[k]];
  //               isSorted = false;
  //             }
  //           }
  //         }
  //         post.comments[i].comments[j].comments = levelThreeComments;
  //       }
  //     }
  //   }
  // }

  // req.session.save(() => {
  res.render('post-show', { post, csrfToken: req.csrfToken() });
  // })
}));

router.get('/new', csrfProtection, asyncHandler(async (req, res) => {
  if (res.locals.user) {
    res.render('posts-add', { csrfToken: req.csrfToken() });
  } else {
    res.redirect('/users/login')
  }
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
      res.render('post-add', { title, url, text, errors, csrfToken: req.csrfToken() });
    }
  }));
  

router.get('/:id/delete', csrfProtection, asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await db.Post.findByPk(postId, { include: ["user"] });
  if (res.locals.user && post.user.id === res.locals.user.id) {
    res.render('post-delete', { csrfToken: req.csrfToken(), post });
  } else {
    res.redirect(`/posts/${post.id}`);
  }
}));

router.post('/:id/delete', csrfProtection, asyncHandler(async (req, res) => {
  const postId = parseInt(req.params.id, 10);
  const post = await db.Post.findByPk(postId);
  await post.destroy();
  res.redirect('/posts');
}));

module.exports = router;
