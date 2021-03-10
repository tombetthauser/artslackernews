var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('GET /users page!');
});

router.get('/login', function(req, res, next) {
  // res.send('GET /users/login page!');
  res.render('users-login')
});

router.get('/register', function(req, res, next) {
  res.send('GET /users/register page!');
});

module.exports = router;
