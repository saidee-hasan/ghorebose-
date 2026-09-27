import { useMemo, useState } from "react";
import type { Tool } from "@/lib/types";
import { formatBDT, formatDate } from "@/lib/format";

interface Props {
  tools: Tool[];
  categories: { slug: string; name: string }[];
}

export default function AdminToolsTable({ tools, categories }: Props) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [published, setPublished] = useState<Record<string, boolean>>(
    Object.fromEntries(tools.map((t) => [t.slug, t.published])),
  );
  const [confirm, setConfirm] = useState<Tool | null>(null);
  const [removed, setRemoved] = useState<string[]>([]);

  const catName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();
    return tools.filter((t) => {
      if (removed.includes(t.slug)) return false;
      if (cat !== "all" && t.category !== cat) return false;
      if (term && !`${t.name} ${t.slug} ${catName(t.category)}`.toLowerCase().includes(term))
        return false;
      return true;
    });
  }, [tools, q, cat, removed]);

  return (
    <div>
      {/* Toolbar */}
      <div className="mb-5 flex flex-col gap-3 rounded-[16px] border border-line bg-white p-3 shadow-xs sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <span className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
          </span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tools..."
            className="h-11 w-full rounded-[10px] border border-line bg-white pl-10 pr-3 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-line-strong focus:border-accent"
          />
        </div>
        <div className="relative sm:w-56">
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value)}
            className="h-11 w-full appearance-none rounded-[10px] border border-line bg-white pl-3.5 pr-9 text-sm font-medium text-ink outline-none transition-colors hover:border-line-strong focus:border-accent"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6" /></svg>
        </div>
        <span className="shrink-0 px-1 text-sm text-muted">
          <span className="font-semibold text-ink">{filtered.length}</span> tools
        </span>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-[16px] border border-line bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px] text-left text-sm">
            <thead>
              <tr className="border-b border-line bg-surface-subtle text-[11px] font-bold uppercase tracking-[0.08em] text-muted">
                <th className="px-5 py-3.5">Tool</th>
                <th className="px-5 py-3.5">Category</th>
                <th className="px-5 py-3.5">Price</th>
                <th className="px-5 py-3.5">Rating</th>
                <th className="px-5 py-3.5">Stock</th>
                <th className="px-5 py-3.5">Added</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {filtered.map((t) => (
                <tr key={t.slug} className="transition-colors hover:bg-surface-subtle">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-[10px] text-[11px] font-extrabold ${t.tone === "brand" ? "bg-accent text-white" : t.tone === "outline" ? "border border-line-strong bg-white text-ink" : "bg-ink text-white"}`}>
                        {t.mark}
                      </span>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-ink">{t.name}</p>
                        <p className="truncate text-xs text-muted">{t.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-muted">{catName(t.category)}</td>
                  <td className="px-5 py-4 font-semibold text-ink">
                    {t.isFree ? "Free" : formatBDT(t.price)}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex items-center gap-1 font-semibold text-ink">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="#F97316" stroke="#F97316" strokeWidth="1.5"><path d="M11.5 2.5 14.3 8l6.2.9-4.5 4.3 1.1 6.1-5.6-2.9-5.6 2.9 1.1-6.1L2.5 8.9 8.7 8z" /></svg>
                      {t.rating.toFixed(1)}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-muted">
                    {t.stock > 900 ? "Unlimited" : t.stock}
                  </td>
                  <td className="px-5 py-4 text-muted">{formatDate(t.createdAt)}</td>
                  <td className="px-5 py-4">
                    <button
                      type="button"
                      onClick={() => setPublished((p) => ({ ...p, [t.slug]: !p[t.slug] }))}
                      className="inline-flex items-center gap-2"
                      aria-label="Toggle publish"
                    >
                      <span className={`relative inline-flex h-5 w-9 rounded-full transition-colors ${published[t.slug] ? "bg-accent" : "bg-line"}`}>
                        <span className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform ${published[t.slug] ? "translate-x-4" : "translate-x-0.5"}`} />
                      </span>
                      <span className={`text-xs font-semibold ${published[t.slug] ? "text-ink" : "text-muted"}`}>
                        {published[t.slug] ? "Published" : "Draft"}
                      </span>
                    </button>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <a href={`/tools/${t.slug}`} aria-label="View" className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-line text-muted transition-colors hover:bg-surface-subtle hover:text-ink">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
                      </a>
                      <a href={`/admin/tools/${t.slug}`} aria-label="Edit" className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-line text-muted transition-colors hover:bg-surface-subtle hover:text-ink">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" /></svg>
                      </a>
                      <button type="button" onClick={() => setConfirm(t)} aria-label="Delete" className="inline-flex h-8 w-8 items-center justify-center rounded-[8px] border border-line text-muted transition-colors hover:bg-surface-subtle hover:text-ink">
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {filtered.length === 0 && (
          <div className="px-6 py-16 text-center">
            <p className="text-sm font-semibold text-ink">No tools found</p>
            <p className="mt-1 text-sm text-muted">Try a different search or category.</p>
          </div>
        )}
      </div>

      {/* Confirm dialog */}
      {confirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" style={{ animation: "fade-in .15s ease" }} onClick={() => setConfirm(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-lg" style={{ animation: "fade-up .2s cubic-bezier(.16,1,.3,1)" }} role="alertdialog" aria-modal="true">
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-brand-50 text-accent">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
            </span>
            <h3 className="mt-4 font-display text-lg font-bold text-ink">Delete {confirm.name}?</h3>
            <p className="mt-1.5 text-sm text-muted">
              This will remove the tool from the marketplace. Existing orders are not affected. This action cannot be undone.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setConfirm(null)} className="inline-flex h-11 items-center justify-center rounded-[10px] border border-line px-5 text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle">
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setRemoved((r) => [...r, confirm.slug]);
                  setConfirm(null);
                }}
                className="inline-flex h-11 items-center justify-center rounded-[10px] bg-ink px-5 text-sm font-semibold text-white transition-colors hover:bg-ink-soft"
              >
                Delete tool
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
