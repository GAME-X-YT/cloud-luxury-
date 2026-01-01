import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
  name: string;
  price: number;
  description: string;
  imageUrl: string;
  category: 'shoes' | 'fall-clothes' | 'jewelry' | 'tshirt' | 'baggy-jeans' | 'watches' | 'shorts' | 'couples-outfit' | 'hoodie';
  subCategory?: string;
  ownerEmail: string; // Tracks which of the 4 owners uploaded it
}

const ProductSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  category: { 
    type: String, 
    required: true, 
    enum: ['shoes', 'fall-clothes', 'jewelry', 'tshirt', 'baggy-jeans', 'watches', 'shorts', 'couples-outfit', 'hoodie'] 
  },
  subCategory: { type: String },
  ownerEmail: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model<IProduct>("Product", ProductSchema);