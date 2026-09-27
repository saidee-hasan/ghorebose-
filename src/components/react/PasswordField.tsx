import { useState } from "react";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  hint?: string;
  autocomplete?: string;
  showStrength?: boolean;
  value?: string;
}

export default function PasswordField({
  label,
  name,
  placeholder = "••••••••",
  hint,
  autocomplete,
  showStrength = false,
  value: initial = "",
}: Props) {
  const [show, setShow] = useState(false);
  const [value, setValue] = useState(initial);

  const strength = (() => {
    let s = 0;
    if (value.length >= 8) s++;
    if (/[A-Z]/.test(value)) s++;
    if (/[0-9]/.test(value)) s++;
    if (/[^A-Za-z0-9]/.test(value)) s++;
    return s;
  })();
  const labels = ["Too short", "Weak", "Fair", "Good", "Strong"];

  return (
    <div className="w-full">
      <label htmlFor={name} className="mb-1.5 flex items-center gap-1 text-[13px] font-semibold text-ink">
        {label}
        <span className="text-accent">*</span>
      </label>
      <div className="relative">
        <input
          id={name}
          name={name}
          type={show ? "text" : "password"}
          placeholder={placeholder}
          autoComplete={autocomplete}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          className="h-12 w-full rounded-[10px] border border-line bg-white pl-4 pr-12 text-sm text-ink outline-none transition-colors placeholder:text-muted/70 hover:border-line-strong focus:border-accent"
        />
        <button
          type="button"
          onClick={() => setShow((v) => !v)}
          aria-label={show ? "Hide password" : "Show password"}
          className="absolute right-2 top-1/2 inline-flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-[8px] text-muted transition-colors hover:bg-surface-muted hover:text-ink"
        >
          {show ? (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24" /><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68" /><path d="M6.61 6.61A13.526 13.526 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61" /><line x1="2" x2="22" y1="2" y2="22" /></svg>
          ) : (
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" /><circle cx="12" cy="12" r="3" /></svg>
          )}
        </button>
      </div>
      {showStrength && value.length > 0 && (
        <div className="mt-2.5">
          <div className="flex gap-1.5">
            {[0, 1, 2, 3].map((i) => (
              <span
                key={i}
                className={`h-1.5 flex-1 rounded-full ${i < strength ? "bg-accent" : "bg-line"}`}
              />
            ))}
          </div>
          <p className="mt-1.5 text-xs text-muted">{labels[strength]}</p>
        </div>
      )}
      {hint && !showStrength && <p className="mt-1.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}
