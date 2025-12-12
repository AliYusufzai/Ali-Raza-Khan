import { Router } from "express";
import { SubscriptionService } from "../services/SubscriptionService";

const router = Router();
const service = new SubscriptionService();

router.post("/", async (req, res) => {
  const { userId, tier, billingCycle } = req.body;

  try {
    const result = await service.createSubscription(userId, tier, billingCycle);
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

router.post("/cancel/:id", async (req, res) => {
  try {
    const result = await service.cancelSubscription(req.params.id);
    res.json(result);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

export default router;
