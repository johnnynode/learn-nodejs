var express = require('express');

var router = express.Router();

// 注意： 第一个参数必须是 / 而不能是 /users
router.get('/',(req,res,next) => {
  res.send('users page');
});

module.exports = router;