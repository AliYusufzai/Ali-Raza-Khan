import { SubscriptionRepository } from "../repositories/SubscriptionRepository";
import { prisma } from "../../shared/database/prisma";
import { Subscription } from "../domain/entities/Subscription";
import { SUBSCRIPTION_PLANS } from "../../shared/utils/constants";
import { calculateDates } from "../../shared/utils/helper";

export class SubscriptionService {
  private repo = new SubscriptionRepository();

  createSubscription(
    userId: string,
    tier: "BASIC" | "PRO" | "ENTERPRISE",
    billingCycle: "MONTHLY" | "YEARLY",
  ) {
    const { maxMessages, price } = SUBSCRIPTION_PLANS[tier];
    const { startDate, endDate, renewalDate } = calculateDates(billingCycle);

    const subscription = new Subscription(
      userId,
      tier,
      billingCycle,
      maxMessages,
      0,
      price,
      startDate,
      endDate,
      renewalDate,
      true,
      true,
    );

    return this.repo.create(subscription);
  }

  async cancelSubscription(id: string) {
    return this.repo.update(id, { autoRenew: false });
  }

  async getExpiringSubscriptions() {
    return this.repo.findExpiring();
  }

  simulatePayment(): boolean {
    return Math.random() > 0.2;
  }

  calculateNextBillingDates(sub: Subscription) {
    const startDate = sub.endDate;
    let endDate = new Date(sub.endDate);
    let renewalDate = new Date(sub.renewalDate);

    if (sub.billingCycle === "MONTHLY") {
      endDate.setMonth(endDate.getMonth() + 1);
      renewalDate.setMonth(renewalDate.getMonth() + 1);
    } else if (sub.billingCycle === "YEARLY") {
      endDate.setFullYear(endDate.getFullYear() + 1);
      renewalDate.setFullYear(renewalDate.getFullYear() + 1);
    }

    return { startDate, endDate, renewalDate };
  }

  async autoRenewSubscriptions() {
    const expiringSubs = await this.getExpiringSubscriptions();

    for (const sub of expiringSubs) {
      if (this.simulatePayment()) {
        const newDates = this.calculateNextBillingDates(sub);

        await this.repo.update(sub.id, {
          startDate: newDates.startDate,
          endDate: newDates.endDate,
          renewalDate: newDates.renewalDate,
        });

        console.log(
          `Subscription ${sub.id} auto-renewed successfully for user ${sub.userId}`,
        );
      } else {
        await this.repo.update(sub.id, { isActive: false });

        console.log(
          `Subscription ${sub.id} auto-renew failed for user ${sub.userId}. Marked inactive.`,
        );
      }
    }
  }
}
