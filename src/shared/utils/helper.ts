export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function getCurrentMonth() {
  const now = new Date();
  return { month: now.getMonth() + 1, year: now.getFullYear() };
}

export function calculateDates(billingCycle: "MONTHLY" | "YEARLY") {
  const startDate = new Date();

  const endDate = new Date(startDate);
  if (billingCycle === "MONTHLY") {
    endDate.setMonth(endDate.getMonth() + 1);
  } else {
    endDate.setFullYear(endDate.getFullYear() + 1);
  }

  const renewalDate = new Date(endDate);

  return { startDate, endDate, renewalDate };
}
