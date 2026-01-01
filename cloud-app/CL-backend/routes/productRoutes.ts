// import express, { Request, Response } from 'express';
// import multer from 'multer';
// import Product from '../models/Product'; // Path to the file I just made
// import { isAdmin } from '../middleware/authAdmin'; // Path to the admin auth middleware

// // Define a custom interface to handle the 'user' property on Request

// interface AuthRequest extends Request {
//   user?: any; // You can make this more specific later, e.g., IUser
// }

// const router = express.Router();

// // POST: Add a new product
// router.post('/upload', isAdmin, async (req: AuthRequest, res: Response) => {
//   try {
//     const { name, price, description, imageUrl, category } = req.body;

//     const newProduct = new Product({
//       name,
//       price,
//       description,
//       imageUrl,
//       category,
//       ownerEmail: req.user?.email // Automatically gets the email of the owner who logged in
//     });

//     const savedProduct = await newProduct.save();
//     res.status(201).json(savedProduct);
//   } catch (error) {
//     res.status(500).json({ message: "Error saving product", error });
//   }9
// });

// // GET: Get products by category (e.g., fetch all 'shoes')
// router.get('/category/:catName', async (req: Request, res: Response) => {
//   try {
//     const products = await Product.find({ category: req.params.catName });
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// });

// export default router;




//   import express, { Request, Response } from 'express';
//   import multer from 'multer';
//   // import path from 'path';
//   import fs from 'fs';
//   import path from 'path';
//   import Product from '../models/Product';
//   import { isAdmin } from '../middleware/authAdmin';

//   interface AuthRequest extends Request {
//     user?: any;
//   }

//   const router = express.Router();

//   // --- MULTER CONFIGURATION ---
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, 'uploads/'); // Make sure this folder exists in your backend root!
//     },
//     filename: (req, file, cb) => {
//       // Creates a unique name: 1735200000-shoes.jpg
//       cb(null, `${Date.now()}-${file.originalname}`);
//     }
//   });

//   const upload = multer({ 
//     storage: storage,
//     limits: { fileSize: 5 * 1024 * 1024 } // Limit 5MB
//   });

//   // --- UPDATED POST ROUTE ---
//   // 1. Added upload.single('image') - 'image' must match frontend data.append('image', file)
//   router.post('/upload', isAdmin, upload.single('image'), async (req: AuthRequest, res: Response) => {
//     try {
//       // req.file contains the image info
//       // req.body contains the name, price, etc.
//       if (!req.file) {
//         return res.status(400).json({ message: "No image file provided" });
//       }

//       const { name, price, description, category } = req.body;

//       const newProduct = new Product({
//         name,
//         price,
//         description,
//         category,
//         // We store the LOCAL path to the image
//         imageUrl: `/uploads/${req.file.filename}`, 
//         ownerEmail: req.user?.email 
//       });

//       const savedProduct = await newProduct.save();
//       res.status(201).json(savedProduct);
//     } catch (error) {
//       console.error("Backend Error:", error);
//       res.status(500).json({ message: "Error saving product", error });
//     }
//   });

//   // GET: Get products by category
//   router.get('/category/:catName', async (req: Request, res: Response) => {
//     try {
//       const products = await Product.find({ category: req.params.catName.toLowerCase() });

//       console.log(`Found ${products.length} items for category: ${req.params.catName}`);
//     res.json(products);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching products", error });
//   }
// });
//   // GET: All products (for dashboard)
//   router.get('/category/all', async (req: Request, res: Response) => {
//     try {
//       const products = await Product.find().sort({ createdAt: -1 }); // Newest first
//       res.json(products);
//     } catch (error) {
//       res.status(500).json({ message: "Error fetching all products", error });
//     }
//   });

//     // UPDATE: Edit product details (Name, Price, Category, Description)
//   router.put('/:id', isAdmin, async (req: Request, res: Response) => {
//     try {
//       const { name, price, description, category } = req.body;
      
//       const updatedProduct = await Product.findByIdAndUpdate(
//         req.params.id,
//         { name, price, description, category: category.toLowerCase() },
//         { new: true } // Returns the updated document instead of the old one
//       );

//       if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

//       res.json(updatedProduct);
//     } catch (error) {
//       res.status(500).json({ message: "Error updating product", error });
//     }
//   });

//   // DELETE: Remove a product by ID
//     router.delete('/:id', isAdmin, async (req: Request, res: Response) => {
//     try {
//       const product = await Product.findByIdAndDelete(req.params.id);
//       if (!product) return res.status(404).json({ message: "Product not found" });

//       // --- NEW: Physical File Deletion ---
//       if (product.imageUrl) {
//         // imageUrl looks like "/uploads/123-image.jpg"
//         // we remove the leading slash and join with current directory
//         const filePath = path.join(__dirname, '..', product.imageUrl); 
//         fs.unlink(filePath, (err) => {
//           if (err) console.error("Could not delete file:", err);
//         });
//       }

//       res.json({ message: "Product and image removed from vault" });
//     } catch (error) {
//       res.status(500).json({ message: "Error deleting product", error });
//     }
//   });

//   export default router;






import express, { Request, Response } from 'express';

import multer from 'multer';

import fs from 'fs';

import path from 'path';

import Product from '../models/Product';

import { isAdmin } from '../middleware/authAdmin';



interface AuthRequest extends Request {

  user?: any;

}



const router = express.Router();



// Ensure uploads folder exists

const uploadDir = 'uploads/';

if (!fs.existsSync(uploadDir)) {

  fs.mkdirSync(uploadDir);

}



const storage = multer.diskStorage({

  destination: (req, file, cb) => {

    cb(null, uploadDir);

  },

  filename: (req, file, cb) => {

    cb(null, `${Date.now()}-${file.originalname}`);

  }

});



const upload = multer({

  storage: storage,

  limits: { fileSize: 5 * 1024 * 1024 }

});



router.post('/upload', isAdmin, upload.single('image'), async (req: AuthRequest, res: Response) => {

  try {

    if (!req.file) return res.status(400).json({ message: "No image file provided" });



    const { name, price, description, category, subCategory } = req.body;

    const newProduct = new Product({

      name,

      price,

      description,

      category: category.toLowerCase(),

      subCategory: subCategory ? subCategory.toLowerCase() : undefined,

      imageUrl: `/uploads/${req.file.filename}`,

      ownerEmail: req.user?.email

    });



    const savedProduct = await newProduct.save();

    res.status(201).json(savedProduct);

  } catch (error) {

    console.error("Backend Error:", error);

    res.status(500).json({ message: "Error saving product", error });

  }

});



// 1. GET ALL (Used by the Dashboard Inventory Manager)

router.get('/all', async (req: Request, res: Response) => {

  try {

    const products = await Product.find().sort({ createdAt: -1 });

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: "Error fetching all products", error });

  }

});



// 2. GET BY CATEGORY (Used by the Shop pages)

router.get('/category/:catName', async (req: Request, res: Response) => {

  try {

    const products = await Product.find({ category: req.params.catName.toLowerCase() });

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: "Error fetching products", error });

  }

});



// 3. GET BY SUB-CATEGORY

router.get('/:catName/:subName', async (req: Request, res: Response) => {

  try {

    const { catName, subName } = req.params;

    const products = await Product.find({

      category: catName.toLowerCase(),

      subCategory: subName.toLowerCase()

    }).sort({ createdAt: -1 });

    res.json(products);

  } catch (error) {

    res.status(500).json({ message: "Error fetching filtered products", error });

  }

});



// 4. UPDATE PRODUCT

router.put('/:id', isAdmin, async (req: Request, res: Response) => {

  try {

    const { name, price, description, category, subCategory } = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(

      req.params.id,

      {

        name,

        price,

        description,

        category: category?.toLowerCase(),

        subCategory: subCategory?.toLowerCase()

      },

      { new: true }

    );

    if (!updatedProduct) return res.status(404).json({ message: "Product not found" });

    res.json(updatedProduct);

  } catch (error) {

    res.status(500).json({ message: "Error updating product", error });

  }

});




// 5. DELETE PRODUCT (With physical file cleanup)

router.delete('/:id', isAdmin, async (req: Request, res: Response) => {

  try {

    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) return res.status(404).json({ message: "Product not found" });



    if (product.imageUrl) {

      const filePath = path.join(process.cwd(), product.imageUrl);

      if (fs.existsSync(filePath)) {

        fs.unlink(filePath, (err) => {

          if (err) console.error("Could not delete file:", err);

        });

      }

    }

    res.json({ message: "Product and image removed successfully" });

  } catch (error) {

    res.status(500).json({ message: "Error deleting product", error });

  }

});



export default router;