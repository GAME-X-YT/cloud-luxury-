import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import userRoutes from "./routes/userRoute";
import productRoutes from './routes/productRoutes';
import blogRoutes from './routes/blogRoutes';
import orderRoutes from './routes/orderRoutes';
import chatRoutes from './routes/chat';
import helpRoutes from './routes/help';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/products', productRoutes);
app.use('/api/blogs', blogRoutes);
app.use("/api/users", userRoutes);
app.use('/api/orders', orderRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use('/api/chat', chatRoutes);
app.use('/api/help', helpRoutes);

mongoose.connect(process.env.MONGO_URI!)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("DB connection error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
