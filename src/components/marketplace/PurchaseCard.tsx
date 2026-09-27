import { useState } from "react";
import type { Tool } from "@/lib/types";
import { formatBDT } from "@/lib/format";

export default function PurchaseCard({ tool }: { tool: Tool }) {
  const [planIndex, setPlanIndex] = useState(
    Math.max(
      0,
      tool.plans.findIndex((p) => p.popular),
    ),
  );
  const plan = tool.plans[planIndex];

  const buy = () => {
    window.location.href = `/checkout/${tool.slug}?plan=${encodeURIComponent(plan.name)}`;
  };

  return (
    <div className="rounded-[16px] border border-line bg-white p-5 shadow-sm lg:sticky lg:top-24">
      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-muted">
            Starting from
          </p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="font-display text-3xl font-extrabold tracking-tight text-ink">
              {tool.isFree ? "Free" : formatBDT(plan.price)}
            </span>
            {!tool.isFree && (
              <span className="text-sm font-medium text-muted">
                {plan.billing === "one-time" ? "one-time" : "/ month"}
              </span>
            )}
          </div>
        </div>
        {tool.compareAtPrice && !tool.isFree && (
          <span className="rounded-full border border-brand-200 bg-brand-50 px-2.5 py-1 text-xs font-bold text-brand-700">
            Save {Math.round((1 - tool.price / tool.compareAtPrice) * 100)}%
          </span>
        )}
      </div>

      {!tool.isFree && tool.plans.length > 1 && (
        <div className="mt-5">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.12em] text-ink">
            Choose a plan
          </p>
          <div className="space-y-2">
            {tool.plans.map((p, i) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setPlanIndex(i)}
                aria-pressed={i === planIndex}
                className={`flex w-full items-center justify-between gap-3 rounded-[12px] border p-3 text-left transition-colors ${
                  i === planIndex
                    ? "border-accent bg-brand-50"
                    : "border-line bg-white hover:border-line-strong"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                      i === planIndex ? "border-accent" : "border-line-strong"
                    }`}
                  >
                    {i === planIndex && <span className="h-2 w-2 rounded-full bg-accent" />}
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-ink">{p.name}</span>
                    <span className="block text-[11px] text-muted">{p.duration}</span>
                  </span>
                </span>
                <span className="text-sm font-bold text-ink">{formatBDT(p.price)}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      <button
        type="button"
        onClick={buy}
        className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-accent text-[15px] font-semibold text-white transition-colors hover:bg-accent-hover"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
        {tool.isFree ? "Get Free Access" : "Buy Now"}
      </button>

      <button
        type="button"
        className="mt-2.5 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-line bg-white text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle"
      >
        <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
        Save to Wishlist
      </button>

      <div className="mt-5 border-t border-line pt-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-ink">
          Includes
        </p>
        <ul className="mt-3 space-y-2.5">
          {tool.included.map((item) => (
            <li key={item} className="flex items-start gap-2.5 text-[13px] text-muted-strong">
              <svg className="mt-0.5 shrink-0 text-accent" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-5 grid grid-cols-3 gap-2 border-t border-line pt-4">
        {[
          { icon: "shield", label: "Secure" },
          { icon: "zap", label: "Fast" },
          { icon: "headphones", label: "Support" },
        ].map((b) => (
          <div key={b.label} className="flex flex-col items-center gap-1.5 rounded-[10px] bg-surface-subtle py-3">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
              {b.icon === "shield" && <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />}
              {b.icon === "zap" && <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />}
              {b.icon === "headphones" && <path d="M3 14h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7a9 9 0 0 1 18 0v7a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3" />}
            </svg>
            <span className="text-[11px] font-semibold text-muted">{b.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
