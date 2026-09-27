import type { Order, OrderTimelineEvent, PaymentStatus } from "@/lib/types";
import { getTool } from "./tools";

const STEP_LABELS = [
  "Order Created",
  "Payment Submitted",
  "Payment Verified",
  "Delivered",
  "Completed",
] as const;

function progressFor(status: PaymentStatus): number {
  switch (status) {
    case "pending":
      return 1;
    case "submitted":
      return 2;
    case "verified":
      return 3;
    case "delivered":
      return 4;
    case "completed":
      return 5;
    case "rejected":
      return 2;
  }
}

function timeline(
  createdAt: string,
  status: PaymentStatus,
): OrderTimelineEvent[] {
  const reached = progressFor(status);
  const base = new Date(createdAt).getTime();
  return STEP_LABELS.map((label, i) => {
    const done = i < reached;
    const at = done
      ? new Date(base + i * 1000 * 60 * 47).toISOString()
      : null;
    return { label, at, done };
  });
}

interface OrderInput {
  id: string;
  customer: string;
  email: string;
  toolSlug: string;
  plan?: string;
  amount: number;
  method: Order["method"];
  trxId: string;
  status: Order["status"];
  paymentStatus: PaymentStatus;
  createdAt: string;
  expiresAt: string;
  duration?: string;
}

function makeOrder(o: OrderInput): Order {
  const tool = getTool(o.toolSlug);
  return {
    id: o.id,
    customer: o.customer,
    email: o.email,
    toolSlug: o.toolSlug,
    toolName: tool?.name ?? o.toolSlug,
    plan: o.plan ?? "Pro",
    duration: o.duration ?? tool?.duration ?? "1 Month",
    amount: o.amount,
    method: o.method,
    trxId: o.trxId,
    status: o.status,
    paymentStatus: o.paymentStatus,
    createdAt: o.createdAt,
    expiresAt: o.expiresAt,
    timeline: timeline(o.createdAt, o.paymentStatus),
  };
}

export const currentUser = {
  name: "Saidee Hasan",
  firstName: "Saidee",
  email: "saidee@example.com",
  phone: "+880 1712 345678",
  joined: "2026-02-14",
  initials: "SH",
};

export const orders: Order[] = [
  makeOrder({
    id: "GB-000012",
    customer: currentUser.name,
    email: currentUser.email,
    toolSlug: "claude-code",
    plan: "Pro",
    amount: 1700,
    method: "bKash",
    trxId: "BKH8H2K9LM",
    status: "processing",
    paymentStatus: "submitted",
    createdAt: "2026-09-22T10:24:00",
    expiresAt: "2026-10-22",
  }),
  makeOrder({
    id: "GB-000011",
    customer: currentUser.name,
    email: currentUser.email,
    toolSlug: "gemini-pro",
    plan: "Starter",
    amount: 50,
    method: "Nagad",
    trxId: "NGD77QP2XA",
    status: "completed",
    paymentStatus: "completed",
    createdAt: "2026-09-14T18:02:00",
    expiresAt: "2026-10-14",
  }),
  makeOrder({
    id: "GB-000010",
    customer: currentUser.name,
    email: currentUser.email,
    toolSlug: "canva-pro",
    plan: "Pro",
    amount: 350,
    method: "bKash",
    trxId: "BKH3F8N1RT",
    status: "completed",
    paymentStatus: "delivered",
    createdAt: "2026-09-03T09:41:00",
    expiresAt: "2026-10-03",
  }),
  makeOrder({
    id: "GB-000009",
    customer: currentUser.name,
    email: currentUser.email,
    toolSlug: "elevenlabs",
    plan: "Starter",
    amount: 1400,
    method: "Rocket",
    trxId: "RKT5M2P8QW",
    status: "completed",
    paymentStatus: "completed",
    createdAt: "2026-08-21T14:15:00",
    expiresAt: "2026-09-21",
  }),
  makeOrder({
    id: "GB-000008",
    customer: currentUser.name,
    email: currentUser.email,
    toolSlug: "github-copilot",
    plan: "Pro",
    amount: 1250,
    method: "bKash",
    trxId: "BKH1D9V4YU",
    status: "completed",
    paymentStatus: "completed",
    createdAt: "2026-08-06T11:33:00",
    expiresAt: "2026-09-06",
  }),
  makeOrder({
    id: "GB-000007",
    customer: currentUser.name,
    email: currentUser.email,
    toolSlug: "perplexity-pro",
    plan: "Starter",
    amount: 650,
    method: "Nagad",
    trxId: "NGD2K7L3ZC",
    status: "cancelled",
    paymentStatus: "rejected",
    createdAt: "2026-07-27T16:50:00",
    expiresAt: "2026-08-27",
  }),
  makeOrder({
    id: "GB-000006",
    customer: currentUser.name,
    email: currentUser.email,
    toolSlug: "notion-ai",
    plan: "Pro",
    amount: 700,
    method: "bKash",
    trxId: "BKH9S4T6AB",
    status: "completed",
    paymentStatus: "completed",
    createdAt: "2026-07-11T08:19:00",
    expiresAt: "2026-08-11",
  }),
  makeOrder({
    id: "GB-000005",
    customer: currentUser.name,
    email: currentUser.email,
    toolSlug: "midjourney",
    plan: "Starter",
    amount: 1500,
    method: "Rocket",
    trxId: "RKT6H1J5DE",
    status: "completed",
    paymentStatus: "completed",
    createdAt: "2026-06-29T20:07:00",
    expiresAt: "2026-07-29",
  }),
  makeOrder({
    id: "GB-000004",
    customer: "Nusrat Jahan",
    email: "nusrat@example.com",
    toolSlug: "chatgpt-plus",
    plan: "Pro",
    amount: 899,
    method: "bKash",
    trxId: "BKH4R8W2FG",
    status: "processing",
    paymentStatus: "submitted",
    createdAt: "2026-09-23T12:11:00",
    expiresAt: "2026-10-23",
  }),
  makeOrder({
    id: "GB-000003",
    customer: "Tanvir Ahmed",
    email: "tanvir@example.com",
    toolSlug: "cursor-pro",
    plan: "Starter",
    amount: 1600,
    method: "Nagad",
    trxId: "NGD8T3Y6HI",
    status: "processing",
    paymentStatus: "verified",
    createdAt: "2026-09-21T15:45:00",
    expiresAt: "2026-10-21",
  }),
  makeOrder({
    id: "GB-000002",
    customer: "Farhana Akter",
    email: "farhana@example.com",
    toolSlug: "suno-ai",
    plan: "Starter",
    amount: 600,
    method: "Rocket",
    trxId: "RKT2U7I9JK",
    status: "completed",
    paymentStatus: "completed",
    createdAt: "2026-09-18T19:22:00",
    expiresAt: "2026-10-18",
  }),
  makeOrder({
    id: "GB-000001",
    customer: "Rakib Hossain",
    email: "rakib@example.com",
    toolSlug: "deepl-pro",
    plan: "Pro",
    amount: 850,
    method: "bKash",
    trxId: "BKH7O4P1LM",
    status: "completed",
    paymentStatus: "completed",
    createdAt: "2026-09-10T10:05:00",
    expiresAt: "2026-10-10",
  }),
];

export function getOrder(id: string): Order | undefined {
  return orders.find((o) => o.id === id);
}

export function getUserOrders(): Order[] {
  return orders.filter((o) => o.email === currentUser.email);
}

export function getPurchasedOrders(): Order[] {
  return getUserOrders().filter(
    (o) =>
      o.paymentStatus === "delivered" || o.paymentStatus === "completed",
  );
}

export const orderStats = {
  totalOrders: getUserOrders().length,
  activeTools: getPurchasedOrders().length,
  pendingOrders: getUserOrders().filter(
    (o) => o.paymentStatus === "submitted" || o.paymentStatus === "pending",
  ).length,
  totalSpent: getUserOrders()
    .filter((o) => o.status === "completed")
    .reduce((sum, o) => sum + o.amount, 0),
};
