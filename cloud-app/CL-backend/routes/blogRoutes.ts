// import express from 'express';
// import multer from 'multer';
// import path from 'path';
// import Blog from '../models/Blog';

// const router = express.Router();

// // Configure storage for blog images
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads/');
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + path.extname(file.originalname));
//   },
// });

// const upload = multer({ storage });

// // POST: Create a new blog post
// router.post('/upload', upload.single('image'), async (req, res) => {
//   try {
//     if (!req.file) return res.status(400).json({ message: "Image is required" });

//     const newBlog = new Blog({
//       title: req.body.title,
//       excerpt: req.body.excerpt,
//       content: req.body.content,
//       category: req.body.category,
//       imageUrl: `/uploads/${req.file.filename}`,
//     });

//     await newBlog.save();
//     res.status(201).json({ message: "Article Published!" });
//   } catch (err) {
//     console.error("Blog Error:", err);
//     res.status(500).json({ message: "Failed to save blog post" });
//   }
// });

// // GET: Fetch all blog posts
// router.get('/', async (req, res) => {
//   try {
//     const blogs = await Blog.find().sort({ date: -1 });
//     res.json(blogs);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching blogs" });
//   }
// });

// export default router;




import express from 'express';
import multer from 'multer';
import path from 'path';
import fs from 'fs';
import Blog from '../models/Blog';
import { isAdmin } from '../middleware/authAdmin'; // Assuming you have this middleware

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// 1. POST: Create a new blog post
router.post('/upload', isAdmin, upload.single('image'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "Image is required" });

    const newBlog = new Blog({
      title: req.body.title,
      excerpt: req.body.excerpt,
      content: req.body.content,
      category: req.body.category || 'General',
      imageUrl: `/uploads/${req.file.filename}`,
    });

    await newBlog.save();
    res.status(201).json({ message: "Article Published!" });
  } catch (err) {
    res.status(500).json({ message: "Failed to save blog post" });
  }
});

// 2. GET: Fetch all blog posts
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: "Error fetching blogs" });
  }
});

// 3. PUT: Update a blog post
router.put('/:id', isAdmin, async (req, res) => {
  try {
    const { title, excerpt, content, category } = req.body;
    const updatedBlog = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, excerpt, content, category },
      { new: true }
    );
    
    if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
    res.json(updatedBlog);
  } catch (err) {
    res.status(500).json({ message: "Error updating blog" });
  }
});

// 4. DELETE: Remove a blog post (and its image)
router.delete('/:id', isAdmin, async (req, res) => {
  try {
    const blog = await Blog.findByIdAndDelete(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    // Clean up the image file from the server
    if (blog.imageUrl) {
      const filePath = path.join(process.cwd(), blog.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) console.error("Could not delete image file:", err);
        });
      }
    }

    res.json({ message: "Blog deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting blog" });
  }
});

export default router;