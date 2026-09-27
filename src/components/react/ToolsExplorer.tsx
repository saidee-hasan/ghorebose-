import { useEffect, useMemo, useState } from "react";
import type { Tool } from "@/lib/types";
import ToolCard, { registerCategories } from "./ToolCard";

interface Props {
  tools: Tool[];
  categories: { slug: string; name: string }[];
  initialCategory?: string;
  initialQuery?: string;
  initialSort?: SortKey;
  lockCategory?: boolean;
}

type SortKey = "popular" | "newest" | "price-asc" | "price-desc" | "rating";

const sortOptions: { id: SortKey; label: string }[] = [
  { id: "popular", label: "Most Popular" },
  { id: "newest", label: "Newest" },
  { id: "price-asc", label: "Price: Low to High" },
  { id: "price-desc", label: "Price: High to Low" },
  { id: "rating", label: "Top Rated" },
];

const priceBuckets = [
  { id: "all", label: "All prices", test: (_t: Tool) => true },
  { id: "free", label: "Free", test: (t: Tool) => t.isFree },
  { id: "u500", label: "Under ৳500", test: (t: Tool) => !t.isFree && t.price < 500 },
  { id: "500-1000", label: "৳500 – ৳1,000", test: (t: Tool) => t.price >= 500 && t.price <= 1000 },
  { id: "1000-2000", label: "৳1,000 – ৳2,000", test: (t: Tool) => t.price > 1000 && t.price <= 2000 },
  { id: "2000+", label: "৳2,000+", test: (t: Tool) => t.price > 2000 },
];

const ratingOptions = [
  { id: "all", label: "Any rating", test: (_t: Tool) => true },
  { id: "4.5", label: "4.5 & up", test: (t: Tool) => t.rating >= 4.5 },
  { id: "4.0", label: "4.0 & up", test: (t: Tool) => t.rating >= 4.0 },
  { id: "3.5", label: "3.5 & up", test: (t: Tool) => t.rating >= 3.5 },
];

function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-[14px] sm:rounded-[18px] border border-line bg-white shadow-xs">
      <div className="skeleton aspect-[16/10] w-full" />
      <div className="p-3 sm:p-4 space-y-2.5">
        <div className="flex justify-between items-center">
          <div className="skeleton h-3 w-1/3 rounded" />
          <div className="skeleton h-3 w-10 rounded" />
        </div>
        <div className="skeleton h-4 w-3/4 rounded" />
        <div className="flex justify-between items-center pt-2 border-t border-line">
          <div className="skeleton h-4 w-16 rounded" />
          <div className="skeleton h-3 w-12 rounded" />
        </div>
        <div className="grid grid-cols-2 gap-1.5 pt-1">
          <div className="skeleton h-8 sm:h-9 rounded-[8px] sm:rounded-[10px]" />
          <div className="skeleton h-8 sm:h-9 rounded-[8px] sm:rounded-[10px]" />
        </div>
      </div>
    </div>
  );
}

interface PanelProps {
  categories: { slug: string; name: string }[];
  category: string;
  setCategory: (v: string) => void;
  price: string;
  setPrice: (v: string) => void;
  access: string;
  setAccess: (v: string) => void;
  rating: string;
  setRating: (v: string) => void;
  lockCategory?: boolean;
  onClear: () => void;
}

function FilterPanel({
  categories,
  category,
  setCategory,
  price,
  setPrice,
  access,
  setAccess,
  rating,
  setRating,
  lockCategory,
  onClear,
}: PanelProps) {
  return (
    <div className="space-y-6">
      {!lockCategory && (
        <div>
          <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-ink">Category</h3>
          <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
            <label className="flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-1.5 text-sm transition-colors hover:bg-surface-subtle">
              <input type="radio" name="category" checked={category === "all"} onChange={() => setCategory("all")} className="h-4 w-4 accent-accent" />
              <span className={category === "all" ? "font-semibold text-ink" : "text-muted-strong"}>All categories</span>
            </label>
            {categories.map((c) => (
              <label key={c.slug} className="flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-1.5 text-sm transition-colors hover:bg-surface-subtle">
                <input type="radio" name="category" checked={category === c.slug} onChange={() => setCategory(c.slug)} className="h-4 w-4 accent-accent" />
                <span className={category === c.slug ? "font-semibold text-ink" : "text-muted-strong"}>{c.name}</span>
              </label>
            ))}
          </div>
        </div>
      )}

      <div className="border-t border-line pt-5">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-ink">Price</h3>
        <div className="space-y-1">
          {priceBuckets.map((b) => (
            <label key={b.id} className="flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-1.5 text-sm transition-colors hover:bg-surface-subtle">
              <input type="radio" name="price" checked={price === b.id} onChange={() => setPrice(b.id)} className="h-4 w-4 accent-accent" />
              <span className={price === b.id ? "font-semibold text-ink" : "text-muted-strong"}>{b.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="border-t border-line pt-5">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-ink">Access</h3>
        <div className="flex gap-2">
          {[
            { id: "all", label: "All" },
            { id: "free", label: "Free" },
            { id: "paid", label: "Paid" },
          ].map((a) => (
            <button
              key={a.id}
              type="button"
              onClick={() => setAccess(a.id)}
              className={`h-9 flex-1 rounded-[10px] border text-[13px] font-semibold transition-colors ${
                access === a.id ? "border-accent bg-accent text-white" : "border-line bg-white text-ink hover:bg-surface-subtle"
              }`}
            >
              {a.label}
            </button>
          ))}
        </div>
      </div>

      <div className="border-t border-line pt-5">
        <h3 className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-ink">Rating</h3>
        <div className="space-y-1">
          {ratingOptions.map((r) => (
            <label key={r.id} className="flex cursor-pointer items-center gap-2.5 rounded-[8px] px-2 py-1.5 text-sm transition-colors hover:bg-surface-subtle">
              <input type="radio" name="rating" checked={rating === r.id} onChange={() => setRating(r.id)} className="h-4 w-4 accent-accent" />
              <span className={rating === r.id ? "font-semibold text-ink" : "text-muted-strong"}>{r.label}</span>
            </label>
          ))}
        </div>
      </div>

      <button
        type="button"
        onClick={onClear}
        className="w-full rounded-[10px] border border-line bg-white py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle"
      >
        Clear all filters
      </button>
    </div>
  );
}

export default function ToolsExplorer({
  tools,
  categories,
  initialCategory = "all",
  initialQuery = "",
  initialSort = "popular",
  lockCategory = false,
}: Props) {
  registerCategories(categories);

  const [query, setQuery] = useState(initialQuery);
  const [category, setCategory] = useState(initialCategory);
  const [price, setPrice] = useState("all");
  const [access, setAccess] = useState("all");
  const [rating, setRating] = useState("all");
  const [sort, setSort] = useState<SortKey>(initialSort);
  const [view, setView] = useState<"grid" | "list">("grid");
  const [drawer, setDrawer] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const id = setTimeout(() => setLoading(false), 220);
    return () => clearTimeout(id);
  }, [query, category, price, access, rating, sort]);

  useEffect(() => {
    document.body.style.overflow = drawer ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawer]);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();
    const priceTest = priceBuckets.find((b) => b.id === price)?.test ?? (() => true);
    const ratingTest = ratingOptions.find((r) => r.id === rating)?.test ?? (() => true);

    let list = tools.filter((t) => {
      if (category !== "all" && t.category !== category) return false;
      if (!priceTest(t)) return false;
      if (!ratingTest(t)) return false;
      if (access === "free" && !t.isFree) return false;
      if (access === "paid" && t.isFree) return false;
      if (term && ![t.name, t.tagline, t.shortDescription, t.category, ...t.tags].join(" ").toLowerCase().includes(term)) return false;
      return true;
    });

    list = [...list].sort((a, b) => {
      switch (sort) {
        case "newest":
          return +new Date(b.createdAt) - +new Date(a.createdAt);
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return b.popularity - a.popularity;
      }
    });
    return list;
  }, [tools, query, category, price, access, rating, sort]);

  const activeCount =
    (category !== "all" ? 1 : 0) +
    (price !== "all" ? 1 : 0) +
    (access !== "all" ? 1 : 0) +
    (rating !== "all" ? 1 : 0);

  const clear = () => {
    setCategory(lockCategory ? initialCategory : "all");
    setPrice("all");
    setAccess("all");
    setRating("all");
    setQuery("");
  };

  const panelProps: PanelProps = {
    categories,
    category,
    setCategory,
    price,
    setPrice,
    access,
    setAccess,
    rating,
    setRating,
    lockCategory,
    onClear: clear,
  };

  return (
    <div className="lg:grid lg:grid-cols-[260px_1fr] lg:gap-8 xl:grid-cols-[280px_1fr]">
      {/* Desktop sidebar */}
      <aside className="hidden lg:block">
        <div className="sticky top-24 rounded-[16px] border border-line bg-white p-5 shadow-xs">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="font-display text-base font-bold text-ink">Filters</h2>
            {activeCount > 0 && (
              <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-white">{activeCount}</span>
            )}
          </div>
          <FilterPanel {...panelProps} />
        </div>
      </aside>

      <div className="min-w-0">
        {/* Toolbar */}
        <div className="mb-5 flex flex-col gap-3 rounded-[16px] border border-line bg-white p-3 shadow-xs sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search AI tools..."
              aria-label="Search tools"
              className="h-11 w-full rounded-[10px] border border-line bg-white pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-line-strong focus:border-accent"
            />
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setDrawer(true)}
              className="inline-flex h-11 flex-1 items-center justify-center gap-2 rounded-[10px] border border-line bg-white px-3.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle lg:hidden"
            >
              <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z" /></svg>
              Filters
              {activeCount > 0 && <span className="rounded-full bg-accent px-1.5 text-[11px] font-bold text-white">{activeCount}</span>}
            </button>

            <div className="relative flex-1 sm:flex-none">
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                aria-label="Sort tools"
                className="h-11 w-full appearance-none rounded-[10px] border border-line bg-white pl-3.5 pr-9 text-sm font-medium text-ink outline-none transition-colors hover:border-line-strong focus:border-accent sm:w-52"
              >
                {sortOptions.map((o) => (
                  <option key={o.id} value={o.id}>{o.label}</option>
                ))}
              </select>
              <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
            </div>

            <div className="hidden items-center gap-1 rounded-[10px] border border-line bg-white p-1 lg:flex">
              {(["grid", "list"] as const).map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setView(v)}
                  aria-label={`${v} view`}
                  aria-pressed={view === v}
                  className={`inline-flex h-8 w-8 items-center justify-center rounded-[7px] transition-colors ${view === v ? "bg-ink text-white" : "text-muted hover:bg-surface-subtle"}`}
                >
                  {v === "grid" ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /></svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><line x1="8" x2="21" y1="6" y2="6" /><line x1="8" x2="21" y1="12" y2="12" /><line x1="8" x2="21" y1="18" y2="18" /><line x1="3" x2="3.01" y1="6" y2="6" /><line x1="3" x2="3.01" y1="12" y2="12" /><line x1="3" x2="3.01" y1="18" y2="18" /></svg>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Count */}
        <div className="mb-4 flex items-center justify-between">
          <p className="text-sm text-muted">
            {loading ? "Loading tools..." : (
              <>
                <span className="font-semibold text-ink">{filtered.length}</span>{" "}
                {filtered.length === 1 ? "tool" : "tools"} found
              </>
            )}
          </p>
          {activeCount > 0 && (
            <button type="button" onClick={clear} className="text-sm font-semibold text-accent hover:text-accent-hover">
              Clear filters
            </button>
          )}
        </div>

        {/* Results */}
        {loading ? (
          <div className="grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-[16px] border border-dashed border-line bg-surface-subtle px-6 py-16 text-center">
            <span className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-full border border-line bg-white text-muted">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
            </span>
            <h3 className="text-base font-bold text-ink">No tools match your filters</h3>
            <p className="mt-1.5 max-w-sm text-sm text-muted">Try a different keyword or clear the filters to see everything in the marketplace.</p>
            <button type="button" onClick={clear} className="mt-5 inline-flex h-11 items-center justify-center rounded-[10px] bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover">Clear all filters</button>
          </div>
        ) : (
          <div className={view === "grid" ? "grid grid-cols-2 gap-3 sm:gap-5 xl:grid-cols-3" : "space-y-3 sm:space-y-4"}>
            {filtered.map((t) => <ToolCard key={t.slug} tool={t} view={view} />)}
          </div>
        )}
      </div>

      {/* Mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-[100] lg:hidden">
          <div className="fixed inset-0 bg-ink/60 backdrop-blur-xs" style={{ animation: "fade-in .15s ease" }} onClick={() => setDrawer(false)} />
          <div className="fixed bottom-0 left-0 right-0 z-[110] max-h-[85vh] overflow-y-auto rounded-t-3xl border-t border-line bg-white p-5 shadow-2xl" style={{ animation: "fade-up .22s cubic-bezier(.16,1,.3,1)" }}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-bold text-ink">ফিল্টার (Filters)</h2>
              <button type="button" onClick={() => setDrawer(false)} aria-label="ফিল্টার বন্ধ করুন" className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] text-ink transition-colors hover:bg-surface-muted">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>
            <FilterPanel {...panelProps} />
            <div className="sticky bottom-0 mt-5 border-t border-line bg-white pt-4">
              <button type="button" onClick={() => setDrawer(false)} className="h-12 w-full rounded-[10px] bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent-hover">
                Show {filtered.length} {filtered.length === 1 ? "tool" : "tools"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
