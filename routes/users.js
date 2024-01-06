var express = require('express');
var router = express.Router();
const redisCache = require('../middleware/redisCache');
const usersArray = []

/* GET users listing. */
router.get('/', redisCache.getCache, function(req, res, next) {
        try {
            const users = usersArray
            res.ok({
                status: "success",
                message: `User(s) retrieved`,
                data: users
            })
        } catch (error) {
          res.fail({
              status: "fail",
              message: error.message
          })
      }
});
/* POST User. */
router.post('/create', function(req, res, next) {
        try {
            const addUsers = usersArray.push(req.body.user)
            res.ok({
                status: "success",
                message: `User Added`,
                data: usersArray,
                statusCode: 201
            })
        } catch (error) {
          res.fail({
              status: "fail",
              message: error.message
          })
      }
});

module.exports = router;