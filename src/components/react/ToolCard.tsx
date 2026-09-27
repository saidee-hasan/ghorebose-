import type { Tool } from "@/lib/types";
import { formatBDT } from "@/lib/format";

const catNames: Record<string, string> = {};
export function registerCategories(cats: { slug: string; name: string }[]) {
  for (const c of cats) catNames[c.slug] = c.name;
}
function catName(slug: string) {
  return catNames[slug] ?? slug.replace(/-/g, " ");
}

const badgeMeta: Record<
  string,
  { label: string; tone: string }
> = {
  trending: { label: "Trending", tone: "bg-brand-50 text-brand-700 border-brand-200" },
  new: { label: "New", tone: "bg-ink text-white" },
  popular: { label: "Popular", tone: "bg-accent text-white" },
  "best-value": { label: "Best Value", tone: "bg-emerald-600 text-white" },
  "editor-choice": { label: "Editor's Choice", tone: "bg-ink text-white" },
};

function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex items-center gap-0.5" aria-label={`${rating} out of 5`}>
      <svg width="13" height="13" viewBox="0 0 24 24" fill="#F97316" stroke="#F97316" strokeWidth="1.5">
        <path d="M11.5 2.5 14.3 8l6.2.9-4.5 4.3 1.1 6.1-5.6-2.9-5.6 2.9 1.1-6.1L2.5 8.9 8.7 8z" />
      </svg>
      <span className="text-[11px] sm:text-xs font-bold text-ink">{rating.toFixed(1)}</span>
    </span>
  );
}

export default function ToolCard({
  tool,
  view = "grid",
}: {
  tool: Tool;
  view?: "grid" | "list";
}) {
  const meta = tool.badge ? badgeMeta[tool.badge] : null;
  const discount = tool.compareAtPrice
    ? Math.round((1 - tool.price / tool.compareAtPrice) * 100)
    : 0;

  const stockCount = tool.stock || 15;
  const durationLabel = tool.duration
    ? tool.duration
    : tool.billing === "one-time"
      ? "One-time"
      : "Month";

  if (view === "list") {
    return (
      <article className="group flex flex-col gap-4 overflow-hidden rounded-[16px] border border-line bg-white p-4 shadow-xs transition-all duration-200 hover:border-line-strong hover:shadow-md sm:flex-row sm:items-center sm:p-5">
        <a href={`/tools/${tool.slug}`} className="relative block h-32 w-full shrink-0 overflow-hidden rounded-[12px] bg-surface-subtle sm:h-28 sm:w-44">
          <img
            src={`/covers/${tool.slug}.svg`}
            alt={tool.name}
            width="400"
            height="250"
            loading="lazy"
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {tool.isFree ? (
            <span className="absolute left-2 top-2 rounded-full bg-accent px-2 py-0.5 text-[10px] font-bold text-white shadow-xs uppercase">FREE</span>
          ) : discount > 0 ? (
            <span className="absolute left-2 top-2 rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold text-white shadow-xs">−{discount}%</span>
          ) : null}
        </a>

        <div className="flex min-w-0 flex-1 flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-accent truncate">
                {catName(tool.category)}
              </span>
              <Stars rating={tool.rating} />
            </div>

            <h3 className="mt-1 font-display text-base sm:text-lg font-bold text-ink group-hover:text-accent transition-colors">
              <a href={`/tools/${tool.slug}`}>{tool.name}</a>
            </h3>
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs text-muted font-bangla">
            <span className="inline-flex items-center gap-1 font-medium text-emerald-700">
              <span className="h-2 w-2 rounded-full bg-emerald-500"></span>
              স্টক: {stockCount}টি বাকি
            </span>
            <span>•</span>
            <span>মেয়াদ: {durationLabel}</span>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 border-t border-line pt-3 sm:w-44 sm:border-t-0 sm:border-l sm:pl-4 sm:pt-0 sm:items-end">
          <div className="flex items-baseline gap-1.5 sm:text-right">
            <span className="font-display text-xl font-extrabold text-accent">
              {tool.isFree ? "Free" : formatBDT(tool.price)}
            </span>
            {!tool.isFree && (
              <span className="text-xs font-medium text-muted">/{durationLabel}</span>
            )}
          </div>
          {tool.compareAtPrice && (
            <span className="text-xs text-muted line-through">{formatBDT(tool.compareAtPrice)}</span>
          )}
          <div className="grid w-full grid-cols-2 gap-2 sm:grid-cols-1">
            <a href={`/tools/${tool.slug}`} className="inline-flex h-9 items-center justify-center rounded-[10px] border border-line text-xs font-semibold text-ink transition-colors hover:bg-surface-subtle">Details</a>
            <a href={tool.isFree ? `/tools/${tool.slug}` : `/checkout/${tool.slug}`} className="inline-flex h-9 items-center justify-center rounded-[10px] bg-accent text-xs font-bold text-white transition-colors hover:bg-accent-hover shadow-xs">{tool.isFree ? "Free" : "Buy Now"}</a>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group flex flex-col overflow-hidden rounded-[14px] sm:rounded-[18px] border border-line bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-lg">
      {/* eCommerce Cover Image */}
      <a href={`/tools/${tool.slug}`} className="relative block aspect-[16/10] overflow-hidden bg-surface-subtle">
        <img
          src={`/covers/${tool.slug}.svg`}
          alt={tool.name}
          width="400"
          height="250"
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />

        {/* Top Badges Overlay */}
        <div className="absolute left-2 top-2 flex flex-col gap-1">
          {tool.isFree ? (
            <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-white shadow-xs uppercase tracking-wide">FREE</span>
          ) : discount > 0 ? (
            <span className="rounded-full bg-ink px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-white shadow-xs">−{discount}%</span>
          ) : null}
        </div>

        {/* Stock Badge on Top Right */}
        <div className="absolute right-2 top-2">
          <span className="inline-flex items-center gap-1 rounded-full bg-white/95 px-2 py-0.5 text-[9px] sm:text-[10px] font-bold text-emerald-800 shadow-xs backdrop-blur font-bangla">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
            স্টক: {stockCount}
          </span>
        </div>
      </a>

      {/* Card Content Body */}
      <div className="flex flex-1 flex-col p-3 sm:p-4">
        <div className="flex items-center justify-between gap-1">
          <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-accent truncate">
            {catName(tool.category)}
          </span>
          <Stars rating={tool.rating} />
        </div>

        <h3 className="mt-1.5 font-display text-xs sm:text-[15px] font-extrabold text-ink group-hover:text-accent transition-colors truncate">
          <a href={`/tools/${tool.slug}`}>{tool.name}</a>
        </h3>

        {/* Duration & Stock Status */}
        <div className="mt-2 flex items-center justify-between text-[10px] sm:text-[11px] text-muted font-bangla border-t border-line/60 pt-2">
          <span className="text-emerald-700 font-semibold">⚡ ইনস্ট্যান্ট ডেলিভারি</span>
          <span className="font-medium bg-surface-muted px-1.5 py-0.5 rounded text-muted-strong">{durationLabel}</span>
        </div>

        {/* Price Section with Eye-catching User-friendly Color */}
        <div className="mt-2.5 flex items-baseline justify-between border-t border-line pt-2.5">
          <div className="flex items-baseline gap-1">
            <span className="font-display text-sm sm:text-lg font-extrabold tracking-tight text-accent">
              {tool.isFree ? "Free" : formatBDT(tool.price)}
            </span>
            {!tool.isFree && (
              <span className="text-[10px] sm:text-xs font-medium text-muted">/{durationLabel}</span>
            )}
          </div>
          {tool.compareAtPrice && (
            <span className="text-[10px] sm:text-xs text-muted line-through">{formatBDT(tool.compareAtPrice)}</span>
          )}
        </div>

        {/* 2 Action Buttons */}
        <div className="mt-3 grid grid-cols-2 gap-1.5 sm:gap-2">
          <a
            href={`/tools/${tool.slug}`}
            className="inline-flex h-8 sm:h-9 items-center justify-center rounded-[8px] sm:rounded-[10px] border border-line bg-white text-[11px] sm:text-xs font-semibold text-ink transition-colors hover:bg-surface-subtle hover:border-line-strong"
          >
            Details
          </a>
          <a
            href={tool.isFree ? `/tools/${tool.slug}` : `/checkout/${tool.slug}`}
            className="inline-flex h-8 sm:h-9 items-center justify-center rounded-[8px] sm:rounded-[10px] bg-accent text-[11px] sm:text-xs font-bold text-white transition-colors hover:bg-accent-hover shadow-xs"
          >
            {tool.isFree ? "Free" : "Buy Now"}
          </a>
        </div>
      </div>
    </article>
  );
}
