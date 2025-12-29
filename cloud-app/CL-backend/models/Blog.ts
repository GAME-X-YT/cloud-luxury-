import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: String, default: 'Editorial' },
  imageUrl: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

// This "export default" makes it a module!
const Blog = mongoose.model('Blog', blogSchema);
export default Blog;