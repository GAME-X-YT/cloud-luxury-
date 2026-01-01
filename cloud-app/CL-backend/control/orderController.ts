// import { Request, Response } from 'express';
// import Order from '../models/Order';
// import Product from '../models/Product';


// // This "extends" the existing Request type to include the user
// interface AuthRequest extends Request {
//   user?: {
//     _id: string;
//     // add other user properties here if needed, like email
//   };
// }

// export const createOrder = async (req: any, res: Response) => {
//   try {
//     const { orderItems, totalAmount, bankProofRef } = req.body;

//     if (!orderItems || orderItems.length === 0) {
//       return res.status(400).json({ message: 'No items in order' });
//     }

//     const order = new Order({
//       user: req.user._id,
//       items: orderItems,
//       totalAmount,
//       bankProofRef, // The reference from their bank transfer
//       paymentStatus: 'Pending Verification' 
//     });

//     const savedOrder = await order.save();

//     // IMPORTANT: Decrease stock here
//     for (const item of orderItems) {
//       await Product.findByIdAndUpdate(item.product, {
//         $inc: { stock: -item.quantity }
//       });
//     }

//     res.status(201).json(savedOrder);
//   } catch (error) {
//     res.status(500).json({ message: 'Order creation failed', error });
//   }
// };


// // Add this to your existing imports
// export const getMyOrders = async (req: any, res: Response) => {
//   try {
//     // Find orders where the 'user' field matches the ID of the logged-in user
//     const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    
//     res.status(200).json(orders);
//   } catch (error) {
//       res.status(500).json({ message: 'Error fetching orders', error });
//     }
// };

// export const verifyOrderPayment = async (req: any, res: Response) => {
// try {
//     const order = await Order.findById(req.params.id);
//     if (!order) return res.status(404).json({ message: 'Order not found' });

//     order.paymentStatus = 'Paid';
//     // Optionally change order status too
//     order.orderStatus = 'Processing'; 

//     await order.save();
//     res.status(200).json({ message: 'Payment verified successfully' });
// } catch (error) {
//     res.status(500).json({ message: 'Verification failed' });
// }
// };

// export const cancelOrder = async (req: any, res: Response) => {
//   try {
//     const { orderId } = req.params;
//     const userId = req.user._id; // Assuming you have auth middleware

//     // 1. Find the order
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res.status(404).json({ message: 'Order not found' });
//     }

//     // 2. Security Check: Does this order belong to the user?
//     if (order.user.toString() !== userId.toString()) {
//       return res.status(403).json({ message: 'Unauthorized to cancel this order' });
//     }

//     // 3. Status Check: Only cancel if it's still "Processing"
//     if (order.orderStatus !== 'Processing') {
//       return res.status(400).json({ 
//         message: `Cannot cancel order. Current status: ${order.orderStatus}` 
//       });
//     }


//     // 4. Update Order Status
//     order.orderStatus = 'Cancelled';
//     await order.save();

//     // 5. RESTOCK: Return items to the Product inventory
//         const updatePromises = order.items.map((item) => {
//         return Product.findByIdAndUpdate(
//             item.product, // The ID of the iPhone
//             { 
//             $inc: { stock: item.quantity } // If they ordered 2, this adds 2 back to the "stock" field
//             },
//             { new: true } // Returns the updated document
//         );
//         });

//     await Promise.all(updatePromises);

//     res.status(200).json({ message: 'Order cancelled and items restocked successfully', order });
//   } catch (error) {
//     res.status(500).json({ message: 'Error cancelling order', error });
//   }
// };



import { Request, Response } from 'express';
import Order from '../models/Order';
import Product from '../models/Product';


export const createOrder = async (req: any, res: Response) => {
  try {
    const { items, totalAmount, bankProofRef, shippingAddress, phone } = req.body;

    // DEBUG: Add this to see if the middleware is actually passing the user
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "User identification failed. Please re-login." });
    }

    const order = new Order({
      user: req.user.id, // Ensure your Order Model uses 'user' (lowercase)
      items: items, 
      totalAmount,
      bankProofRef: bankProofRef || "N/A", // Prevent null errors
      shippingAddress,
      phone,
    });

    const savedOrder = await order.save();

    // Loop through items to update stock
    for (const item of items) { 
      await Product.findByIdAndUpdate(item.product, { 
        $inc: { stock: -item.quantity } 
      });
    }

    res.status(201).json(savedOrder);
  } catch (error: any) {
    console.error("Order Error:", error);
    res.status(500).json({ message: "Order creation failed", error: error.message });
  }
};

export const updateOrderStatus = async (req: Request, res: Response) => {
  try {
    const { status } = req.body;
    
    const updateData: any = { orderStatus: status };

    // LOGIC: If the owner moves it to Processing or Shipped, 
    // it implies the bank transfer has been verified.
    if (status === "Processing" || status === "Shipped" || status === "Delivered") {
      updateData.paymentStatus = "Paid";
    }

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Update failed", error });
  }
};

// 2. Get orders for the logged-in user
// Updated getMyOrders in orderController.ts
export const getMyOrders = async (req: any, res: Response) => {
  try {
    const orders = await Order.find({ user: req.user.id })
      .populate('items.product') // This allows frontend to see product images
      .sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders" });
  }
};

export const getAllOrdersAdmin = async (req: any, res: Response) => {
  try {
    // We "populate" user to see their name/email and "items.product" to see what they bought
    const orders = await Order.find()
      .populate('user', 'name email')
      .populate('items.product', 'name price')
      .sort({ createdAt: -1 });
    
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching all orders" });
  }
};

export const updatePaymentStatus = async (req: any, res: Response) => {
  try {
    const { status } = req.body; // 'Paid' or 'Failed'
    const order = await Order.findById(req.params.id);

    if (!order) return res.status(404).json({ message: "Order not found" });

    order.paymentStatus = status;
    if (status === 'Paid') {
      order.orderStatus = 'Processing'; // Move it from pending to processing
    }

    await order.save();
    res.json({ message: `Order marked as ${status}`, order });
  } catch (error) {
    res.status(500).json({ message: "Update failed" });
  }
};

// 3. User cancels their order (Only if still Processing)
export const cancelOrder = async (req: any, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    if (order.orderStatus !== 'Processing') {
      return res.status(400).json({ message: "Cannot cancel order already in transit" });
    }

    order.orderStatus = 'Cancelled';
    await order.save();

    // Restore stock
    for (const item of order.items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.quantity } });
    }

    res.json({ message: "Order cancelled and stock restored" });
  } catch (error) {
    res.status(500).json({ message: "Cancellation failed" });
  }
};