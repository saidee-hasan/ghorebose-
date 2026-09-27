import { useEffect, useMemo, useState } from "react";
import type { Tool } from "@/lib/types";
import { formatBDT, billingLabel } from "@/lib/format";

interface Props {
  tools: Tool[];
  categories: { slug: string; name: string }[];
  pageSize?: number;
}

const sortOptions = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
  { id: "name", label: "Name (A–Z)" },
];

const badgeLabel: Record<string, string> = {
  trending: "Trending",
  new: "New",
  popular: "Popular",
  "best-value": "Best Value",
  "editor-choice": "Editor's Choice",
};

function Stars({ rating, count }: { rating: number; count: number }) {
  return (
    <span className="flex items-center gap-1">
      <span className="flex items-center gap-0.5" aria-hidden="true">
        {[1, 2, 3, 4, 5].map((s) => {
          const fill = Math.max(0, Math.min(1, rating - (s - 1)));
          return (
            <span key={s} className="relative inline-block h-3.5 w-3.5">
              <svg viewBox="0 0 24 24" className="absolute inset-0" width="14" height="14" fill="none" stroke="#E5E7EB" strokeWidth="1.5">
                <path d="M11.5 2.5 14.3 8l6.2.9-4.5 4.3 1.1 6.1-5.6-2.9-5.6 2.9 1.1-6.1L2.5 8.9 8.7 8z" />
              </svg>
              <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill * 100}%` }}>
                <svg viewBox="0 0 24 24" width="14" height="14" fill="#F97316" stroke="#F97316" strokeWidth="1.5">
                  <path d="M11.5 2.5 14.3 8l6.2.9-4.5 4.3 1.1 6.1-5.6-2.9-5.6 2.9 1.1-6.1L2.5 8.9 8.7 8z" />
                </svg>
              </span>
            </span>
          );
        })}
      </span>
      <span className="text-xs font-semibold text-ink">{rating.toFixed(1)}</span>
      <span className="text-xs text-muted">({count})</span>
    </span>
  );
}

function Card({ tool, catName }: { tool: Tool; catName: (s: string) => string }) {
  const discount = tool.compareAtPrice
    ? Math.round((1 - tool.price / tool.compareAtPrice) * 100)
    : 0;

  return (
    <article className="group flex flex-col overflow-hidden rounded-[18px] border border-line bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-line-strong hover:shadow-lg">
      <a href={`/tools/${tool.slug}`} className="relative block aspect-[16/11] overflow-hidden bg-surface-subtle" aria-label={`View ${tool.name}`}>
        <img
          src={`/covers/${tool.slug}.svg`}
          alt={`${tool.name} — ${catName(tool.category)}`}
          width="800"
          height="500"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
        />
        <span className="absolute left-3 top-3 flex flex-col items-start gap-2">
          {tool.isFree ? (
            <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold uppercase tracking-wide text-white shadow-sm">Free</span>
          ) : discount > 0 ? (
            <span className="rounded-full bg-ink px-3 py-1 text-xs font-bold tracking-wide text-white shadow-sm">−{discount}%</span>
          ) : null}
          {tool.badge && (
            <span className="rounded-full border border-line bg-white/95 px-3 py-1 text-xs font-bold tracking-wide text-ink shadow-sm backdrop-blur">
              {badgeLabel[tool.badge]}
            </span>
          )}
        </span>
        <span className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-line bg-white/95 text-muted shadow-sm backdrop-blur transition-colors group-hover:text-accent" aria-hidden="true">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
        </span>
      </a>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-center justify-between gap-3">
          <a href={`/category/${tool.category}`} className="text-xs font-bold uppercase tracking-wider text-accent transition-colors hover:text-accent-hover">
            {catName(tool.category)}
          </a>
          <Stars rating={tool.rating} count={tool.reviewCount} />
        </div>
        <h3 className="mt-3 font-display text-lg font-extrabold leading-snug tracking-tight text-ink">
          <a href={`/tools/${tool.slug}`} className="transition-colors hover:text-accent">{tool.name}</a>
        </h3>

        <div className="mt-4 flex items-end justify-between gap-3 border-t border-line pt-4">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="font-display text-2xl font-extrabold tracking-tight text-accent">
                {tool.isFree ? "Free" : formatBDT(tool.price)}
              </span>
              {!tool.isFree && <span className="text-xs font-medium text-muted">{billingLabel(tool.billing)}</span>}
              {tool.compareAtPrice && <span className="text-xs font-medium text-muted line-through">{formatBDT(tool.compareAtPrice)}</span>}
            </div>
            <p className="mt-1 text-xs text-muted">{tool.userCount} buyers</p>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          <a href={`/tools/${tool.slug}`} className="inline-flex h-11 items-center justify-center rounded-[10px] border border-line bg-white text-sm font-semibold text-ink transition-colors hover:border-line-strong hover:bg-surface-subtle">View Details</a>
          <a href={tool.isFree ? `/tools/${tool.slug}` : `/checkout/${tool.slug}`} className="inline-flex h-11 items-center justify-center gap-1.5 rounded-[10px] bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent-hover shadow-xs">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="8" cy="21" r="1" /><circle cx="19" cy="21" r="1" /><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" /></svg>
            {tool.isFree ? "Get Free" : "Buy Now"}
          </a>
        </div>
      </div>
    </article>
  );
}

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[18px] border border-line bg-white shadow-xs">
      <div className="skeleton aspect-[16/11] w-full" />
      <div className="space-y-3 p-5">
        <div className="skeleton h-3 w-1/3" />
        <div className="skeleton h-5 w-2/3" />
        <div className="skeleton h-3 w-full" />
        <div className="skeleton h-3 w-5/6" />
        <div className="skeleton h-11 w-full rounded-[10px]" />
      </div>
    </div>
  );
}

export default function ProductGrid({ tools, categories, pageSize = 12 }: Props) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [sort, setSort] = useState("popular");
  const [count, setCount] = useState(pageSize);
  const [loading, setLoading] = useState(false);

  const catName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    const list = tools.filter((t) => {
      if (cat !== "all" && t.category !== cat) return false;
      if (term && !`${t.name} ${t.tagline} ${t.shortDescription} ${t.category} ${t.tags.join(" ")}`.toLowerCase().includes(term))
        return false;
      return true;
    });
    return [...list].sort((a, b) => {
      switch (sort) {
        case "newest":
          return +new Date(b.createdAt) - +new Date(a.createdAt);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        case "name":
          return a.name.localeCompare(b.name);
        default:
          return b.popularity - a.popularity;
      }
    });
  }, [tools, q, cat, sort]);

  useEffect(() => {
    setCount(pageSize);
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 200);
    return () => clearTimeout(id);
  }, [q, cat, sort, pageSize]);

  const visible = filtered.slice(0, count);
  const activeCat = categories.find((c) => c.slug === cat);

  return (
    <div>
      {/* Controls */}
      <div className="rounded-[16px] border border-line bg-white p-3 shadow-xs sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search all AI tools by name..."
              aria-label="Search all AI tools"
              className="h-12 w-full rounded-[10px] border border-line bg-white pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-line-strong focus:border-accent"
            />
          </div>
          <div className="relative sm:w-56">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              aria-label="Sort tools"
              className="h-12 w-full appearance-none rounded-[10px] border border-line bg-white pl-3.5 pr-9 text-sm font-medium text-ink outline-none transition-colors hover:border-line-strong focus:border-accent"
            >
              {sortOptions.map((o) => (
                <option key={o.id} value={o.id}>{o.label}</option>
              ))}
            </select>
            <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
          </div>
        </div>

        {/* category chips */}
        <div className="no-scrollbar -mx-1 mt-3 flex gap-2 overflow-x-auto px-1 pb-1">
          <button
            type="button"
            onClick={() => setCat("all")}
            className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${cat === "all" ? "border-ink bg-ink text-white" : "border-line bg-white text-muted-strong hover:bg-surface-subtle"}`}
          >
            All tools
          </button>
          {categories.map((c) => (
            <button
              key={c.slug}
              type="button"
              onClick={() => setCat(c.slug)}
              className={`shrink-0 rounded-full border px-4 py-1.5 text-sm font-semibold transition-colors ${cat === c.slug ? "border-ink bg-ink text-white" : "border-line bg-white text-muted-strong hover:bg-surface-subtle"}`}
            >
              {c.name}
            </button>
          ))}
        </div>
      </div>

      {/* count */}
      <div className="mt-4 mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-muted">
          Showing <span className="font-semibold text-ink">{visible.length}</span> of{" "}
          <span className="font-semibold text-ink">{filtered.length}</span> tools
          {activeCat && cat !== "all" && <> in <span className="font-semibold text-ink">{activeCat.name}</span></>}
        </p>
        {(q || cat !== "all" || sort !== "popular") && (
          <button
            type="button"
            onClick={() => { setQ(""); setCat("all"); setSort("popular"); }}
            className="text-sm font-semibold text-accent hover:text-accent-hover"
          >
            Reset
          </button>
        )}
      </div>

      {/* grid */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-line bg-surface-subtle px-6 py-16 text-center">
          <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-muted">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </span>
          <h3 className="text-base font-bold text-ink">No tools found</h3>
          <p className="mt-1.5 max-w-sm text-sm text-muted">Try a different name or choose another category.</p>
          <button type="button" onClick={() => { setQ(""); setCat("all"); setSort("popular"); }} className="mt-5 inline-flex h-11 items-center justify-center rounded-[10px] bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover">
            Show all tools
          </button>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {visible.map((t) => <Card key={t.slug} tool={t} catName={catName} />)}
          </div>
          {count < filtered.length && (
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={() => setCount((c) => c + pageSize)}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-[10px] border border-line bg-white px-6 text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle"
              >
                Load more tools
                <span className="text-muted">({filtered.length - count} left)</span>
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
