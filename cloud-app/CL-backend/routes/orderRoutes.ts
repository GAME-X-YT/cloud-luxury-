// // import express, { Request, Response } from 'express';
// // import Order, { IOrder } from '../models/Order';

// // const router = express.Router();

// // router.post('/', async (req: Request, res: Response) => {
// //   try {
// //     const { items, totalAmount, shippingAddress, userId }: Partial<IOrder> = req.body;

// //     if (!items || items.length === 0) {
// //       return res.status(400).json({ message: "Cart is empty" });
// //     }

// //     const newOrder = new Order({
// //       items,
// //       totalAmount,
// //       shippingAddress,
// //       userId
// //     });

    
// //     const savedOrder = await newOrder.save();
// //     res.status(201).json(savedOrder);
// //   } catch (error) {
// //     res.status(500).json({ message: "Order creation failed", error });
// //   }
// // });

// //   router.get('/user/:userId', async (req: Request, res: Response) => {
// //   try {
// //     const { userId } = req.params;
// //     // Find orders where userId matches and sort by newest first
// //     const orders = await Order.find({ userId }).sort({ createdAt: -1 });
// //     res.json(orders);
// //   } catch (error) {
// //     console.error("Fetch orders error:", error);
// //     res.status(500).json({ message: "Failed to fetch orders" });
// //   }
// // });

// // export default router;





// import express from 'express';
// import { cancelOrder, getMyOrders, createOrder } from '../control/orderController';
// import { authMiddleware } from '../middleware/authMiddleware'; // Your JWT protection
// import Order from '../models/Order';

// const router = express.Router();

// router.post('/', authMiddleware, createOrder);

// // GET /api/orders/admin/all
// router.get('/admin/all', authMiddleware, (req: any, res: any) => {
//   if (req.user.role !== 'admin') return res.status(403).send("Not Admin");
  
//   // Logic to find ALL orders from the database
//   Order.find().populate('user', 'name email').sort({ createdAt: -1 })
//     .then(orders => res.json(orders))
//     .catch(err => res.status(500).json(err));
// });

// // Route to get all orders for the logged-in user
// router.get('/myorders', authMiddleware, getMyOrders);

// // Route to cancel a specific order
// router.patch('/:orderId/cancel', authMiddleware, cancelOrder);

// export default router;



import express from 'express';
import { 
  createOrder, 
  getMyOrders, 
  cancelOrder, 
  updatePaymentStatus, 
  getAllOrdersAdmin,
  updateOrderStatus // <--- Import your new function
} from '../control/orderController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createOrder);           // POST /api/orders
router.get('/my-orders', authMiddleware, getMyOrders);     // GET /api/orders/myorders
router.patch('/:id/cancel', authMiddleware, cancelOrder); // PATCH /api/orders/123/cancel
router.get('/admin/all', authMiddleware, getAllOrdersAdmin);
router.patch('/admin/:id/payment', authMiddleware, updatePaymentStatus);
router.patch('/status/:id', authMiddleware, updateOrderStatus);

export default router;