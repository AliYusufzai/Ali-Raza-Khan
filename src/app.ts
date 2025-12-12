import express, { Request, Response, NextFunction } from "express";
import { AppError } from "./shared/errors/appError";
import chatRoutes from "./chat/controllers/ChatRoutes";
import subscriptionRoutes from "./subscriptions/controllers/SubscriptionRoutes";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.use("/chat", chatRoutes);
app.use("/subscriptions", subscriptionRoutes);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err);

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

export default app;
