import { useState } from "react";
import type { Tool } from "@/lib/types";

interface Props {
  categories: { slug: string; name: string }[];
  tool?: Tool;
  mode: "new" | "edit";
}

const field =
  "h-12 w-full rounded-[10px] border border-line bg-white px-4 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 hover:border-line-strong focus:border-accent";
const area =
  "w-full rounded-[10px] border border-line bg-white p-4 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 hover:border-line-strong focus:border-accent";
const label = "mb-1.5 block text-[13px] font-semibold text-ink";

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-[16px] border border-line bg-white p-5 shadow-xs sm:p-6">
      <h2 className="font-display text-base font-bold text-ink">{title}</h2>
      {description && <p className="mt-1 text-sm text-muted">{description}</p>}
      <div className="mt-5 space-y-5">{children}</div>
    </section>
  );
}

export default function ToolForm({ categories, tool, mode }: Props) {
  const [features, setFeatures] = useState<string[]>(
    tool?.features ?? ["", "", ""],
  );
  const [plans, setPlans] = useState(
    tool?.plans?.map((p) => ({ name: p.name, price: p.price, duration: p.duration })) ?? [
      { name: "Starter", price: 0, duration: "1 Month" },
    ],
  );
  const [faq, setFaq] = useState(
    tool?.faq?.map((f) => ({ q: f.q, a: f.a })) ?? [{ q: "", a: "" }],
  );
  const [tone, setTone] = useState(tool?.tone ?? "ink");
  const [published, setPublished] = useState(tool?.published ?? true);
  const [free, setFree] = useState(tool?.isFree ?? false);
  const [saved, setSaved] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <form onSubmit={submit} className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start">
      <div className="space-y-6">
        <Section title="Basic information" description="How the tool appears in listings and search.">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={label}>Tool name <span className="text-accent">*</span></label>
              <input name="name" defaultValue={tool?.name} placeholder="e.g. Gemini Pro" required className={field} />
            </div>
            <div>
              <label className={label}>Slug <span className="text-accent">*</span></label>
              <input name="slug" defaultValue={tool?.slug} placeholder="gemini-pro" required className={field} />
            </div>
          </div>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={label}>Category <span className="text-accent">*</span></label>
              <select name="category" defaultValue={tool?.category} required className={field}>
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.slug} value={c.slug}>{c.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={label}>Tags</label>
              <input name="tags" defaultValue={tool?.tags.join(", ")} placeholder="chatbot, multimodal" className={field} />
            </div>
          </div>
          <div>
            <label className={label}>Tagline <span className="text-accent">*</span></label>
            <input name="tagline" defaultValue={tool?.tagline} placeholder="One line that describes the tool" required className={field} />
          </div>
          <div>
            <label className={label}>Short description <span className="text-accent">*</span></label>
            <textarea name="shortDescription" defaultValue={tool?.shortDescription} rows={2} placeholder="Shown on tool cards" required className={area} />
          </div>
          <div>
            <label className={label}>Overview</label>
            <textarea name="overview" defaultValue={tool?.overview} rows={4} placeholder="Full description shown on the tool page" className={area} />
          </div>
        </Section>

        <Section title="Logo & branding">
          <div className="flex flex-wrap items-center gap-5">
            <span className={`inline-flex h-16 w-16 items-center justify-center rounded-[14px] font-display text-lg font-extrabold ${tone === "brand" ? "bg-accent text-white" : tone === "outline" ? "border border-line-strong bg-white text-ink" : "bg-ink text-white"}`}>
              {tool?.mark ?? "AI"}
            </span>
            <div className="flex-1 min-w-[200px]">
              <label className={label}>Logo mark</label>
              <input name="mark" defaultValue={tool?.mark} placeholder="e.g. Ge" maxLength={3} className={field} />
            </div>
          </div>
          <div>
            <label className={label}>Logo style</label>
            <div className="flex gap-2">
              {(["ink", "brand", "outline"] as const).map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTone(t)}
                  aria-pressed={tone === t}
                  className={`flex-1 rounded-[10px] border p-3 text-xs font-semibold capitalize transition-colors ${tone === t ? "border-accent bg-brand-50 text-ink" : "border-line bg-white text-muted-strong hover:border-line-strong"}`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center rounded-[12px] border border-dashed border-line bg-surface-subtle p-6">
            <div className="text-center">
              <svg className="mx-auto text-muted" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><path d="m17 8-5-5-5 5" /><path d="M12 3v12" /></svg>
              <p className="mt-2 text-sm font-semibold text-ink">Upload logo image</p>
              <p className="text-xs text-muted">PNG or SVG, up to 1MB</p>
            </div>
          </div>
        </Section>

        <Section title="Pricing">
          <label className="flex items-center gap-3">
            <input type="checkbox" checked={free} onChange={(e) => setFree(e.target.checked)} className="h-4 w-4 accent-accent" />
            <span className="text-sm font-medium text-ink">This is a free tool</span>
          </label>
          {!free && (
            <div className="grid gap-5 sm:grid-cols-3">
              <div>
                <label className={label}>Price (৳) <span className="text-accent">*</span></label>
                <input name="price" type="number" defaultValue={tool?.price} placeholder="899" className={field} />
              </div>
              <div>
                <label className={label}>Compare-at price (৳)</label>
                <input name="compareAtPrice" type="number" defaultValue={tool?.compareAtPrice} placeholder="1200" className={field} />
              </div>
              <div>
                <label className={label}>Billing</label>
                <select name="billing" defaultValue={tool?.billing ?? "month"} className={field}>
                  <option value="week">Per week</option>
                  <option value="month">Per month</option>
                  <option value="year">Per year</option>
                  <option value="one-time">One-time</option>
                </select>
              </div>
            </div>
          )}
        </Section>

        <Section title="Plans" description="Add the subscription tiers customers can choose from.">
          <div className="space-y-3">
            {plans.map((p, i) => (
              <div key={i} className="grid gap-3 rounded-[12px] border border-line p-4 sm:grid-cols-[1.2fr_1fr_1fr_auto] sm:items-end">
                <div>
                  <label className={label}>Plan name</label>
                  <input value={p.name} onChange={(e) => setPlans((ps) => ps.map((x, j) => (j === i ? { ...x, name: e.target.value } : x)))} className={field} />
                </div>
                <div>
                  <label className={label}>Price (৳)</label>
                  <input type="number" value={p.price} onChange={(e) => setPlans((ps) => ps.map((x, j) => (j === i ? { ...x, price: Number(e.target.value) } : x)))} className={field} />
                </div>
                <div>
                  <label className={label}>Duration</label>
                  <input value={p.duration} onChange={(e) => setPlans((ps) => ps.map((x, j) => (j === i ? { ...x, duration: e.target.value } : x)))} className={field} />
                </div>
                <button type="button" onClick={() => setPlans((ps) => ps.filter((_, j) => j !== i))} aria-label="Remove plan" className="inline-flex h-12 w-12 items-center justify-center rounded-[10px] border border-line text-muted transition-colors hover:bg-surface-subtle hover:text-ink">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /></svg>
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setPlans((ps) => [...ps, { name: "", price: 0, duration: "1 Month" }])} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-line px-4 text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14" /></svg>
            Add plan
          </button>
        </Section>

        <Section title="Features" description="Key capabilities shown on the tool page.">
          <div className="space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex gap-3">
                <input value={f} onChange={(e) => setFeatures((fs) => fs.map((x, j) => (j === i ? e.target.value : x)))} placeholder={`Feature ${i + 1}`} className={field} />
                <button type="button" onClick={() => setFeatures((fs) => fs.filter((_, j) => j !== i))} aria-label="Remove feature" className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-line text-muted transition-colors hover:bg-surface-subtle hover:text-ink">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
                </button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setFeatures((fs) => [...fs, ""])} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-line px-4 text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14" /></svg>
            Add feature
          </button>
        </Section>

        <Section title="FAQ" description="Answer the questions customers ask most.">
          <div className="space-y-3">
            {faq.map((item, i) => (
              <div key={i} className="space-y-3 rounded-[12px] border border-line p-4">
                <div className="flex gap-3">
                  <input value={item.q} onChange={(e) => setFaq((f) => f.map((x, j) => (j === i ? { ...x, q: e.target.value } : x)))} placeholder="Question" className={field} />
                  <button type="button" onClick={() => setFaq((f) => f.filter((_, j) => j !== i))} aria-label="Remove question" className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-line text-muted transition-colors hover:bg-surface-subtle hover:text-ink">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /></svg>
                  </button>
                </div>
                <textarea value={item.a} onChange={(e) => setFaq((f) => f.map((x, j) => (j === i ? { ...x, a: e.target.value } : x)))} placeholder="Answer" rows={2} className={area} />
              </div>
            ))}
          </div>
          <button type="button" onClick={() => setFaq((f) => [...f, { q: "", a: "" }])} className="inline-flex h-10 items-center gap-2 rounded-[10px] border border-line px-4 text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5v14" /></svg>
            Add question
          </button>
        </Section>
      </div>

      {/* Sidebar */}
      <aside className="space-y-4 lg:sticky lg:top-24">
        <div className="rounded-[16px] border border-line bg-white p-5 shadow-xs">
          <h2 className="font-display text-base font-bold text-ink">Publish</h2>
          <label className="mt-4 flex items-center justify-between gap-4 rounded-[12px] border border-line p-4">
            <span>
              <span className="block text-sm font-semibold text-ink">Published</span>
              <span className="mt-0.5 block text-xs text-muted">Visible on the marketplace</span>
            </span>
            <span className="relative inline-flex">
              <input type="checkbox" checked={published} onChange={(e) => setPublished(e.target.checked)} className="peer sr-only" />
              <span className="h-6 w-11 rounded-full bg-line transition-colors peer-checked:bg-accent" />
              <span className={`pointer-events-none absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${published ? "translate-x-[22px]" : "translate-x-0.5"}`} />
            </span>
          </label>

          <div className="mt-4">
            <label className={label}>Stock / availability</label>
            <input name="stock" type="number" defaultValue={tool?.stock ?? 100} className={field} />
          </div>

          <button type="submit" className="mt-5 inline-flex h-12 w-full items-center justify-center rounded-[10px] bg-accent text-sm font-semibold text-white transition-colors hover:bg-accent-hover">
            {mode === "new" ? "Create tool" : "Save changes"}
          </button>
          <a href="/admin/tools" className="mt-2.5 inline-flex h-11 w-full items-center justify-center rounded-[10px] border border-line text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle">
            Cancel
          </a>
        </div>

        {saved && (
          <div className="rounded-[16px] border border-brand-200 bg-brand-50 p-4">
            <p className="text-[13px] font-semibold text-brand-800">
              {mode === "new" ? "Tool created successfully." : "Changes saved successfully."}
            </p>
          </div>
        )}

        <div className="rounded-[16px] border border-line bg-surface-subtle p-5">
          <h3 className="text-sm font-bold text-ink">Tips</h3>
          <ul className="mt-3 space-y-2 text-[13px] text-muted">
            <li>• Write a clear tagline under 80 characters.</li>
            <li>• Add at least 4 features for a complete listing.</li>
            <li>• Include realistic delivery information in the FAQ.</li>
          </ul>
        </div>
      </aside>
    </form>
  );
}
