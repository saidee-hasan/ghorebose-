import type { Billing, OrderStatus, PaymentStatus } from "./types";

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

export function toBnDigits(value: string): string {
  return value.replace(/\d/g, (d) => bnDigits[Number(d)]);
}

export function formatBDT(
  amount: number,
  opts: { decimals?: boolean; bn?: boolean } = {},
): string {
  const fixed = opts.decimals ? amount.toFixed(2) : String(Math.round(amount));
  const grouped = fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  const out = `৳${grouped}`;
  return opts.bn ? toBnDigits(out) : out;
}

export function billingLabel(billing: Billing): string {
  switch (billing) {
    case "week":
      return "/ Week";
    case "month":
      return "/ Month";
    case "year":
      return "/ Year";
    case "one-time":
      return "one-time";
  }
}

export function formatDate(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function formatDateTime(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  return d.toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function relativeTime(input: string | Date): string {
  const d = typeof input === "string" ? new Date(input) : input;
  const diff = Date.now() - d.getTime();
  const days = Math.floor(diff / 86_400_000);
  if (days < 1) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 30) return `${days} days ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months} month${months > 1 ? "s" : ""} ago`;
  return `${Math.floor(months / 12)}y ago`;
}

export function daysUntil(input: string | Date): number {
  const d = typeof input === "string" ? new Date(input) : input;
  return Math.ceil((d.getTime() - Date.now()) / 86_400_000);
}

export const orderStatusMeta: Record<
  OrderStatus,
  { label: string; tone: "brand" | "ink" | "muted" }
> = {
  pending: { label: "Pending", tone: "brand" },
  processing: { label: "Processing", tone: "brand" },
  completed: { label: "Completed", tone: "ink" },
  cancelled: { label: "Cancelled", tone: "muted" },
};

export const paymentStatusMeta: Record<
  PaymentStatus,
  { label: string; tone: "brand" | "ink" | "muted" | "outline" }
> = {
  pending: { label: "Pending", tone: "brand" },
  submitted: { label: "Submitted", tone: "brand" },
  verified: { label: "Verified", tone: "outline" },
  rejected: { label: "Rejected", tone: "muted" },
  delivered: { label: "Delivered", tone: "ink" },
  completed: { label: "Completed", tone: "ink" },
};

export function ratingLabel(rating: number): string {
  return rating.toFixed(1);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}
