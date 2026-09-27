import { useMemo, useState } from "react";
import type { Order, OrderStatus } from "@/lib/types";
import { tools } from "@/data/tools";
import { formatBDT, formatDate } from "@/lib/format";

const tabs: { id: OrderStatus | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "completed", label: "Completed" },
  { id: "cancelled", label: "Cancelled" },
];

const statusTone: Record<OrderStatus, string> = {
  pending: "border-brand-200 bg-brand-50 text-brand-700",
  processing: "border-brand-200 bg-brand-50 text-brand-700",
  completed: "border-ink bg-ink text-white",
  cancelled: "border-line bg-surface-muted text-muted-strong",
};

export default function OrdersList({ orders }: { orders: Order[] }) {
  const [tab, setTab] = useState<OrderStatus | "all">("all");

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: orders.length };
    for (const o of orders) c[o.status] = (c[o.status] ?? 0) + 1;
    return c;
  }, [orders]);

  const filtered = useMemo(
    () => (tab === "all" ? orders : orders.filter((o) => o.status === tab)),
    [orders, tab],
  );

  const toolOf = (slug: string) => tools.find((t) => t.slug === slug);

  return (
    <div>
      {/* Tabs */}
      <div className="no-scrollbar mb-5 flex gap-2 overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            aria-pressed={tab === t.id}
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
              tab === t.id
                ? "border-ink bg-ink text-white"
                : "border-line bg-white text-muted-strong hover:bg-surface-subtle"
            }`}
          >
            {t.label}
            <span
              className={`rounded-full px-1.5 text-[11px] font-bold ${
                tab === t.id ? "bg-white/20 text-white" : "bg-surface-muted text-muted"
              }`}
            >
              {counts[t.id] ?? 0}
            </span>
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-line bg-surface-subtle px-6 py-16 text-center">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-muted">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></svg>
          </span>
          <h3 className="text-base font-bold text-ink">No {tab === "all" ? "" : tab} orders</h3>
          <p className="mt-1.5 max-w-sm text-sm text-muted">
            Orders you place will appear here with their live status.
          </p>
          <a href="/tools" className="mt-5 inline-flex h-11 items-center justify-center rounded-[10px] bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover">
            Browse AI tools
          </a>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((o) => {
            const tool = toolOf(o.toolSlug);
            return (
              <article key={o.id} className="rounded-[16px] border border-line bg-white p-5 shadow-xs transition-shadow hover:shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex min-w-0 items-center gap-4">
                    <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] font-display text-sm font-extrabold ${tool?.tone === "brand" ? "bg-accent text-white" : tool?.tone === "outline" ? "border border-line-strong bg-white text-ink" : "bg-ink text-white"}`}>
                      {tool?.mark ?? "AI"}
                    </span>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="font-display text-[15px] font-bold text-ink">{o.toolName}</h3>
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-bold ${statusTone[o.status]}`}>
                          {o.status.charAt(0).toUpperCase() + o.status.slice(1)}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-muted">
                        {o.plan} · {o.duration} · <span className="font-mono">{o.id}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-display text-lg font-extrabold text-ink">{formatBDT(o.amount)}</p>
                    <p className="text-xs text-muted">{formatDate(o.createdAt)}</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-xs text-muted">
                    <span>Payment: <span className="font-semibold text-ink">{o.method}</span></span>
                    <span>TrxID: <span className="font-mono font-semibold text-ink">{o.trxId}</span></span>
                  </div>
                  <a href={`/dashboard/orders/${o.id}`} className="inline-flex h-9 items-center gap-1.5 rounded-[10px] border border-line px-3.5 text-[13px] font-semibold text-ink transition-colors hover:bg-surface-subtle">
                    View Details
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
