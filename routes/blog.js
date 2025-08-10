const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const { marked } = require("marked");

// Utility to get common sidebar data
async function getSidebarData() {
  const trending = await Blog.find().sort({ views: -1 }).limit(5).exec();
  const categories = await Blog.distinct("category", { category: { $ne: null } });
  return { trending, categories };
}

// Home page
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 }).exec();
    const { trending, categories } = await getSidebarData();
    res.render("index", { blogs, trending, categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Single blog page
router.get("/blog/:slug", async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).send("Blog not found");

    // Convert markdown to HTML
    const htmlContent = marked(blog.markdown || "");

    // Recommendations
    const recommendations = await Blog.find({ slug: { $ne: blog.slug } })
      .sort({ createdAt: -1 })
      .limit(3);

    const { trending, categories } = await getSidebarData();

    res.render("blog", {
      blog: { ...blog.toObject(), htmlContent },
      recommendations,
      trending,
      categories
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Search
router.get('/search', async (req, res) => {
  try {
    const q = req.query.q || '';
    const blogs = await Blog.find({ title: new RegExp(q, 'i') }).sort({ createdAt: -1 });
    const { trending, categories } = await getSidebarData();
    res.render('index', { blogs, trending, categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Category
router.get("/category/:name", async (req, res) => {
  try {
    const blogs = await Blog.find({ category: req.params.name }).sort({ createdAt: -1 }).exec();
    const { trending, categories } = await getSidebarData();
    res.render("index", { blogs, trending, categories });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
