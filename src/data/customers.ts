import type { Coupon, Customer } from "@/lib/types";

export const customers: Customer[] = [
  { id: "CUS-001", name: "Saidee Hasan", email: "saidee@example.com", phone: "+880 1712 345678", orders: 8, spent: 7650, joined: "2026-02-14", status: "active" },
  { id: "CUS-002", name: "Nusrat Jahan", email: "nusrat@example.com", phone: "+880 1812 998877", orders: 5, spent: 4320, joined: "2026-03-02", status: "active" },
  { id: "CUS-003", name: "Tanvir Ahmed", email: "tanvir@example.com", phone: "+880 1911 223344", orders: 11, spent: 12400, joined: "2026-01-21", status: "active" },
  { id: "CUS-004", name: "Farhana Akter", email: "farhana@example.com", phone: "+880 1611 556677", orders: 3, spent: 2100, joined: "2026-05-09", status: "active" },
  { id: "CUS-005", name: "Rakib Hossain", email: "rakib@example.com", phone: "+880 1511 445566", orders: 7, spent: 5890, joined: "2026-02-28", status: "active" },
  { id: "CUS-006", name: "Imran Kabir", email: "imran@example.com", phone: "+880 1311 778899", orders: 2, spent: 1550, joined: "2026-06-15", status: "active" },
  { id: "CUS-007", name: "Sadia Islam", email: "sadia@example.com", phone: "+880 1411 332211", orders: 4, spent: 3980, joined: "2026-04-04", status: "active" },
  { id: "CUS-008", name: "Mehedi Hasan", email: "mehedi@example.com", phone: "+880 1711 665544", orders: 1, spent: 350, joined: "2026-08-19", status: "blocked" },
];

export const coupons: Coupon[] = [
  { code: "WELCOME10", type: "percent", value: 10, uses: 412, limit: 1000, status: "active", expires: "2026-12-31" },
  { code: "AI50", type: "fixed", value: 50, uses: 236, limit: 500, status: "active", expires: "2026-10-31" },
  { code: "STUDENT20", type: "percent", value: 20, uses: 88, limit: 300, status: "active", expires: "2026-11-30" },
  { code: "EID25", type: "percent", value: 25, uses: 500, limit: 500, status: "expired", expires: "2026-04-15" },
  { code: "BLACKFRIDAY", type: "percent", value: 30, uses: 0, limit: 2000, status: "scheduled", expires: "2026-11-29" },
];
