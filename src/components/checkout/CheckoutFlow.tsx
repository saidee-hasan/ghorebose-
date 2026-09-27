import { useEffect, useMemo, useState } from "react";
import type { Tool } from "@/lib/types";
import { formatBDT } from "@/lib/format";

interface Props {
  tool: Tool;
  initialPlan?: string;
}

const methods = [
  {
    id: "bKash",
    name: "bKash (বিকাশ)",
    badgeColor: "bg-[#D12053] text-white",
    number: "01712-345678",
    type: "Personal (সেন্ড মানি)",
    steps: [
      "আপনার bKash অ্যাপ ওপেন করুন অথবা ডায়াল করুন *247#",
      "মেনু থেকে Send Money (সেন্ড মানি) সিলেক্ট করুন",
      "প্রাপক নাম্বারে আমাদের নাম্বারটি দিন এবং সঠিক অ্যামাউন্ট লিখুন",
      "আপনার পিন দিয়ে কনফার্ম করুন এবং SMS থেকে Transaction ID (TrxID) কপি করুন",
    ],
  },
  {
    id: "Nagad",
    name: "Nagad (নগদ)",
    badgeColor: "bg-[#F7931E] text-white",
    number: "01812-345678",
    type: "Personal (সেন্ড মানি)",
    steps: [
      "আপনার Nagad অ্যাপ ওপেন করুন অথবা ডায়াল করুন *167#",
      "মেনু থেকে Send Money (সেন্ড মানি) সিলেক্ট করুন",
      "প্রাপক নাম্বারে আমাদের নাম্বারটি দিন এবং সঠিক অ্যামাউন্ট লিখুন",
      "আপনার পিন দিয়ে কনফার্ম করুন এবং SMS থেকে Transaction ID (TrxID) কপি করুন",
    ],
  },
  {
    id: "Rocket",
    name: "Rocket (রকেট)",
    badgeColor: "bg-[#8C3494] text-white",
    number: "01912-345678",
    type: "Personal (সেন্ড মানি)",
    steps: [
      "আপনার Rocket অ্যাপ ওপেন করুন অথবা ডায়াল করুন *322#",
      "মেনু থেকে Send Money (সেন্ড মানি) সিলেক্ট করুন",
      "প্রাপক নাম্বারে আমাদের নাম্বারটি দিন এবং সঠিক অ্যামাউন্ট লিখুন",
      "আপনার পিন দিয়ে কনফার্ম করুন এবং SMS থেকে Transaction ID (TrxID) কপি করুন",
    ],
  },
];

function StepIndicator({ step }: { step: number }) {
  const labels = [
    { en: "Plan Selection", bn: "প্ল্যান বাছাই" },
    { en: "MFS Payment", bn: "বিকাশ/নগদ পেমেন্ট" },
    { en: "Confirmation", bn: "অর্ডার কনফার্মেশন" },
  ];
  return (
    <ol className="flex items-center gap-2 sm:gap-3">
      {labels.map((item, i) => {
        const n = i + 1;
        const state = n < step ? "done" : n === step ? "active" : "todo";
        return (
          <li key={item.en} className="flex flex-1 items-center gap-2 sm:gap-3">
            <span
              className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors ${
                state === "done"
                  ? "border-ink bg-ink text-white"
                  : state === "active"
                    ? "border-accent bg-accent text-white shadow-sm"
                    : "border-line bg-white text-muted"
              }`}
            >
              {state === "done" ? (
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              ) : (
                n
              )}
            </span>
            <div className="hidden sm:block">
              <span className={`block text-xs font-bold leading-tight ${state === "todo" ? "text-muted" : "text-ink font-bangla"}`}>
                {item.bn}
              </span>
              <span className="text-[10px] text-muted">{item.en}</span>
            </div>
            {n < labels.length && (
              <span className={`h-px flex-1 ${n < step ? "bg-ink" : "bg-line"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}

export default function CheckoutFlow({ tool, initialPlan }: Props) {
  const startIndex = Math.max(
    0,
    initialPlan ? tool.plans.findIndex((p) => p.name === initialPlan) : tool.plans.findIndex((p) => p.popular),
  );
  const [step, setStep] = useState(1);
  const [planIndex, setPlanIndex] = useState(startIndex);
  const [method, setMethod] = useState("bKash");
  const [payNumber, setPayNumber] = useState("");
  const [trxId, setTrxId] = useState("");
  const [note, setNote] = useState("");
  const [agree, setAgree] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [copiedNumber, setCopiedNumber] = useState(false);
  const [copiedAmount, setCopiedAmount] = useState(false);

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("plan");
    if (!p) return;
    const idx = tool.plans.findIndex((x) => x.name.toLowerCase() === p.toLowerCase());
    if (idx >= 0) setPlanIndex(idx);
  }, [tool.plans]);

  const plan = tool.plans[planIndex] || tool.plans[0];
  const subtotal = plan?.price ?? tool.price;
  const discount = 0;
  const total = subtotal - discount;
  const activeMethod = useMemo(() => methods.find((m) => m.id === method)!, [method]);

  const copyToClipboard = (text: string, type: "number" | "amount") => {
    navigator.clipboard.writeText(text);
    if (type === "number") {
      setCopiedNumber(true);
      setTimeout(() => setCopiedNumber(false), 2000);
    } else {
      setCopiedAmount(true);
      setTimeout(() => setCopiedAmount(false), 2000);
    }
  };

  const validate = () => {
    const e: Record<string, string> = {};
    const cleanNumber = payNumber.replace(/[\s-]/g, "");
    if (!/^01\d{9}$/.test(cleanNumber))
      e.payNumber = "সঠিক ১১ ডিজিটের বিকাশ/নগদ নাম্বার দিন (যেমন: 017XXXXXXXX)।";
    if (trxId.trim().length < 6)
      e.trxId = "সঠিক ট্রানজেকশন আইডি (TrxID) লিখুন (কমপক্ষে ৬ অক্ষর)।";
    if (!agree) e.agree = "অনুগ্রহ করে নিশ্চিত করুন যে পেমেন্ট তথ্য সঠিক দিয়েছেন।";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const orderId = `GB-${Math.floor(100000 + Math.random() * 900000)}`;
    const params = new URLSearchParams({
      order: orderId,
      tool: tool.slug,
      plan: plan.name,
      amount: String(total),
      method,
      trx: trxId.trim().toUpperCase(),
    });
    setTimeout(() => {
      window.location.href = `/order-success?${params.toString()}`;
    }, 700);
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_360px] lg:items-start">
      <div>
        <StepIndicator step={step} />

        {step === 1 && (
          <div className="mt-8 space-y-6">
            <section className="rounded-[16px] border border-line bg-white p-5 shadow-xs sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-lg font-bold text-ink">১. সাবস্ক্রিপশন প্ল্যান বাছাই করুন</h2>
                  <p className="mt-1 text-xs sm:text-sm text-muted font-bangla">আপনার ব্যবহারের মেয়াদ ও সুবিধা অনুযায়ী পছন্দ করুন</p>
                </div>
                <span className="rounded-full bg-brand-50 px-2.5 py-1 text-[11px] font-bold text-accent border border-brand-200">
                  {tool.plans.length} টি অপশন
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {tool.plans.map((p, i) => (
                  <button
                    key={p.name}
                    type="button"
                    onClick={() => setPlanIndex(i)}
                    aria-pressed={i === planIndex}
                    className={`flex w-full items-start justify-between gap-4 rounded-[14px] border p-4 text-left transition-all ${
                      i === planIndex
                        ? "border-accent bg-brand-50/70 ring-2 ring-brand-200 shadow-xs"
                        : "border-line bg-white hover:border-line-strong hover:bg-surface-subtle"
                    }`}
                  >
                    <span className="flex items-start gap-3">
                      <span className={`mt-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 ${i === planIndex ? "border-accent" : "border-line-strong"}`}>
                        {i === planIndex && <span className="h-2 w-2 rounded-full bg-accent" />}
                      </span>
                      <span>
                        <span className="flex items-center gap-2">
                          <span className="text-sm font-bold text-ink">{p.name}</span>
                          {p.popular && (
                            <span className="rounded-full bg-accent px-2 py-0.5 text-[9px] font-extrabold text-white">POPULAR (জনপ্রিয়)</span>
                          )}
                        </span>
                        <span className="mt-1 block text-xs font-semibold text-muted-strong font-bangla">মেয়াদ: {p.duration}</span>
                        <span className="mt-2 flex flex-wrap gap-x-3 gap-y-1">
                          {p.features.slice(0, 3).map((f) => (
                            <span key={f} className="text-[11px] text-muted-strong font-bangla">✓ {f}</span>
                          ))}
                        </span>
                      </span>
                    </span>
                    <span className="shrink-0 font-display text-lg font-extrabold text-ink">{formatBDT(p.price)}</span>
                  </button>
                ))}
              </div>
            </section>

            <section className="rounded-[16px] border border-line bg-white p-5 shadow-xs sm:p-6">
              <h2 className="font-display text-lg font-bold text-ink">২. অর্ডার সামারি (Order Summary)</h2>
              <dl className="mt-4 divide-y divide-line text-sm">
                <div className="flex items-center justify-between py-3">
                  <dt className="text-muted font-bangla">টুলস এর নাম</dt>
                  <dd className="font-bold text-ink">{tool.name}</dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-muted font-bangla">নির্বাচিত প্ল্যান</dt>
                  <dd className="font-semibold text-ink">{plan?.name} ({plan?.duration})</dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-muted font-bangla">মূল্য (Price)</dt>
                  <dd className="font-semibold text-ink">{formatBDT(subtotal)}</dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="text-muted font-bangla">ডেলিভারি চার্জ</dt>
                  <dd className="font-bold text-emerald-600 font-bangla">ফ্রি (০ ৳)</dd>
                </div>
                <div className="flex items-center justify-between py-3">
                  <dt className="font-bold text-ink font-bangla">মোট প্রদেয় টাকা (Total)</dt>
                  <dd className="font-display text-xl font-extrabold text-accent">{formatBDT(total)}</dd>
                </div>
              </dl>

              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="mt-5 inline-flex h-12 w-full items-center justify-center gap-2 rounded-[10px] bg-accent text-[15px] font-bold text-white transition-all hover:bg-accent-hover shadow-md hover:shadow-lg"
              >
                <span>পেমেন্ট ধাপে এগিয়ে যান</span>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
              </button>
            </section>
          </div>
        )}

        {step === 2 && (
          <form onSubmit={submit} className="mt-8 space-y-6">
            <section className="rounded-[16px] border border-line bg-white p-5 shadow-xs sm:p-6">
              <h2 className="font-display text-lg font-bold text-ink">পেমেন্ট মেথড বাছাই করুন</h2>
              <p className="mt-1 text-xs sm:text-sm text-muted font-bangla">
                আপনার পছন্দের একাউন্ট সিলেক্ট করুন এবং নির্ধারিত নাম্বারে সেন্ড মানি করুন।
              </p>

              <div className="mt-4 grid grid-cols-3 gap-3">
                {methods.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMethod(m.id)}
                    aria-pressed={method === m.id}
                    className={`flex flex-col items-center gap-2 rounded-[14px] border p-3.5 transition-all ${
                      method === m.id
                        ? "border-accent bg-brand-50/80 ring-2 ring-brand-200 shadow-xs"
                        : "border-line bg-white hover:border-line-strong hover:bg-surface-subtle"
                    }`}
                  >
                    <span className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-extrabold shadow-xs ${m.badgeColor}`}>
                      {m.id[0]}
                    </span>
                    <span className="text-xs font-bold text-ink text-center font-bangla">{m.name}</span>
                  </button>
                ))}
              </div>

              {/* Number & Amount Card with Copy Buttons */}
              <div className="mt-5 rounded-[16px] border border-line bg-surface-subtle p-4 sm:p-5">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line/80 pb-4">
                  <div>
                    <span className="inline-flex items-center gap-1 rounded bg-brand-100 text-brand-800 px-2 py-0.5 text-[10px] font-bold font-bangla">
                      {activeMethod.type}
                    </span>
                    <div className="mt-1.5 flex items-center gap-2">
                      <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-ink">
                        {activeMethod.number}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(activeMethod.number.replace("-", ""), "number")}
                        className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-semibold text-ink shadow-xs hover:bg-surface-subtle"
                      >
                        {copiedNumber ? "✓ কপি হয়েছে!" : "কপি করুন"}
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="text-xs font-bold uppercase tracking-wider text-muted font-bangla">প্রদেয় মোট টাকা</p>
                    <div className="mt-1 flex items-center justify-end gap-2">
                      <span className="font-display text-xl sm:text-2xl font-extrabold tracking-tight text-accent">
                        {formatBDT(total)}
                      </span>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(String(total), "amount")}
                        className="inline-flex items-center gap-1 rounded-lg border border-line bg-white px-2.5 py-1 text-xs font-semibold text-ink shadow-xs hover:bg-surface-subtle"
                      >
                        {copiedAmount ? "✓ কপি হয়েছে!" : "টাকা কপি"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-ink font-bangla mb-2">
                    পেমেন্ট করার নিয়মাবলী:
                  </p>
                  <ol className="space-y-2">
                    {activeMethod.steps.map((s, i) => (
                      <li key={s} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-muted-strong font-bangla">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-white text-[11px] font-bold text-ink ring-1 ring-line">
                          {i + 1}
                        </span>
                        <span>{s}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
            </section>

            <section className="rounded-[16px] border border-line bg-white p-5 shadow-xs sm:p-6">
              <h2 className="font-display text-lg font-bold text-ink">পেমেন্ট ভেরিফিকেশন তথ্য দিন</h2>
              <p className="mt-1 text-xs sm:text-sm text-muted font-bangla">
                আপনি যে নাম্বার থেকে টাকা পাঠিয়েছেন এবং ফিরতি SMS-এ পাওয়া Transaction ID নিচে লিখুন।
              </p>

              <div className="mt-5 space-y-4">
                <div>
                  <label htmlFor="payNumber" className="mb-1.5 block text-xs sm:text-[13px] font-bold text-ink font-bangla">
                    আপনার প্রেরক মোবাইল নাম্বার (Sender Number) <span className="text-accent">*</span>
                  </label>
                  <input
                    id="payNumber"
                    value={payNumber}
                    onChange={(e) => setPayNumber(e.target.value)}
                    inputMode="numeric"
                    placeholder="যেমন: 017XXXXXXXX"
                    className={`h-12 w-full rounded-[10px] border bg-white px-4 text-sm outline-none transition-colors ${
                      errors.payNumber ? "border-accent ring-1 ring-accent" : "border-line hover:border-line-strong focus:border-accent"
                    }`}
                  />
                  {errors.payNumber && <p className="mt-1.5 text-xs font-medium text-accent font-bangla">{errors.payNumber}</p>}
                </div>

                <div>
                  <label htmlFor="trxId" className="mb-1.5 block text-xs sm:text-[13px] font-bold text-ink font-bangla">
                    ট্রানজেকশন আইডি (Transaction ID / TrxID) <span className="text-accent">*</span>
                  </label>
                  <input
                    id="trxId"
                    value={trxId}
                    onChange={(e) => setTrxId(e.target.value)}
                    placeholder="যেমন: BKH8H2K9LM অথবা 7A9X3K"
                    className={`h-12 w-full rounded-[10px] border bg-white px-4 text-sm uppercase outline-none transition-colors ${
                      errors.trxId ? "border-accent ring-1 ring-accent" : "border-line hover:border-line-strong focus:border-accent"
                    }`}
                  />
                  {errors.trxId && <p className="mt-1.5 text-xs font-medium text-accent font-bangla">{errors.trxId}</p>}
                </div>

                <div>
                  <label htmlFor="note" className="mb-1.5 block text-xs sm:text-[13px] font-semibold text-ink font-bangla">
                    কোনো বিশেষ নির্দেশনা থাকলে লিখুন <span className="text-muted font-normal">(ঐচ্ছিক)</span>
                  </label>
                  <textarea
                    id="note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={2}
                    placeholder="যেমন: নির্দিষ্ট ইমেইলে এক্সেস পাঠাতে চাইলে লিখে দিন..."
                    className="w-full rounded-[10px] border border-line bg-white p-3 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-line-strong focus:border-accent"
                  />
                </div>

                <label className="flex cursor-pointer items-start gap-3 rounded-[12px] border border-line bg-surface-subtle p-3.5">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-accent"
                  />
                  <span className="text-xs leading-relaxed text-muted-strong font-bangla">
                    আমি নিশ্চিত করছি যে পেমেন্ট নাম্বার এবং Transaction ID সঠিক দিয়েছি এবং অ্যাডমিন টিম কর্তৃক ১০-৩০ মিনিটের মধ্যে সার্ভিস অ্যাক্টিভেশনের বিষয়টি অবগত আছি।
                  </span>
                </label>
                {errors.agree && <p className="text-xs font-medium text-accent font-bangla">{errors.agree}</p>}
              </div>

              <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="inline-flex h-12 items-center justify-center rounded-[10px] border border-line bg-white px-5 text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle sm:w-auto font-bangla"
                >
                  ← পিছনে যান
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-[10px] bg-accent text-[15px] font-bold text-white transition-all hover:bg-accent-hover disabled:opacity-60 shadow-md"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                      <span>অর্ডার সাবমিট হচ্ছে...</span>
                    </>
                  ) : (
                    <span>পেমেন্ট সম্পূর্ণ করুন (Submit Order)</span>
                  )}
                </button>
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-[12px] border border-emerald-200 bg-emerald-50 p-3.5">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-emerald-600"><circle cx="12" cy="12" r="10" /><path d="M12 16v-4M12 8h.01" /></svg>
                <p className="text-xs font-medium text-emerald-800 font-bangla">
                  পেমেন্ট সাবমিট করার পর আমাদের টিম ভেরিফাই করে ১০–৩০ মিনিটের মধ্যে আপনার এক্সেস একটিভ করে দেবে।
                </p>
              </div>
            </section>
          </form>
        )}
      </div>

      {/* Summary sidebar */}
      <aside className="lg:sticky lg:top-24">
        <div className="rounded-[16px] border border-line bg-white p-5 shadow-xs">
          <h2 className="font-display text-base font-bold text-ink font-bangla">অর্ডার বিবরণী</h2>
          <div className="mt-4 flex items-center gap-3 border-b border-line pb-4">
            <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-[12px] font-display text-sm font-extrabold ${tool.tone === "brand" ? "bg-accent text-white" : tool.tone === "outline" ? "border border-line-strong bg-white text-ink" : "bg-ink text-white"}`}>
              {tool.mark}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-bold text-ink">{tool.name}</p>
              <p className="text-xs text-muted font-bangla">{plan?.name} • মেয়াদ: {plan?.duration}</p>
            </div>
          </div>
          <dl className="space-y-2.5 py-4 text-xs sm:text-sm">
            <div className="flex justify-between"><dt className="text-muted font-bangla">সাবটোটাল</dt><dd className="font-semibold text-ink">{formatBDT(subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted font-bangla">ডেলিভারি ফি</dt><dd className="font-bold text-emerald-600 font-bangla">ফ্রি (০ ৳)</dd></div>
            <div className="flex justify-between border-t border-line pt-3"><dt className="font-bold text-ink font-bangla">সর্বমোট</dt><dd className="font-display text-lg font-extrabold text-accent">{formatBDT(total)}</dd></div>
          </dl>
          <div className="space-y-2.5 rounded-[12px] bg-surface-subtle p-3.5 font-bangla">
            {[
              { text: "বিকাশ ও নগদে ১০০% নিরাপদ লেনদেন" },
              { text: "১০–৩০ মিনিটে ইনস্ট্যান্ট ডেলিভারি" },
              { text: "সম্পূর্ণ মেয়াদের জন্য রিপ্লেসমেন্ট ওয়ারেন্টি" },
            ].map((r) => (
              <p key={r.text} className="flex items-start gap-2 text-xs text-muted-strong">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-emerald-600">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                {r.text}
              </p>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-line text-center">
            <p className="text-[11px] text-muted font-bangla">পেমেন্ট করতে কোনো সমস্যা হলে:</p>
            <a
              href="https://wa.me/8801712345678"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
              <span>WhatsApp হেল্পলাইন: 01712-345678</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
}
