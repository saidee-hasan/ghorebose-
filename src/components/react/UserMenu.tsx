import { useEffect, useRef, useState } from "react";

interface Props {
  name: string;
  email: string;
  initials: string;
}

const items = [
  { label: "My Profile", href: "/dashboard/profile", icon: "user" },
  { label: "My Orders", href: "/dashboard/orders", icon: "package" },
  { label: "Purchased Tools", href: "/dashboard/purchased", icon: "key" },
  { label: "Payment History", href: "/dashboard/payments", icon: "credit-card" },
  { label: "Settings", href: "/dashboard/settings", icon: "settings" },
];

const icons: Record<string, React.ReactNode> = {
  user: <><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></>,
  package: <><path d="m7.5 4.27 9 5.15" /><path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" /><path d="m3.3 7 8.7 5 8.7-5" /><path d="M12 22V12" /></>,
  key: <><circle cx="7.5" cy="15.5" r="5.5" /><path d="m21 2-9.6 9.6" /><path d="m15.5 7.5 3 3L22 7l-3-3" /></>,
  "credit-card": <><rect width="20" height="14" x="2" y="5" rx="2" /><line x1="2" x2="22" y1="10" y2="10" /></>,
  settings: <><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></>,
  logout: <><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="m16 17 5-5-5-5" /><path d="M21 12H9" /></>,
};

function Icon({ name }: { name: string }) {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-muted" aria-hidden="true">
      {icons[name]}
    </svg>
  );
}

export default function UserMenu({ name, email, initials }: Props) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="menu"
        aria-expanded={open}
        className="flex items-center gap-2 rounded-full border border-line bg-white py-1 pl-1 pr-2.5 transition-colors hover:bg-surface-subtle"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-ink text-[11px] font-bold uppercase text-white">
          {initials}
        </span>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`text-muted transition-transform ${open ? "rotate-180" : ""}`} aria-hidden="true"><path d="m6 9 6 6 6-6" /></svg>
      </button>

      {open && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-50 w-64 overflow-hidden rounded-2xl border border-line bg-white shadow-lg"
          style={{ animation: "fade-up .16s cubic-bezier(.16,1,.3,1)" }}
        >
          <div className="border-b border-line px-4 py-3.5">
            <p className="truncate text-sm font-bold text-ink">{name}</p>
            <p className="truncate text-xs text-muted">{email}</p>
          </div>
          <div className="p-1.5">
            {items.map((it) => (
              <a
                key={it.href}
                href={it.href}
                role="menuitem"
                className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-medium text-ink transition-colors hover:bg-surface-subtle"
              >
                <Icon name={it.icon} />
                {it.label}
              </a>
            ))}
          </div>
          <div className="border-t border-line p-1.5">
            <a
              href="/login"
              role="menuitem"
              className="flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle"
            >
              <Icon name="logout" />
              Logout
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
