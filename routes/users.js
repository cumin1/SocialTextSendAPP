var express = require('express');
var router = express.Router();
const User = require('../models/User')
const jwt = require('jsonwebtoken')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('this is users route');
});

// 用户注册接口
router.post('/register', function (req, res, next) {
  const { username, email, password } = req.body;

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

// 用户登录接口
router.post('/login', async function (req, res, next) {
  const { email, password } = req.body;

  try {
    // 查询用户
    const user = await User.findOne({ email: email }); // 使用await

    // 当没有找到用户的逻辑
    if (!user) {
      return res.status(400).json({
        status: "error",
        message: "用户未找到"
      });
    }


    // 检查密码
    if (user.password !== password) {
      return res.status(401).json({
        status: "error",
        message: "密码错误"
      });
    }

    // 生成JWT
    const token = jwt.sign({ id: user._id, email: user.email }, '123456', { expiresIn: '1h' });

    return res.status(200).json({
      status: "success",
      massage: "登录成功",
      data: {
        user: {
          id: user._id,
          email: user.email,
          username: user.username
        },
        token: token // 返回生成的令牌
      }
    });
  } catch (err) {
    res.status(500).json({
      status: "error",
      message: err.message
    });
  }
});

// 用户信息接口
router.get("/:email", async function (req, res, next) {
  const email = req.params.email;

  // 查询用户
  const user = await User.findOne({ email: email });

  if (!user) {
    return res.status(500).json({
      status: "error",
      message: "用户不存在"
    });
  }

  return res.status(200).json({
    status: "success",
    message: "用户存在"
  });

})

module.exports = router;
