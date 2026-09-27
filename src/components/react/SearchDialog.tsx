import { useEffect, useRef, useState } from "react";
import type { Tool } from "@/lib/types";
import { formatBDT } from "@/lib/format";

interface Props {
  tools: Tool[];
  categories: { slug: string; name: string }[];
  variant?: "icon" | "field";
  placeholder?: string;
  autofocus?: boolean;
  onClose?: () => void;
}

export default function SearchDialog({
  tools,
  categories,
  variant = "icon",
  placeholder = "Search AI tools...",
  autofocus = false,
  onClose,
}: Props) {
  const [open, setOpen] = useState(variant === "field");
  const [q, setQ] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        onClose?.();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    window.addEventListener("keydown", onKey);
    if (autofocus) setTimeout(() => inputRef.current?.focus(), 30);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, autofocus, onClose]);

  useEffect(() => {
    document.body.style.overflow = open && variant === "icon" ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open, variant]);

  const term = q.trim().toLowerCase();
  const results = term
    ? tools
        .filter((t) =>
          [t.name, t.tagline, t.category, ...t.tags]
            .join(" ")
            .toLowerCase()
            .includes(term),
        )
        .slice(0, 6)
    : [];

  const catName = (slug: string) =>
    categories.find((c) => c.slug === slug)?.name ?? slug;

  const go = (slug: string) => {
    window.location.href = `/tools/${slug}`;
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `/tools?q=${encodeURIComponent(q)}`;
  };

  const panel = (
    <div className="w-full">
      <form onSubmit={submit} className="relative">
        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
        </span>
        <input
          ref={inputRef}
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder={placeholder}
          className="h-14 w-full rounded-xl border border-line bg-white pl-12 pr-4 text-[15px] text-ink outline-none transition-colors placeholder:text-muted/70 hover:border-line-strong focus:border-accent"
          aria-label="Search AI tools"
        />
      </form>

      {term ? (
        <div className="mt-4">
        <p className="mb-2 px-1 text-[11px] font-bold uppercase tracking-[0.14em] text-muted">
          Results
        </p>
        <ul className="space-y-1">
          {results.length === 0 && (
            <li className="px-1 py-6 text-center text-sm text-muted">
              No tools found for “{q}”.
            </li>
          )}
          {results.map((t) => (
            <li key={t.slug}>
              <button
                type="button"
                onClick={() => go(t.slug)}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors hover:bg-surface-subtle"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] text-xs font-extrabold ${
                    t.tone === "brand"
                      ? "bg-accent text-white"
                      : t.tone === "outline"
                        ? "border border-line-strong bg-white text-ink"
                        : "bg-ink text-white"
                  }`}
                >
                  {t.mark}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-center gap-2">
                    <span className="truncate text-sm font-semibold text-ink">
                      {t.name}
                    </span>
                    {t.isFree && (
                      <span className="rounded-full border border-brand-200 bg-brand-50 px-1.5 py-0.5 text-[10px] font-bold text-brand-700">
                        FREE
                      </span>
                    )}
                  </span>
                  <span className="block truncate text-xs text-muted">
                    {catName(t.category)} · {t.tagline}
                  </span>
                </span>
                <span className="shrink-0 text-xs font-bold text-ink">
                  {t.isFree ? "Free" : formatBDT(t.price)}
                </span>
              </button>
            </li>
          ))}
        </ul>
        <div className="mt-3 flex items-center justify-between border-t border-line px-1 pt-3">
          <button
            type="button"
            onClick={submit as any}
            className="text-xs font-semibold text-accent hover:text-accent-hover"
          >
            See all results →
          </button>
          <span className="hidden text-[11px] text-muted sm:block">
            Press <kbd className="rounded border border-line px-1.5 py-0.5 font-sans">Esc</kbd> to close
          </span>
        </div>
        </div>
      ) : variant === "icon" ? (
        <p className="mt-4 px-1 text-sm text-muted">
          Start typing to search AI tools...
        </p>
      ) : null}
    </div>
  );

  if (variant === "field") return panel;

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Search AI tools"
        className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-ink transition-colors hover:bg-surface-muted"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] flex items-start justify-center p-4 pt-[12vh] sm:pt-[14vh]">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs"
            style={{ animation: "fade-in .15s ease" }}
            onClick={() => {
              setOpen(false);
              onClose?.();
            }}
          />
          <div
            className="relative z-[110] w-full max-w-xl rounded-2xl border border-line bg-white p-5 shadow-2xl"
            style={{ animation: "fade-up .2s cubic-bezier(.16,1,.3,1)" }}
            role="dialog"
            aria-modal="true"
          >
            {panel}
          </div>
        </div>
      )}
    </>
  );
}
