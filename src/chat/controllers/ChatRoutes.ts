import { Router } from "express";
import { ChatService } from "../services/ChatService";
import { quotaMiddleware } from "../../middlewares/checkQuota";

const router = Router();
const service = new ChatService();

router.post("/ask", quotaMiddleware, async (req, res) => {
  const { userId, question } = req.body;
  try {
    const result = await service.askQuestion(userId, question);
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

export default router;
