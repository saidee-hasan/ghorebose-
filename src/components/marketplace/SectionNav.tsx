import { useEffect, useState } from "react";

interface Props {
  sections: { id: string; label: string }[];
}

export default function SectionNav({ sections }: Props) {
  const [active, setActive] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-120px 0px -60% 0px", threshold: 0 },
    );
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav
      aria-label="Sections"
      className="sticky top-16 z-30 -mx-4 mb-8 border-b border-line bg-white/90 px-4 backdrop-blur-md sm:mx-0 sm:px-0 lg:top-20"
    >
      <ul className="no-scrollbar flex items-center gap-1 overflow-x-auto py-3">
        {sections.map((s) => (
          <li key={s.id}>
            <a
              href={`#${s.id}`}
              className={`inline-flex whitespace-nowrap rounded-full px-3.5 py-1.5 text-[13px] font-semibold transition-colors ${
                active === s.id
                  ? "bg-ink text-white"
                  : "text-muted-strong hover:bg-surface-muted hover:text-ink"
              }`}
            >
              {s.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
