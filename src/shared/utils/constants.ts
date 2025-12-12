export const SUBSCRIPTION_PLANS = {
  BASIC: { maxMessages: 50, price: 19.99 },
  PRO: { maxMessages: 100, price: 49.99 },
  ENTERPRISE: { maxMessages: null, price: 99.99 },
} as const;
