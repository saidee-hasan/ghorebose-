import { useMemo, useState } from "react";
import type { Order, PaymentStatus } from "@/lib/types";
import { formatBDT, formatDate } from "@/lib/format";

const tabs: { id: PaymentStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "submitted", label: "Submitted" },
  { id: "verified", label: "Verified" },
  { id: "delivered", label: "Delivered" },
  { id: "completed", label: "Completed" },
  { id: "rejected", label: "Rejected" },
];

const tone: Record<string, string> = {
  pending: "border-brand-200 bg-brand-50 text-brand-700",
  submitted: "border-brand-200 bg-brand-50 text-brand-700",
  verified: "border-line-strong bg-white text-ink",
  delivered: "border-ink bg-ink text-white",
  completed: "border-ink bg-ink text-white",
  rejected: "border-line bg-surface-muted text-muted-strong",
};

export default function AdminOrdersTable({ orders }: { orders: Order[] }) {
  const [tab, setTab] = useState<PaymentStatus | "all">("all");
  const [q, setQ] = useState("");
  const [statuses, setStatuses] = useState<Record<string, PaymentStatus>>(
    Object.fromEntries(orders.map((o) => [o.id, o.paymentStatus])),
  );
  const [menu, setMenu] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const o of orders) {
      const s = statuses[o.id] ?? o.paymentStatus;
      c[s] = (c[s] ?? 0) + 1;
    }
    return c;
  }, [orders, statuses]);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return orders.filter((o) => {
      const s = statuses[o.id] ?? o.paymentStatus;
      if (tab !== "all" && s !== tab) return false;
      if (term && !`${o.id} ${o.customer} ${o.email} ${o.toolName} ${o.trxId}`.toLowerCase().includes(term))
        return false;
      return true;
    });
  }, [orders, tab, q, statuses]);

  const update = (id: string, status: PaymentStatus, message: string) => {
    setStatuses((s) => ({ ...s, [id]: status }));
    setMenu(null);
    setToast(message);
    setTimeout(() => setToast(null), 2200);
  };

  const actions: { label: string; status: PaymentStatus; message: string }[] = [
    { label: "Verify payment", status: "verified", message: "Payment verified" },
    { label: "Mark delivered", status: "delivered", message: "Order marked delivered" },
    { label: "Complete order", status: "completed", message: "Order completed" },
    { label: "Reject payment", status: "rejected", message: "Payment rejected" },
  ];

  return (
    <div>
      <div className="mb-5 flex flex-col gap-3 rounded-[16px] border border-line bg-white p-3 shadow-xs sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search order ID, customer, transaction ID..."
            className="h-11 w-full rounded-[10px] border border-line bg-white pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-line-strong focus:border-accent"
          />
        </div>
        <span className="shrink-0 px-1 text-sm text-muted">
          <span className="font-semibold text-ink">{filtered.length}</span> orders
        </span>
      </div>

      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
              tab === t.id ? "border-ink bg-ink text-white" : "border-line bg-white text-muted-strong hover:bg-surface-subtle"
            }`}
          >
            {t.label}
            <span className={`rounded-full px-1.5 text-[11px] font-bold ${tab === t.id ? "bg-white/20 text-white" : "bg-surface-muted text-muted"}`}>
              {counts[t.id] ?? 0}
            </span>
          </button>
        ))}
      </div>

      <div className="overflow-visible rounded-[16px] border border-line bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[980px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-subtle text-[11px] font-bold uppercase tracking-[0.08em] text-muted">
                <th className="px-5 py-3.5">Order</th>
                <th className="px-5 py-3.5">Customer</th>
                <th className="px-5 py-3.5">Tool</th>
                <th className="px-5 py-3.5">Amount</th>
                <th className="px-5 py-3.5">Payment</th>
                <th className="px-5 py-3.5">Date</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((o) => {
                const s = statuses[o.id] ?? o.paymentStatus;
                return (
                  <tr key={o.id} className="transition-colors hover:bg-surface-subtle">
                    <td className="px-5 py-4">
                      <a href={`/admin/orders/${o.id}`} className="font-mono text-[13px] font-semibold text-ink hover:text-accent">
                        {o.id}
                      </a>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-ink">{o.customer}</p>
                      <p className="text-xs text-muted">{o.email}</p>
                    </td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-ink">{o.toolName}</p>
                      <p className="text-xs text-muted">{o.plan}</p>
                    </td>
                    <td className="px-5 py-4 font-semibold text-ink">{formatBDT(o.amount)}</td>
                    <td className="px-5 py-4">
                      <p className="font-medium text-ink">{o.method}</p>
                      <p className="font-mono text-xs text-muted">{o.trxId}</p>
                    </td>
                    <td className="px-5 py-4 text-muted">{formatDate(o.createdAt)}</td>
                    <td className="px-5 py-4">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${tone[s]}`}>
                        {s.charAt(0).toUpperCase() + s.slice(1)}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <a href={`/admin/orders/${o.id}`} className="inline-flex h-8 items-center gap-1.5 rounded-[8px] border border-line px-2.5 text-xs font-semibold text-ink transition-colors hover:bg-surface-subtle">
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                          View
                        </a>
                        <div className="relative">
                          <button
                            type="button"
                            aria-label="Order actions"
                            onClick={() => setMenu(menu === o.id ? null : o.id)}
                            className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-line text-muted transition-colors hover:bg-surface-subtle hover:text-ink"
                          >
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
                          </button>
                          {menu === o.id && (
                            <>
                              <div className="fixed inset-0 z-40" onClick={() => setMenu(null)} />
                              <div className="absolute right-0 top-[calc(100%+4px)] z-50 w-48 overflow-hidden rounded-[12px] border border-line bg-white py-1 shadow-lg">
                                {actions.map((a) => (
                                  <button
                                    key={a.label}
                                    type="button"
                                    onClick={() => update(o.id, a.status, `${o.id}: ${a.message}`)}
                                    className="block w-full px-3.5 py-2.5 text-left text-[13px] font-medium text-ink transition-colors hover:bg-surface-subtle"
                                  >
                                    {a.label}
                                  </button>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-semibold text-ink">No orders found</p>
            <p className="mt-1 text-sm text-muted">Try a different filter or search term.</p>
          </div>
        )}
      </div>

      {toast && (
        <div className="fixed bottom-6 left-1/2 z-[110] -translate-x-1/2 rounded-[12px] border border-ink bg-ink px-5 py-3 text-sm font-semibold text-white shadow-lg" style={{ animation: "fade-up .2s cubic-bezier(.16,1,.3,1)" }}>
          {toast}
        </div>
      )}
    </div>
  );
}
