import type { APIRoute, GetStaticPaths } from "astro";
import { tools } from "@/data/tools";
import { getCategoryName } from "@/data/categories";

export const getStaticPaths: GetStaticPaths = () => {
  return tools.map((tool) => ({ params: { slug: tool.slug } }));
};

function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function hash(value: string): number {
  let h = 0;
  for (let i = 0; i < value.length; i++) h = (h * 31 + value.charCodeAt(i)) >>> 0;
  return h;
}

function monogramSize(mark: string): number {
  if (mark.length <= 1) return 190;
  if (mark.length === 2) return 150;
  return 112;
}

function gridPattern(id: string, stroke: string, opacity: number): string {
  return `<pattern id="${id}" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0H0V40" fill="none" stroke="${stroke}" stroke-opacity="${opacity}" stroke-width="1"/>
    </pattern>`;
}

function cover(slug: string, mark: string, name: string, category: string): string {
  const variant = hash(slug) % 3;
  const W = 800;
  const H = 500;
  const fs = monogramSize(mark);
  const cat = esc(category.toUpperCase());
  const nm = esc(name);

  const watermark = `<text x="${W - 48}" y="58" text-anchor="end" font-family="Arial, Helvetica, sans-serif" font-size="18" font-weight="700" letter-spacing="0.5" fill="VAR_WM">ghorebose.com</text>`;

  if (variant === 0) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${nm}">
  <defs>${gridPattern("g0", "#FFFFFF", 0.05)}</defs>
  <rect width="${W}" height="${H}" fill="#000000"/>
  <rect width="${W}" height="${H}" fill="url(#g0)"/>
  <circle cx="660" cy="70" r="180" fill="#F97316" fill-opacity="0.16"/>
  <circle cx="110" cy="450" r="130" fill="#F97316" fill-opacity="0.10"/>
  <rect x="48" y="48" width="120" height="4" rx="2" fill="#F97316"/>
  <text x="48" y="96" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="#F97316">AI TOOLS</text>
  ${watermark.replace("VAR_WM", "#6B7280")}
  <text x="48" y="318" font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="800" letter-spacing="-4" fill="#FFFFFF">${esc(mark)}</text>
  <text x="48" y="392" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="800" letter-spacing="-1" fill="#FFFFFF">${nm}</text>
  <text x="48" y="432" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="600" letter-spacing="2" fill="#9CA3AF">${cat}</text>
</svg>`;
  }

  if (variant === 1) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${nm}">
  <defs>${gridPattern("g1", "#000000", 0.05)}</defs>
  <rect width="${W}" height="${H}" fill="#F9FAFB"/>
  <rect width="${W}" height="${H}" fill="url(#g1)"/>
  <rect x="0.5" y="0.5" width="${W - 1}" height="${H - 1}" fill="none" stroke="#E5E7EB"/>
  <circle cx="690" cy="420" r="150" fill="none" stroke="#F97316" stroke-opacity="0.5" stroke-width="2"/>
  <circle cx="690" cy="420" r="90" fill="#F97316" fill-opacity="0.10"/>
  <rect x="48" y="48" width="132" height="132" rx="30" fill="#F97316"/>
  <text x="114" y="${48 + 132 / 2 + 30}" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="58" font-weight="800" fill="#FFFFFF">${esc(mark)}</text>
  ${watermark.replace("VAR_WM", "#9CA3AF")}
  <text x="48" y="330" font-family="Arial, Helvetica, sans-serif" font-size="44" font-weight="800" letter-spacing="-1" fill="#000000">${nm}</text>
  <text x="48" y="372" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="2" fill="#6B7280">${cat}</text>
  <rect x="48" y="404" width="88" height="5" rx="2.5" fill="#F97316"/>
</svg>`;
  }

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}" role="img" aria-label="${nm}">
  <defs>${gridPattern("g2", "#FFFFFF", 0.10)}</defs>
  <rect width="${W}" height="${H}" fill="#F97316"/>
  <rect width="${W}" height="${H}" fill="url(#g2)"/>
  <circle cx="680" cy="80" r="150" fill="#FFFFFF" fill-opacity="0.14"/>
  <circle cx="120" cy="440" r="120" fill="#000000" fill-opacity="0.10"/>
  <rect x="48" y="48" width="120" height="4" rx="2" fill="#FFFFFF"/>
  <text x="48" y="96" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="700" letter-spacing="4" fill="#FFFFFF">AI TOOLS</text>
  ${watermark.replace("VAR_WM", "#FFFFFF")}
  <text x="48" y="318" font-family="Arial, Helvetica, sans-serif" font-size="${fs}" font-weight="800" letter-spacing="-4" fill="#FFFFFF">${esc(mark)}</text>
  <text x="48" y="392" font-family="Arial, Helvetica, sans-serif" font-size="42" font-weight="800" letter-spacing="-1" fill="#FFFFFF">${nm}</text>
  <text x="48" y="432" font-family="Arial, Helvetica, sans-serif" font-size="20" font-weight="600" letter-spacing="2" fill="#FFFFFF" fill-opacity="0.85">${cat}</text>
</svg>`;
}

export const GET: APIRoute = ({ params }) => {
  const tool = tools.find((t) => t.slug === params.slug);
  if (!tool) return new Response("Not found", { status: 404 });

  const svg = cover(
    tool.slug,
    tool.mark,
    tool.name,
    getCategoryName(tool.category),
  );

  return new Response(svg, {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
