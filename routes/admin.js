const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');


router.get("/add-form", (req, res) => {
    res.render("admin/add-form");
});


// Show Admin Panel (List all blogs)
router.get('/', async (req, res) => {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.render('admin', { blogs });
});

// Add Blog (POST)
router.post("/add", async (req, res) => {
    try {
        const { title, subtitle, author, markdown, keywords, category } = req.body;

        const blog = new Blog({
            title,
            subtitle,
            author,
            markdown,
            category,
            keywords: keywords ? keywords.split(",").map(k => k.trim()) : []
        });

        await blog.save();
        res.redirect("/admin");
    } catch (err) {
        console.error(err);
        res.status(500).send("Error saving blog");
    }
});


// Delete Single Blog
router.post('/delete/:id', async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting blog');
    }
});

// Delete All Blogs
router.post('/delete-all', async (req, res) => {
    try {
        await Blog.deleteMany({});
        res.redirect('/admin');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error deleting all blogs');
    }
});

module.exports = router;
