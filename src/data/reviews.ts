import type { Review } from "@/lib/types";

const pool: Omit<Review, "id" | "toolSlug">[] = [
  {
    author: "Tanvir Ahmed",
    initials: "TA",
    rating: 5,
    date: "2026-09-18",
    title: "Delivered in under 20 minutes",
    body: "Ordered in the evening and had access before dinner. Everything worked on the first try and the dashboard made it easy to find my credentials.",
    helpful: 24,
    verified: true,
  },
  {
    author: "Nusrat Jahan",
    initials: "NJ",
    rating: 5,
    date: "2026-09-11",
    title: "Much cheaper than paying directly",
    body: "I was paying full price before. Same features, fraction of the cost, and support actually replies when you message them.",
    helpful: 31,
    verified: true,
  },
  {
    author: "Rakib Hossain",
    initials: "RH",
    rating: 4,
    date: "2026-08-30",
    title: "Great value, minor delay",
    body: "Verification took a little longer than expected because I submitted late at night, but it was handled first thing the next morning.",
    helpful: 12,
    verified: true,
  },
  {
    author: "Farhana Akter",
    initials: "FA",
    rating: 5,
    date: "2026-08-22",
    title: "Renewal was seamless",
    body: "Renewed before expiry and there was no interruption at all. This is now part of my monthly workflow.",
    helpful: 18,
    verified: true,
  },
  {
    author: "Imran Kabir",
    initials: "IK",
    rating: 5,
    date: "2026-08-09",
    title: "Exactly as described",
    body: "The included list matched reality one to one. No surprises, no upsells at checkout. Recommended.",
    helpful: 9,
    verified: true,
  },
  {
    author: "Sadia Islam",
    initials: "SI",
    rating: 4,
    date: "2026-07-28",
    title: "Solid support experience",
    body: "Had a question about which plan to pick and got a clear recommendation within minutes. Good, honest service.",
    helpful: 15,
    verified: false,
  },
];

export const reviews: Review[] = [
  "gemini-pro",
  "chatgpt-plus",
  "claude-pro",
  "midjourney",
  "canva-pro",
  "elevenlabs",
  "notion-ai",
  "cursor-pro",
  "github-copilot",
  "deepl-pro",
  "suno-ai",
  "perplexity-pro",
].flatMap((slug, s) =>
  pool.slice(0, 4 + (s % 3)).map((r, i) => ({
    ...r,
    id: `${slug}-${i + 1}`,
    toolSlug: slug,
    date: r.date,
    helpful: r.helpful + i,
  })),
);

export function getReviews(slug: string): Review[] {
  const found = reviews.filter((r) => r.toolSlug === slug);
  if (found.length) return found;
  return pool.slice(0, 4).map((r, i) => ({
    ...r,
    id: `${slug}-${i + 1}`,
    toolSlug: slug,
  }));
}

export function ratingBreakdown(list: Review[]) {
  const total = list.length || 1;
  return [5, 4, 3, 2, 1].map((star) => {
    const count = list.filter((r) => Math.round(r.rating) === star).length;
    return { star, count, percent: Math.round((count / total) * 100) };
  });
}
