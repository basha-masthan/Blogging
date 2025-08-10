const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, unique: true },
    subtitle: { type: String, required: false }, // <-- new field
    author: String,
    markdown: String,
    content: String,
    keywords: [String],
    category: { type: String, required: false }, // <-- NEW FIELD
    createdAt: { type: Date, default: Date.now }
});


const slugify = require("slugify");

blogSchema.pre("save", function(next) {
  if (!this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true }) + "-" + Date.now();
  }
  next();
});

blogSchema.pre('save', function(next) {
  if (this.category) {
    const trimmed = this.category.trim().toLowerCase();
    this.category = trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
  }
  next();
});


module.exports = mongoose.model('Blog', blogSchema);
