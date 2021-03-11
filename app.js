const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');

// const { environment, sessionSecret } = require('./config');
const { restoreUser } = require('./auth');

const { environment, sessionSecret } = require('./config');
const createError = require('http-errors');
const path = require('path');
const { sequelize } = require('./db/models');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const usersRouter = require('./routes/users');
const postsRouter = require('./routes/posts');

const app = express();

const store = new SequelizeStore({ db: sequelize });

app.set('view engine', 'pug');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(logger('dev'));
app.use(cookieParser(sessionSecret));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store,
}));
app.use(express.urlencoded({ extended: false }));
app.use(restoreUser);

// prevents caching, seems to help a little possibly but not totally fixed
app.use((req, res, next) => {
  res.set('Cache-Control', 'no-store')
  next()
})

// create Session table if it doesn't already exist
// wouldn't be necessary if you created a migration for the session table
store.sync();


app.use('/users', usersRouter);
app.use('/posts', postsRouter);

app.get('/', (req, res) => {
  res.redirect('/posts')
})

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
