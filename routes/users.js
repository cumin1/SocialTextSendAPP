var express = require('express');
var router = express.Router();
const User = require('../models/User')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is users route');
});

// 用户注册接口
router.post('/register',function(req,res,next){
    const {username,email,password} = req.body;
    
    // 注册用户
    const newUser = new User({
      username: username,
      email: email,
      password: password
    })

    try {
      newUser.save();
      res.status(201).json({
        status: "success",
        message: "用户注册成功!",
        data: newUser
      })
    } catch (err) {
      res.status(400).json({
        status: "error",
        message: err.message
      })
    }
    
})

module.exports = router;
