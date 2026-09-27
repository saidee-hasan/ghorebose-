import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "ai-chat-assistant",
    name: "AI Chat & Assistant",
    description:
      "Conversational AI assistants for answers, research, brainstorming and everyday tasks.",
    icon: "chat",
    group: "Communicate",
    featured: true,
  },
  {
    slug: "ai-writing",
    name: "AI Writing",
    description:
      "Draft, rewrite, summarize and polish content with AI writing assistants.",
    icon: "pen",
    group: "Create",
    featured: true,
  },
  {
    slug: "ai-image",
    name: "AI Image",
    description:
      "Generate, edit and upscale images with modern AI image models.",
    icon: "image",
    group: "Create",
    featured: true,
  },
  {
    slug: "ai-video",
    name: "AI Video",
    description:
      "Create, edit and repurpose video with AI-powered generation and editing.",
    icon: "video",
    group: "Create",
    featured: true,
  },
  {
    slug: "ai-audio-music",
    name: "AI Audio & Music",
    description:
      "Generate music, clean audio and produce sound with AI audio tools.",
    icon: "music",
    group: "Create",
    featured: true,
  },
  {
    slug: "ai-voice",
    name: "AI Voice",
    description:
      "Text to speech, voice cloning, dubbing and realistic AI voiceovers.",
    icon: "mic",
    group: "Communicate",
    featured: true,
  },
  {
    slug: "ai-coding",
    name: "AI Coding",
    description:
      "AI pair programmers, code completion and automated code review.",
    icon: "code",
    group: "Build",
    featured: true,
  },
  {
    slug: "ai-design",
    name: "AI Design",
    description:
      "Design presentations, UI, logos and graphics with AI assistance.",
    icon: "palette",
    group: "Create",
    featured: true,
  },
  {
    slug: "ai-marketing",
    name: "AI Marketing",
    description:
      "Campaigns, ad copy, email and growth automation powered by AI.",
    icon: "megaphone",
    group: "Grow",
    featured: true,
  },
  {
    slug: "ai-seo",
    name: "AI SEO",
    description:
      "Keyword research, content optimization and technical SEO with AI.",
    icon: "search",
    group: "Grow",
    featured: true,
  },
  {
    slug: "ai-social-media",
    name: "AI Social Media",
    description:
      "Plan, write and schedule social content with AI social managers.",
    icon: "share",
    group: "Grow",
  },
  {
    slug: "ai-business",
    name: "AI Business",
    description:
      "Analytics, CRM, forecasting and operations copilots for teams.",
    icon: "briefcase",
    group: "Work",
  },
  {
    slug: "ai-productivity",
    name: "AI Productivity",
    description:
      "Notes, meeting assistants, task automation and personal AI copilots.",
    icon: "bolt",
    group: "Work",
    featured: true,
  },
  {
    slug: "ai-education",
    name: "AI Education",
    description:
      "Tutors, study helpers and learning assistants for students and teachers.",
    icon: "graduation",
    group: "Work",
  },
  {
    slug: "ai-research",
    name: "AI Research",
    description:
      "Literature search, paper analysis and citation tools for researchers.",
    icon: "flask",
    group: "Work",
  },
  {
    slug: "ai-automation",
    name: "AI Automation",
    description:
      "Connect apps and automate workflows with AI-powered agents.",
    icon: "workflow",
    group: "Build",
    featured: true,
  },
  {
    slug: "ai-pdf-documents",
    name: "AI PDF & Documents",
    description:
      "Chat with PDFs, extract data and summarize long documents instantly.",
    icon: "document",
    group: "Work",
  },
  {
    slug: "ai-translation",
    name: "AI Translation",
    description:
      "Accurate AI translation, localization and multilingual subtitling.",
    icon: "translate",
    group: "Communicate",
  },
  {
    slug: "ai-ecommerce",
    name: "AI E-commerce",
    description:
      "Product descriptions, catalog enrichment and store optimization.",
    icon: "cart",
    group: "Grow",
  },
  {
    slug: "ai-developer-tools",
    name: "AI Developer Tools",
    description:
      "APIs, SDKs, vector databases and infrastructure for AI builders.",
    icon: "terminal",
    group: "Build",
  },
];

export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getCategoryName(slug: string): string {
  return getCategory(slug)?.name ?? "Uncategorized";
}

export const featuredCategories = categories.filter((c) => c.featured);
