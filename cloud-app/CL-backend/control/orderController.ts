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
import { sendEmail } from "../middleware/sendEmail";

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


export const confirmOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params;

        // 1. Find the order and pull the user data (email and name)
        const order = await Order.findById(orderId).populate("user");
        
        if (!order) {
            return res.status(404).json({ message: "Order not found" });
        }

        // 2. Update the status using your Schema field names
        // We use 'orderStatus' and 'paymentStatus' based on your previous logs
        order.orderStatus = 'Processing'; 
        order.paymentStatus = 'Paid';
        await order.save();

        // 3. Send the Email
        const user = order.user as any; // Cast to any to avoid TS errors with populated fields
        
        if (user && user.email) {
            // We convert order._id to a string so it can be sliced in the template
            const orderIdString = order._id.toString();
            
           try {
                await sendEmail(
                    user.email,
                    "Cloud Luxury | Order Authenticated",
                    orderConfirmationTemplate(user.name, orderIdString, order.totalAmount)
                );
                console.log(`Email sent successfully to ${user.email}`);
            } catch (emailErr) {
                // If email fails, we log it but don't stop the launch!
                console.error("Email failed to send, but order was updated:", emailErr);
            }
        }

        res.status(200).json({ 
            success: true, 
            message: "Order confirmed and cloud luxury notification sent.",
            order 
        });

    } catch (err: any) {
        console.error("Backend Error:", err);
        res.status(500).json({ message: "Internal Server Error", error: err.message });
    }
};

// Simple Luxury Template helper
const orderConfirmationTemplate = (userName: string, orderId: string, total: number) => `
    <div style="background-color: #050505; color: #ffffff; font-family: 'Georgia', serif; padding: 50px 20px; text-align: center;">
    <div style="max-width: 600px; margin: 0 auto; border: 1px solid #c5a059; padding: 40px; background-color: #0a0a0a;">
        <h1 style="color: #c5a059; letter-spacing: 5px; text-transform: uppercase; font-size: 24px;">Cloud Luxury</h1>
        <div style="height: 1px; background: linear-gradient(to right, transparent, #c5a059, transparent); margin: 20px 0;"></div>
        
        <h2 style="font-weight: normal; font-size: 20px; margin-bottom: 30px;">Order Authenticated</h2>
        
        <p style="color: #a3a3a3; line-height: 1.8; text-align: left;">
            Dear ${userName},<br><br>
            We are pleased to inform you that your order <strong>#${orderId.slice(-6).toUpperCase()}</strong> has been formally confirmed by our curators. 
            Your selection is now being prepared for specialized transit.
        </p>

        <div style="background-color: #111; border: 1px solid #222; padding: 20px; margin: 30px 0; text-align: left;">
            <p style="margin: 0; font-size: 12px; color: #c5a059; text-transform: uppercase; letter-spacing: 2px;">Transaction Details</p>
            <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 15px;">
                Total Value: $${total.toLocaleString()}<br>
                Status: Handled with Care
            </p>
        </div>

        <p style="color: #777; font-size: 13px; font-style: italic; margin-bottom: 40px;">
            Expect a secondary notification once your parcel enters private transit.
        </p>

        <a href="http://localhost:5000/orders" style="background-color: #c5a059; color: #000; padding: 15px 30px; text-decoration: none; font-size: 12px; font-weight: bold; text-transform: uppercase; letter-spacing: 2px;">View Collection Status</a>
    </div>
</div>
`;
