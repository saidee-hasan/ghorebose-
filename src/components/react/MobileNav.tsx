import { useEffect, useState } from "react";

interface Props {
  authed?: boolean;
  user?: { name: string; email: string; initials: string };
}

const navLinks = [
  { label: "সব এআই টুলস", href: "/tools" },
  { label: "পেমেন্ট নিয়ম ও নির্দেশিকা", href: "/payment-help" },
  { label: "আমাদের সম্পর্কে", href: "/about" },
  { label: "যোগাযোগ ও সহায়তা", href: "/contact" },
];

const accountLinks = [
  { label: "ড্যাশবোর্ড", href: "/dashboard", icon: "M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" },
  { label: "আমার অর্ডারসমূহ", href: "/dashboard/orders", icon: "M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" },
  { label: "কেনা টুলস ও লাইসেন্স", href: "/dashboard/purchased", icon: "M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20zM12 8v8M8 12h8" },
];

export default function MobileNav({ authed, user }: Props) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="মেনু খুলুন"
        className="inline-flex h-10 w-10 items-center justify-center rounded-[10px] text-ink transition-colors hover:bg-surface-muted md:hidden active:scale-95"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h16" /></svg>
      </button>

      {open && (
        <div className="fixed inset-0 z-[100] md:hidden">
          <div
            className="fixed inset-0 bg-ink/60 backdrop-blur-xs"
            style={{ animation: "fade-in .15s ease" }}
            onClick={() => setOpen(false)}
          />
          <div
            className="fixed right-0 top-0 bottom-0 z-[110] flex h-full w-[85%] max-w-sm flex-col bg-white shadow-2xl"
            style={{ animation: "slide-in-right .25s cubic-bezier(.16,1,.3,1)" }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between border-b border-line px-5 py-4">
              <a href="/" className="font-display text-lg font-extrabold tracking-tight text-ink">
                ghorebose<span className="text-accent">.com</span>
              </a>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="বন্ধ করুন"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[8px] text-muted transition-colors hover:bg-surface-muted hover:text-ink active:scale-95"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12" /></svg>
              </button>
            </div>

            {/* Drawer Content */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* WhatsApp Quick Help Card */}
              <a
                href="https://wa.me/8801712345678?text=%E0%A6%86%E0%A6%B8%E0%A6%B8%E0%A6%BE%E0%A6%B2%E0%A6%BE%E0%A6%AE%E0%A7%81%20%E0%A6%86%E0%A6%B2%E0%A6%BE%E0%A6%87%E0%A6%95%E0%A7%81%E0%A6%AE"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl bg-emerald-50 border border-emerald-200 p-3 text-emerald-800 transition-colors hover:bg-emerald-100/70"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500 text-white shrink-0 shadow-xs">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 21l1.65-3.8a9 9 0 1 1 3.4 2.9L3 21"/><path d="M9 10a.5.5 0 0 0 1 0V9a.5.5 0 0 0-1 0v1a5 5 0 0 0 5 5h1a.5.5 0 0 0 0-1h-1a.5.5 0 0 0 0 1"/></svg>
                </span>
                <div>
                  <span className="block font-bangla text-xs font-bold text-emerald-900">WhatsApp হেল্পলাইন</span>
                  <span className="block text-xs font-semibold text-emerald-700">01712-345678</span>
                </div>
              </a>

              {authed && user && (
                <a href="/dashboard" className="flex items-center gap-3 rounded-xl border border-line bg-surface-subtle p-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-xs font-bold text-white">
                    {user.initials}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-bold text-ink">{user.name}</span>
                    <span className="block truncate text-xs text-muted">{user.email}</span>
                  </span>
                </a>
              )}

              {/* Navigation Links */}
              <nav className="space-y-1">
                {navLinks.map((l) => (
                  <a
                    key={l.href}
                    href={l.href}
                    className="flex items-center justify-between rounded-[10px] px-3.5 py-3 font-bangla text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle hover:text-accent"
                  >
                    <span>{l.label}</span>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><path d="m9 18 6-6-6-6"/></svg>
                  </a>
                ))}
              </nav>

              {authed && (
                <>
                  <div className="my-2 h-px bg-line" />
                  <p className="px-3.5 text-xs font-bold uppercase tracking-wider text-muted font-bangla">অ্যাকাউন্ট</p>
                  <nav className="space-y-1">
                    {accountLinks.map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        className="flex items-center gap-3 rounded-[10px] px-3.5 py-2.5 font-bangla text-sm font-medium text-ink transition-colors hover:bg-surface-subtle"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" className="text-muted"><path d={l.icon} /></svg>
                        {l.label}
                      </a>
                    ))}
                  </nav>
                </>
              )}
            </div>

            {/* Bottom Auth CTA */}
            <div className="border-t border-line p-4">
              {authed ? (
                <a
                  href="/login"
                  className="flex h-11 w-full items-center justify-center rounded-[10px] border border-line text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle"
                >
                  লগআউট (Logout)
                </a>
              ) : (
                <div className="grid grid-cols-2 gap-2.5">
                  <a
                    href="/login"
                    className="flex h-11 items-center justify-center rounded-[10px] border border-line text-sm font-semibold text-ink transition-colors hover:bg-surface-subtle"
                  >
                    লগইন
                  </a>
                  <a
                    href="/signup"
                    className="flex h-11 items-center justify-center rounded-[10px] bg-accent text-sm font-bold text-white transition-colors hover:bg-accent-hover shadow-xs"
                  >
                    রেজিস্টার
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

