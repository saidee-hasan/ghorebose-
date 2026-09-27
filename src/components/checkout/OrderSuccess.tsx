import { useEffect, useState } from "react";
import type { Tool } from "@/lib/types";
import { formatBDT } from "@/lib/format";

interface Props {
  tools: Tool[];
}

interface Data {
  order: string;
  toolSlug: string;
  plan: string;
  amount: number;
  method: string;
  trx: string;
}

const steps = [
  { label: "Order Created", bn: "অর্ডার তৈরি হয়েছে", done: true },
  { label: "Payment Submitted", bn: "পেমেন্ট তথ্য জমা হয়েছে", done: true },
  { label: "Payment Verified", bn: "পেমেন্ট ভেরিফিকেশন", done: false },
  { label: "Delivered", bn: "এক্সেস সক্রিয়", done: false },
  { label: "Completed", bn: "সম্পূর্ণ", done: false },
];

export default function OrderSuccess({ tools }: Props) {
  const [data, setData] = useState<Data>({
    order: "GB-000013",
    toolSlug: "chatgpt-plus",
    plan: "Pro",
    amount: 1700,
    method: "bKash",
    trx: "BKH8H2K9LM",
  });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    const toolSlug = p.get("tool") ?? "chatgpt-plus";
    setData({
      order: p.get("order") ?? `GB-${Math.floor(100000 + Math.random() * 900000)}`,
      toolSlug,
      plan: p.get("plan") ?? "Pro",
      amount: Number(p.get("amount") ?? 1700),
      method: p.get("method") ?? "bKash",
      trx: (p.get("trx") ?? "BKH8H2K9LM").toUpperCase(),
    });
  }, []);

  const tool = tools.find((t) => t.slug === data.toolSlug) ?? tools[0];
  const orderDate = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      <div>
        {/* Success hero */}
        <div className="rounded-[20px] border border-line bg-white p-6 text-center shadow-xs sm:p-10">
          <span className="mx-auto inline-flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-4 ring-emerald-100">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
          </span>
          <h1 className="mt-5 font-display text-2xl font-extrabold tracking-tight text-ink sm:text-3xl font-bangla">
            আপনার অর্ডার সফলভাবে গৃহীত হয়েছে!
          </h1>
          <p className="mx-auto mt-2 max-w-md text-xs sm:text-sm leading-relaxed text-muted font-bangla">
            ধন্যবাদ! আপনার পেমেন্ট তথ্য আমাদের অ্যাডমিন টিমের কাছে পৌঁছেছে। আগামী ১০–৩০ মিনিটের মধ্যে ভেরিফাই করে আপনার এক্সেস একটিভ করে দেওয়া হবে।
          </p>

          <div className="mt-6 inline-flex flex-wrap items-center justify-center gap-4 rounded-[16px] border border-line bg-surface-subtle px-6 py-4">
            <div className="text-left">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted font-bangla">অর্ডার আইডি (Order ID)</p>
              <p className="mt-0.5 font-mono text-lg font-bold text-ink">{data.order}</p>
            </div>
            <span className="hidden h-8 w-px bg-line sm:block" />
            <div className="text-left">
              <p className="text-[11px] font-bold uppercase tracking-wider text-muted font-bangla">বর্তমান স্ট্যাটাস</p>
              <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-brand-200 bg-brand-50 px-3 py-0.5 text-xs font-bold text-brand-700 font-bangla">
                <span className="h-2 w-2 rounded-full bg-brand-500 animate-pulse" />
                পেমেন্ট ভেরিফিকেশন চলছে
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="/dashboard/purchased" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-accent px-6 text-sm font-bold text-white transition-all hover:bg-accent-hover shadow-md sm:w-auto font-bangla">
              আমার টুলস দেখুন (Purchased Tools)
            </a>
            <a href={`https://wa.me/8801712345678?text=${encodeURIComponent(`আসসালামু আলাইকুম! আমার অর্ডার আইডি: ${data.order}, TrxID: ${data.trx}। স্ট্যাটাস জানতে চাচ্ছি।`)}`} target="_blank" rel="noopener noreferrer" className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] border border-emerald-300 bg-emerald-50 px-6 text-sm font-bold text-emerald-700 transition-colors hover:bg-emerald-100 sm:w-auto font-bangla">
              WhatsApp এ অর্ডার আপডেট নিন
            </a>
          </div>
        </div>

        {/* Order details */}
        <div className="mt-6 rounded-[20px] border border-line bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-bold text-ink font-bangla">অর্ডার বিবরণী</h2>
          <dl className="mt-4 divide-y divide-line text-xs sm:text-sm">
            {[
              { label: "এআই টুলস (Tool)", value: tool?.name ?? data.toolSlug },
              { label: "সাবস্ক্রিপশন প্ল্যান", value: data.plan },
              { label: "পরিশোধিত টাকা", value: formatBDT(data.amount) },
              { label: "পেমেন্ট মেথড", value: data.method },
              { label: "ট্রানজেকশন আইডি (TrxID)", value: data.trx, mono: true },
              { label: "অর্ডারের তারিখ ও সময়", value: orderDate },
            ].map((row) => (
              <div key={row.label} className="flex items-center justify-between gap-4 py-3">
                <dt className="text-muted font-bangla">{row.label}</dt>
                <dd className={`text-right font-semibold text-ink ${row.mono ? "font-mono font-bold text-accent" : ""}`}>{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Timeline */}
        <div className="mt-6 rounded-[20px] border border-line bg-white p-6 shadow-xs">
          <h2 className="font-display text-lg font-bold text-ink font-bangla">অর্ডার অগ্রগতি (Progress Timeline)</h2>
          <ol className="mt-5 flex flex-col gap-0 sm:flex-row sm:items-start sm:gap-2">
            {steps.map((s, i) => (
              <li key={s.label} className="flex flex-1 items-start gap-3 sm:flex-col sm:items-center sm:gap-2 sm:text-center">
                <div className="flex items-center gap-3 sm:flex-col">
                  <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-xs font-bold ${s.done ? "border-ink bg-ink text-white" : "border-line bg-white text-muted"}`}>
                    {s.done ? (
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    ) : (
                      i + 1
                    )}
                  </span>
                  {i < steps.length - 1 && (
                    <span className={`h-6 w-px sm:h-px sm:w-full ${s.done ? "bg-ink" : "bg-line"}`} />
                  )}
                </div>
                <div>
                  <span className={`block pb-1 text-[12px] font-bold sm:pb-0 ${s.done ? "text-ink font-bangla" : "text-muted font-bangla"}`}>
                    {s.bn}
                  </span>
                  <span className="text-[10px] text-muted">{s.label}</span>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* Sidebar */}
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-[16px] border border-line bg-white p-5 shadow-xs">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] font-display text-sm font-extrabold ${tool?.tone === "brand" ? "bg-accent text-white" : tool?.tone === "outline" ? "border border-line-strong bg-white text-ink" : "bg-ink text-white"}`}>
              {tool?.mark ?? "AI"}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">{tool?.name ?? data.toolSlug}</p>
              <p className="text-xs text-muted">{data.plan}</p>
            </div>
          </div>

          <h3 className="mt-4 text-xs font-bold uppercase tracking-wider text-ink font-bangla">পরবর্তী ধাপসমূহ</h3>
          <ol className="mt-3 space-y-3 font-bangla">
            {[
              "আমাদের অ্যাডমিন টিম আপনার ট্রানজেকশন আইডি চেক করবে (১০–৩০ মিনিট)।",
              "পেমেন্ট ভেরিফাই হওয়ার পর ইমেইল ও ড্যাশবোর্ডে নোটিফিকেশন পাবেন।",
              "Dashboard → Purchased Tools-এ আপনার লগইন তথ্য ও লিঙ্ক পেয়ে যাবেন।",
            ].map((t, i) => (
              <li key={t} className="flex items-start gap-2.5 text-xs text-muted-strong leading-relaxed">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-50 text-[11px] font-bold text-accent ring-1 ring-brand-200">{i + 1}</span>
                <span>{t}</span>
              </li>
            ))}
          </ol>

          <div className="mt-5 rounded-[12px] border border-brand-200 bg-brand-50 p-4 font-bangla">
            <p className="text-xs font-medium text-brand-800 leading-relaxed">
              আপনার TrxID সংরক্ষণ করে রাখুন। কোনো বিলম্ব হলে সরাসরি আমাদের সাথে WhatsApp-এ যোগাযোগ করুন।
            </p>
          </div>

          <a href="https://wa.me/8801712345678" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex h-11 w-full items-center justify-center gap-2 rounded-[10px] border border-emerald-300 bg-emerald-50 text-xs font-bold text-emerald-700 transition-colors hover:bg-emerald-100 font-bangla">
            WhatsApp হেল্পলাইন: 01712-345678
          </a>
        </div>
      </aside>
    </div>
  );
}
