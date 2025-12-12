export class Subscription {
  constructor(
    public userId: string,
    public tier: "BASIC" | "PRO" | "ENTERPRISE",
    public billingCycle: "MONTHLY" | "YEARLY",
    public maxMessages: number | null,
    public usedMessages: number = 0,
    public price: number = 0,
    public startDate: Date = new Date(),
    public endDate: Date,
    public renewalDate: Date,
    public autoRenew: boolean = true,
    public isActive: boolean = true,
  ) {}
}
