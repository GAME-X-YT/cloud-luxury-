import { Router, Request, Response } from 'express';

const router = Router();

// Define the shape of our tracking data
interface TrackingData {
    success: boolean;
    status?: string;
    location?: string;
    progress?: number;
    estDelivery?: string;
    message?: string;
}

router.post('/track', (req: Request, res: Response<TrackingData>) => {
    const { orderId } = req.body;

    // Simulate finding a real order
    if (orderId === "CL-1029") {
        return res.json({
            success: true,
            status: "Authenticated & Shipped",
            location: "Customs Hub, Paris",
            progress: 80,
            estDelivery: "Jan 10, 2026"
        });
    }

    res.status(404).json({ 
        success: false, 
        message: "Order ID not found in the luxury vault." 
    });
});

export default router;