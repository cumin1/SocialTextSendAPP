var express = require('express');
var router = express.Router();
const Article = require('../models/Article');


// 发布文章接口
router.post("/", function (req, res, next) {
    const { title, content, tags } = req.body;

    const newArticle = new Article({
        title: title,
        content: content,
        tags: tags
    })

    try {
        newArticle.save();
        res.status(201).json({
            status: "success",
            message: "文章发布成功!",
            data: newArticle
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "文章发布失败!",
            data: err.message
        })
    }

})


module.exports = router;