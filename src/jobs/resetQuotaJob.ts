import cron from "node-cron";
import { resetFreeQuota } from "../shared/quota/resetFreeQuota";
import { SubscriptionService } from "../subscriptions/services/SubscriptionService";

const subscriptionService = new SubscriptionService();

cron.schedule("0 0 1 * *", async () => {
  await resetFreeQuota();
  await subscriptionService.autoRenewSubscriptions();
});

if (process.env.NODE_ENV !== "production") {
  cron.schedule("*/5 * * * *", async () => {
    console.log(
      "Running free quota reset & subscription auto-renew (every 5 min)",
    );
    await resetFreeQuota();
    await subscriptionService.autoRenewSubscriptions();
  });
}
