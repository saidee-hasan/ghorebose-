import { useState } from "react";
import type { PaymentStatus } from "@/lib/types";

interface Props {
  orderId: string;
  initial: PaymentStatus;
}

const tone: Record<string, string> = {
  pending: "border-brand-200 bg-brand-50 text-brand-700",
  submitted: "border-brand-200 bg-brand-50 text-brand-700",
  verified: "border-line-strong bg-white text-ink",
  delivered: "border-ink bg-ink text-white",
  completed: "border-ink bg-ink text-white",
  rejected: "border-line bg-surface-muted text-muted-strong",
};

export default function AdminOrderActions({ orderId, initial }: Props) {
  const [status, setStatus] = useState<PaymentStatus>(initial);
  const [note, setNote] = useState("");
  const [confirm, setConfirm] = useState<null | { label: string; status: PaymentStatus; message: string }>(null);
  const [banner, setBanner] = useState<string | null>(null);

  const actions: { label: string; status: PaymentStatus; message: string; primary?: boolean }[] = [
    { label: "Verify payment", status: "verified", message: "Payment verified. You can now deliver access.", primary: true },
    { label: "Mark as delivered", status: "delivered", message: "Access marked as delivered to the customer." },
    { label: "Complete order", status: "completed", message: "Order completed successfully." },
    { label: "Reject payment", status: "rejected", message: "Payment rejected and refund initiated." },
  ];

  const run = (a: { label: string; status: PaymentStatus; message: string }) => {
    setStatus(a.status);
    setConfirm(null);
    setBanner(a.message);
    setTimeout(() => setBanner(null), 2600);
  };

  return (
    <div className="rounded-[16px] border border-line bg-white p-5 shadow-xs sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="font-display text-base font-bold text-ink">Payment status</h2>
          <p className="mt-0.5 text-xs text-muted">Order {orderId}</p>
        </div>
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold ${tone[status]}`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </div>

      <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
        {actions.map((a) => (
          <button
            key={a.label}
            type="button"
            onClick={() => setConfirm(a)}
            disabled={a.status === status}
            className={`inline-flex h-11 items-center justify-center rounded-[10px] text-sm font-semibold transition-colors disabled:opacity-40 ${
              a.primary
                ? "bg-accent text-white hover:bg-accent-hover"
                : "border border-line bg-white text-ink hover:bg-surface-subtle"
            }`}
          >
            {a.label}
          </button>
        ))}
      </div>

      <div className="mt-5">
        <label htmlFor="adminNote" className="mb-1.5 block text-[13px] font-semibold text-ink">
          Internal note <span className="text-muted">(optional)</span>
        </label>
        <textarea
          id="adminNote"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          rows={3}
          placeholder="Add a note about this payment for the team..."
          className="w-full rounded-[10px] border border-line bg-white p-4 text-sm outline-none transition-colors placeholder:text-muted/70 hover:border-line-strong focus:border-accent"
        />
      </div>

      {banner && (
        <div className="mt-4 flex items-start gap-2.5 rounded-[12px] border border-brand-200 bg-brand-50 p-4">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0 text-brand-700"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg>
          <p className="text-[13px] font-medium text-brand-800">{banner}</p>
        </div>
      )}

      {confirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" style={{ animation: "fade-in .15s ease" }} onClick={() => setConfirm(null)} />
          <div className="relative w-full max-w-md rounded-2xl border border-line bg-white p-6 shadow-lg" style={{ animation: "fade-up .2s cubic-bezier(.16,1,.3,1)" }} role="alertdialog" aria-modal="true">
            <h3 className="font-display text-lg font-bold text-ink">{confirm.label}?</h3>
            <p className="mt-1.5 text-sm text-muted">
              This will update order <span className="font-mono font-semibold text-ink">{orderId}</span> to{" "}
              <span className="font-semibold text-ink">{confirm.status}</span>. The customer will be notified.
            </p>
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button type="button" onClick={() => setConfirm(null)} className="inline-flex h-11 items-center justify-center rounded-[10px] border border-line px-5 text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle">
                Cancel
              </button>
              <button type="button" onClick={() => run(confirm)} className="inline-flex h-11 items-center justify-center rounded-[10px] bg-accent px-5 text-sm font-semibold text-white transition-colors hover:bg-accent-hover">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
