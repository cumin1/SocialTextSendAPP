var express = require('express');
var router = express.Router();


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('this is users route');
});

// 用户注册接口
router.post('/register',function(req,res,next){
    const {username,email,password} = req.body;
    const data = {
      "username": username,
      "email": email,
      "password": password
    }

    res.status(200).json({
      status: "success",
      message: "accept the params",
      data: data
    })
})

module.exports = router;
