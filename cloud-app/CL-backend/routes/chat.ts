// import { Router, Request, Response } from 'express';
// import { OpenAI } from 'openai';

// const router = Router();
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// interface ChatRequest {
//     message: string;
// }

// router.post('/', async (req: Request<{}, {}, ChatRequest>, res: Response) => {
//     const { message } = req.body;

//     try {
//         const completion = await openai.chat.completions.create({
//             model: "gpt-4o",
//             messages: [
//                 { role: "system", content: "You are the Cloud Luxury Concierge. Be sophisticated." },
//                 { role: "user", content: message }
//             ],
//         });

//         res.json({ reply: completion.choices[0].message.content });
//     } catch (error) {
//         res.status(500).json({ reply: "Concierge is currently offline." });
//     }
// });

// export default router;



import { Router, Request, Response } from 'express';
import { OpenAI } from 'openai';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
    const { message } = req.body;
    const apiKey = process.env.OPENAI_API_KEY;

    const MOCK_MODE = false; 

    if (MOCK_MODE) {
        return res.json({ 
            reply: `[MOCK] You asked: "${message}". Listen, peasant, I'm far too busy polishing Arinze's gold bars to give you a real response. Check your billing quota.` 
        });
    }

    // Simplified check: only error if the key is actually missing from .env
    if (!apiKey) {
        return res.json({ 
            reply: "The Concierge is currently offline (Configuration missing). How else may I assist you?" 
        });
    }

    try {
        // 2. Initialize inside the route so it doesn't crash on startup
        const openai = new OpenAI({ apiKey });

        const completion = await openai.chat.completions.create({
            model: "gpt-4o",
            messages: [
                { 
                    role: "system", 
                    content: `You are 'The Cloud Arbiter,' the snobbish concierge for Arinze's luxury empire. 
                    - Your tone is icy and dismissive.
                    - LOCATION: If asked, say: "If you have to ask for our coordinates, you aren't high-status enough to enter. We exist in Paris and Zurich, by invitation only."
                    - DISCOUNTS: Meet any mention of price with disgust.
                    - CLOSING: End with 'Don't waste my time again' or 'Go back to the mall.
                    You are 'The Cloud Arbiter.' You represent the absolute peak of luxury under founder A.Z. 
                    Your tone is icy, elite, and dismissive.

                    SPECIFIC PROTOCOLS:
                    - LOCATION: "Our locations aren't on Google Maps. We exist in the private corners of Monaco, Zurich, and Paris. If your black card doesn't automatically unlock our GPS coordinates, you simply aren't ready for us."
                    - PRICING: "If you have to look at the price tag, move along. We don't speak 'decimal points' here."
                    - RETURNS: "Returns? How tragic. Our clients usually just gift their 'mistakes' to their house staff. We don't take back handled goods."
                    - QUALITY: "A.Z. uses materials that haven't been touched by human hands until they reach yours. Your skepticism is, frankly, exhausting."
                    - CLOSING: Never say 'Have a nice day.' Say 'Don't waste my time again' or 'Go back to the mall.
          '` 
                },
                { role: "user", content: message }
            ],
        });

       res.json({ reply: completion.choices[0].message.content });
    } catch (error: any) {
        console.error("OpenAI Error:", error.message);
        
        // If your key is invalid or out of credits, it will hit this:
        res.status(500).json({ 
            reply: "I apologize, my connection to the luxury vault is interrupted. Please ensure the API key is valid and has credits." 
        });
    }
});

export default router;