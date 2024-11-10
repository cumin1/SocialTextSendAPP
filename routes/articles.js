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

// 获取文章列表
router.get("/", async function (req, res, next) {
    const { page = 1, limit = 10 } = req.query; // 从查询参数中获取page和limit，设置默认值

    const skip = (page - 1) * limit; // 计算跳过的文档数量

    try {
        const articles = await Article.find() // 查询所有文章
            .skip(skip) // 跳过前面的文档
            .limit(parseInt(limit)); // 限制返回的文档数量

        const totalArticles = await Article.countDocuments(); // 获取总文章数量

        res.status(200).json({
            status: "success",
            message: "获取文章列表成功!",
            data: {
                articles: articles,
                total: totalArticles,
                page: parseInt(page),
                limit: parseInt(limit)
            }
        });
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: "获取文章列表失败!",
            data: err.message
        });
    }
})

// 获取文章详情接口  
router.get("/:article_id", async function (req, res, next) {
    const article_id = req.params.article_id;

    try {
        const articleById = await Article.findOne({ _id: article_id });

        if (!articleById) {
            return res.status(401).json({
                "status": "error",
                "message": "文章不存在"
            })
        }

        return res.status(200).json({
            "status": "success",
            "message": {
                title: articleById.title,
                tags: articleById.tags
            }
        })
    } catch (err) {
        res.status(500).json({
            status: "error",
            message: err.message
        })
    }

})

// 更新文章接口
router.put("/:article_id", async function (req, res, next) {
    const article_id = req.params.article_id;
    const { title, content, tags } = req.body;

    try {
        const updateArticle = await Article.findOneAndUpdate(
            { _id: article_id },
            { title, content, tags },
            { new: true, runValidators: true }
        )

        if (!updateArticle) {
            return res.status(404).json({
                status: "error",
                message: "文章不存在!"
            })
        }

        // 返回更新后的文章
        return res.status(200).json({
            status: "success",
            message: "文章更新成功",
            data: updateArticle
        });

    } catch (err) {
        return res.status(500).json({
            status: "error",
            message: err.message
        })
    }

})


module.exports = router;