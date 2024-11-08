var express = require('express');
var router = express.Router();


// 用户路由
const userRouter = require('./users')
router.use("/api/users",userRouter)

// 文章路由
const articleRouter = require('./articles')
router.use("/api/articles",articleRouter)


module.exports = router;
