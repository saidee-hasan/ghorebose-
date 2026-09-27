export type Billing = "week" | "month" | "year" | "one-time";

export type ToolBadge =
  | "trending"
  | "new"
  | "popular"
  | "best-value"
  | "editor-choice";

export interface ToolPlan {
  name: string;
  price: number;
  duration: string;
  billing: Billing;
  features: string[];
  popular?: boolean;
}

export interface ToolStep {
  title: string;
  text: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export interface Tool {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: string;
  mark: string;
  tone: "ink" | "brand" | "outline";
  price: number;
  compareAtPrice?: number;
  billing: Billing;
  duration: string;
  isFree: boolean;
  rating: number;
  reviewCount: number;
  userCount: string;
  badge?: ToolBadge;
  shortDescription: string;
  overview: string;
  features: string[];
  howItWorks: ToolStep[];
  plans: ToolPlan[];
  included: string[];
  requirements: string[];
  faq: FaqItem[];
  tags: string[];
  createdAt: string;
  popularity: number;
  stock: number;
  published: boolean;
  featured?: boolean;
  trending?: boolean;
}

export interface Category {
  slug: string;
  name: string;
  description: string;
  icon: string;
  group: string;
  featured?: boolean;
}

export type OrderStatus =
  | "pending"
  | "processing"
  | "completed"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "submitted"
  | "verified"
  | "rejected"
  | "delivered"
  | "completed";

export interface OrderTimelineEvent {
  label: string;
  at: string | null;
  done: boolean;
}

export interface Order {
  id: string;
  customer: string;
  email: string;
  toolSlug: string;
  toolName: string;
  plan: string;
  duration: string;
  amount: number;
  method: "bKash" | "Nagad" | "Rocket";
  trxId: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  createdAt: string;
  expiresAt: string;
  timeline: OrderTimelineEvent[];
}

export interface Review {
  id: string;
  toolSlug: string;
  author: string;
  initials: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  verified: boolean;
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  body: string[];
}

export interface Coupon {
  code: string;
  type: "percent" | "fixed";
  value: number;
  uses: number;
  limit: number;
  status: "active" | "expired" | "scheduled";
  expires: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spent: number;
  joined: string;
  status: "active" | "blocked";
}

export const CATEGORY_GROUPS = [
  "Create",
  "Communicate",
  "Build",
  "Grow",
  "Work",
] as const;
