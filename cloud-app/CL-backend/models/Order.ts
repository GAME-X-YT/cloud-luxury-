// import mongoose, { Schema, Document, Types } from 'mongoose';

// // 1. Define the interface for a single Order Item
// interface IOrderItem {
//   product: Types.ObjectId;
//   quantity: number;
//   price: number;
// }

// // 2. Define the main Order Interface
// export interface IOrder extends Document {
//   user: Types.ObjectId;
//   items: IOrderItem[];
//   totalAmount: number;
//   paymentStatus: 'Awaiting Transfer' | 'Pending Verification' | 'Paid' | 'Failed';
//   orderStatus: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
//   bankProofRef?: string;
//   createdAt: Date;
// }

// // 3. Create the Schema
// const orderSchema = new Schema<IOrder>({
//   user: { 
//     type: Schema.Types.ObjectId, 
//     ref: 'User', 
//     required: true 
//   },
//   items: [{
//     product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
//     quantity: { type: Number, required: true },
//     price: { type: Number, required: true }
//   }],
//   totalAmount: { type: Number, required: true },
//   paymentStatus: { 
//     type: String, 
//     enum: ['Awaiting Transfer', 'Pending Verification', 'Paid', 'Failed'], 
//     default: 'Awaiting Transfer' 
//   },
//   orderStatus: { 
//     type: String, 
//     enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], 
//     default: 'Processing' 
//   },
//   bankProofRef: { type: String },
//   createdAt: { type: Date, default: Date.now }
// });

// // 4. Export the Model
// const Order = mongoose.model<IOrder>('Order', orderSchema);
// export default Order;


import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
      quantity: { type: Number, required: true },
      price: { type: Number, required: true }
    }
  ],
  totalAmount: { type: Number, required: true },
  bankProofRef: { type: String, required: true }, // The transfer code from the bank app
  paymentStatus: { 
    type: String, 
    enum: ['Pending', 'Paid', 'Failed'], 
    default: 'Pending' 
  },
  orderStatus: { 
    type: String, 
    enum: ['Processing', 'Shipped', 'Delivered', 'Cancelled'], 
    default: 'Processing' 
  },
}, { timestamps: true });

export default mongoose.model('Order', orderSchema);
