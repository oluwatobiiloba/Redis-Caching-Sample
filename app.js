const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const response = require('./utils/customResponse');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const redis = require('./utils/redis.js');
const utility = require('./utils/utility')
const redisCache = require('./middleware/redisCache.js');
const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// Logger and body parser middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Custom response middleware
app.use(response);

// Redis connection
const connectToRedis = async () => {
  try {
    await redis.connect();
    console.log('Connected to the Redis server');
  } catch (error) {
    console.error('Error connecting to Redis:', error);
  }
};

// Call the function to connect to Redis
connectToRedis();

// Routes
const excludeClearCacheRoutes = []; //Routes to be excluded from the cache clearing
const clearCacheMiddleware = (req, res, next) => {
  if (req.method === 'POST' && !excludeClearCacheRoutes.includes(utility.removePathSegments(req.path))) {
        console.log('Clearing cache with key:', req.originalUrl);
        redisCache.addClearCache(req, res, next);
    } else {
        next();
    }
};

app.use(clearCacheMiddleware);
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 404 error handler
app.use((req, res, next) => {
  next(createError(404));
});

// General error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;