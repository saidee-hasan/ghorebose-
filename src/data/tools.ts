import type { Billing, Tool, ToolBadge, ToolPlan } from "@/lib/types";
import { getCategoryName } from "./categories";

interface ToolInput {
  name: string;
  slug: string;
  category: string;
  mark: string;
  tone?: "ink" | "brand" | "outline";
  tagline: string;
  shortDescription: string;
  overview: string;
  features: string[];
  price: number;
  billing?: Billing;
  duration?: string;
  compareAtPrice?: number;
  isFree?: boolean;
  rating: number;
  reviewCount: number;
  userCount: string;
  badge?: ToolBadge;
  tags: string[];
  createdAt: string;
  popularity: number;
  stock: number;
  featured?: boolean;
  trending?: boolean;
  plans?: ToolPlan[];
  included?: string[];
  requirements?: string[];
}

function defaultPlans(
  price: number,
  billing: Billing,
  duration: string,
): ToolPlan[] {
  const isOneTime = billing === "one-time";
  return [
    {
      name: "Starter",
      price,
      duration,
      billing,
      features: [
        "1 user seat",
        "Core AI features",
        "Standard processing",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: Math.round((price * 2.2) / 10) * 10,
      duration: isOneTime ? "2× credits" : "1 month",
      billing,
      popular: true,
      features: [
        "1 user seat",
        "All AI features",
        "Priority processing",
        "Priority support",
        "Commercial usage",
      ],
    },
    {
      name: "Team",
      price: Math.round((price * 4.5) / 10) * 10,
      duration: isOneTime ? "5× credits" : "1 month",
      billing,
      features: [
        "Up to 5 user seats",
        "All AI features",
        "Fastest processing",
        "Dedicated support",
        "Admin controls",
      ],
    },
  ];
}

function build(t: ToolInput): Tool {
  const billing = t.billing ?? "month";
  const duration = t.duration ?? "1 Month";
  const catName = getCategoryName(t.category);
  return {
    id: t.slug,
    slug: t.slug,
    name: t.name,
    tagline: t.tagline,
    category: t.category,
    mark: t.mark,
    tone: t.tone ?? "ink",
    price: t.price,
    compareAtPrice: t.compareAtPrice,
    billing,
    duration,
    isFree: t.isFree ?? false,
    rating: t.rating,
    reviewCount: t.reviewCount,
    userCount: t.userCount,
    badge: t.badge,
    shortDescription: t.shortDescription,
    overview: t.overview,
    features: t.features,
    howItWorks: [
      {
        title: "Choose your plan",
        text: `Pick the ${t.name} plan that matches how you work and complete checkout.`,
      },
      {
        title: "Submit your payment",
        text: "Pay with bKash, Nagad or Rocket and submit your transaction ID.",
      },
      {
        title: "Get instant access",
        text: `Our team verifies your payment and delivers your ${catName} access to your dashboard.`,
      },
    ],
    plans: t.plans ?? defaultPlans(t.price, billing, duration),
    included:
      t.included ??
      [
        `Full ${t.name} access for ${duration.toLowerCase()}`,
        "Access credentials or invite link delivered digitally",
        "Delivery within 30 minutes of payment verification",
        "Support through your ghorebose.com dashboard",
      ],
    requirements:
      t.requirements ??
      [
        "A valid email address for account delivery",
        "A stable internet connection",
        "No existing active subscription on the same account",
      ],
    faq: [
      {
        q: "How will I receive my access?",
        a: "After your payment is verified, access details appear in Purchased Tools in your dashboard and are also emailed to you.",
      },
      {
        q: "How long does verification take?",
        a: "Most payments are verified within 10–30 minutes during business hours, and always within 24 hours.",
      },
      {
        q: "Is this an official subscription?",
        a: `We provide legitimate ${t.name} access sourced through our partner network. Every order is covered by our refund policy.`,
      },
      {
        q: "Can I renew before it expires?",
        a: "Yes. You can renew from Purchased Tools any time before the expiry date and your access continues without interruption.",
      },
      {
        q: "What if my payment is rejected?",
        a: "If we cannot verify a payment we will contact you and issue a full refund of the amount paid.",
      },
    ],
    tags: t.tags,
    createdAt: t.createdAt,
    popularity: t.popularity,
    stock: t.stock,
    published: true,
    featured: t.featured,
    trending: t.trending,
  };
}

export const tools: Tool[] = [
  build({
    name: "Gemini Pro",
    slug: "gemini-pro",
    category: "ai-chat-assistant",
    mark: "Ge",
    tone: "brand",
    tagline: "Google's advanced multimodal AI assistant",
    shortDescription:
      "Access Google Gemini Pro with advanced reasoning, long context and multimodal understanding.",
    overview:
      "Gemini Pro is Google's advanced AI assistant built for reasoning across text, images and code. It handles long documents, complex analysis and creative work in one place. This plan gives you premium model access at a marketplace-friendly price.",
    features: [
      "Advanced reasoning with long context window",
      "Understands text, images, audio and code",
      "Google Workspace integration",
      "Real-time web grounding",
      "Priority access at peak times",
      "Export to Docs, Sheets and Slides",
    ],
    price: 50,
    compareAtPrice: 120,
    rating: 4.8,
    reviewCount: 412,
    userCount: "18.2k",
    badge: "best-value",
    tags: ["chatbot", "multimodal", "google"],
    createdAt: "2026-08-28",
    popularity: 99,
    stock: 240,
    featured: true,
    trending: true,
  }),
  build({
    name: "ChatGPT Plus",
    slug: "chatgpt-plus",
    category: "ai-chat-assistant",
    mark: "GP",
    tagline: "The world's most popular AI assistant",
    shortDescription:
      "ChatGPT Plus with GPT-5 class models, image generation, voice and data analysis.",
    overview:
      "ChatGPT Plus unlocks the latest frontier models, faster responses and priority access during busy periods. Use it for writing, coding, analysis and image generation. One subscription covers everyday work and creative projects.",
    features: [
      "Latest GPT frontier models",
      "Advanced data analysis and file uploads",
      "Image generation and editing",
      "Voice conversations on mobile",
      "Custom GPTs and memory",
      "Priority speed during peak hours",
    ],
    price: 899,
    compareAtPrice: 1200,
    rating: 4.9,
    reviewCount: 1284,
    userCount: "42.6k",
    badge: "popular",
    tags: ["chatbot", "openai", "assistant"],
    createdAt: "2026-06-02",
    popularity: 100,
    stock: 180,
    featured: true,
    trending: true,
  }),
  build({
    name: "Claude Pro",
    slug: "claude-pro",
    category: "ai-chat-assistant",
    mark: "Cl",
    tone: "brand",
    tagline: "Thoughtful AI for long documents and writing",
    shortDescription:
      "Claude Pro with a large context window, projects and Artifacts for serious work.",
    overview:
      "Claude Pro is known for careful reasoning, excellent writing and the ability to work through very long documents. Projects and Artifacts keep your work organized and reusable. Ideal for researchers, writers and developers.",
    features: [
      "200K+ token context window",
      "Projects for persistent context",
      "Artifacts for live document and code preview",
      "Superior long-form writing quality",
      "File and image understanding",
      "Priority access at peak times",
    ],
    price: 1190,
    rating: 4.8,
    reviewCount: 538,
    userCount: "21.7k",
    badge: "editor-choice",
    tags: ["writing", "research", "anthropic"],
    createdAt: "2026-05-14",
    popularity: 94,
    stock: 120,
    featured: true,
    trending: true,
  }),
  build({
    name: "Perplexity Pro",
    slug: "perplexity-pro",
    category: "ai-research",
    mark: "Px",
    tagline: "AI search with cited answers",
    shortDescription:
      "Perplexity Pro for research-grade AI search with citations and deep research reports.",
    overview:
      "Perplexity Pro blends a search engine with an AI assistant. Every answer includes citations you can verify, and Pro adds unlimited deep research and file analysis. Perfect for students, analysts and writers.",
    features: [
      "Unlimited Pro searches with citations",
      "Deep Research reports",
      "Upload and analyze PDFs and files",
      "Choice of frontier AI models",
      "Focus modes for academic and finance sources",
      "Collections to organize research",
    ],
    price: 650,
    rating: 4.7,
    reviewCount: 296,
    userCount: "9.8k",
    badge: "trending",
    tags: ["search", "research", "citations"],
    createdAt: "2026-08-19",
    popularity: 90,
    stock: 200,
    trending: true,
  }),
  build({
    name: "Jasper AI",
    slug: "jasper-ai",
    category: "ai-writing",
    mark: "Ja",
    tone: "brand",
    tagline: "AI marketing copy that stays on brand",
    shortDescription:
      "Jasper for teams that need on-brand marketing copy at scale.",
    overview:
      "Jasper is built for marketing teams. Brand Voice keeps every output consistent, and campaigns, documents and chat make it easy to move from idea to published copy. Includes SEO integrations and templates.",
    features: [
      "Brand Voice and knowledge base",
      "50+ marketing templates",
      "Campaign and document workflows",
      "SEO mode with Surfer integration",
      "Team collaboration and approvals",
      "Multiple languages",
    ],
    price: 2400,
    rating: 4.6,
    reviewCount: 188,
    userCount: "6.4k",
    tags: ["copywriting", "marketing", "brand"],
    createdAt: "2026-04-22",
    popularity: 78,
    stock: 90,
    featured: true,
  }),
  build({
    name: "Grammarly Premium",
    slug: "grammarly-premium",
    category: "ai-writing",
    mark: "Gr",
    tagline: "AI writing assistant everywhere you type",
    shortDescription:
      "Grammarly Premium with advanced grammar, tone and clarity suggestions.",
    overview:
      "Grammarly Premium goes beyond spelling to improve clarity, tone and delivery. It works across your browser, email and documents, and includes plagiarism detection and full-sentence rewrites.",
    features: [
      "Advanced grammar and punctuation",
      "Tone and clarity rewrites",
      "Full-sentence and paragraph rewrites",
      "Plagiarism detection",
      "Works across web and desktop",
      "Vocabulary and formality adjustments",
    ],
    price: 450,
    compareAtPrice: 700,
    rating: 4.7,
    reviewCount: 341,
    userCount: "12.1k",
    badge: "best-value",
    tags: ["grammar", "editing", "writing"],
    createdAt: "2026-03-11",
    popularity: 84,
    stock: 300,
    trending: true,
  }),
  build({
    name: "QuillBot Premium",
    slug: "quillbot-premium",
    category: "ai-writing",
    mark: "Qb",
    tagline: "Paraphrase, summarize and cite",
    shortDescription:
      "QuillBot Premium for paraphrasing, summarizing and citation generation.",
    overview:
      "QuillBot Premium rewrites and summarizes text while preserving meaning. Use it to improve clarity, shorten long passages and generate citations in seconds.",
    features: [
      "Unlimited paraphrasing modes",
      "Summarizer for long text",
      "Citation generator",
      "Grammar checker",
      "Plagiarism checker",
      "Chrome and Word extensions",
    ],
    price: 350,
    rating: 4.5,
    reviewCount: 214,
    userCount: "8.9k",
    tags: ["paraphrase", "students", "writing"],
    createdAt: "2026-02-08",
    popularity: 71,
    stock: 260,
  }),
  build({
    name: "Midjourney",
    slug: "midjourney",
    category: "ai-image",
    mark: "Mj",
    tone: "brand",
    tagline: "Industry-leading AI image generation",
    shortDescription:
      "Midjourney for high-quality artistic and photorealistic image generation.",
    overview:
      "Midjourney remains the benchmark for aesthetic image generation. Create concept art, product visuals and photoreal scenes with fine control over style, aspect ratio and reference images.",
    features: [
      "Best-in-class image quality",
      "Style and character references",
      "Upscaling and variation controls",
      "Web editor and inpainting",
      "Commercial usage rights",
      "Fast GPU hours included",
    ],
    price: 1500,
    rating: 4.9,
    reviewCount: 762,
    userCount: "24.3k",
    badge: "popular",
    tags: ["images", "art", "design"],
    createdAt: "2026-05-30",
    popularity: 96,
    stock: 110,
    featured: true,
    trending: true,
  }),
  build({
    name: "Leonardo AI",
    slug: "leonardo-ai",
    category: "ai-image",
    mark: "Le",
    tagline: "Production-ready AI image generation",
    shortDescription:
      "Leonardo AI with fine-tuned models, canvas editing and game asset tools.",
    overview:
      "Leonardo AI is built for production. Train custom models, generate consistent characters and edit on canvas. Popular with game studios, marketers and product teams.",
    features: [
      "Custom model training",
      "Real-time canvas editing",
      "Consistent character generation",
      "Game asset and texture tools",
      "Daily free credits",
      "Commercial license",
    ],
    price: 900,
    rating: 4.6,
    reviewCount: 267,
    userCount: "10.6k",
    tags: ["images", "game-art", "design"],
    createdAt: "2026-06-17",
    popularity: 80,
    stock: 150,
    trending: true,
  }),
  build({
    name: "Ideogram Pro",
    slug: "ideogram-pro",
    category: "ai-image",
    mark: "Id",
    tagline: "AI images that get text right",
    shortDescription:
      "Ideogram Pro for sharp typography and reliable text inside generated images.",
    overview:
      "Ideogram Pro excels at rendering readable text, logos and posters. If your design needs words inside the image, Ideogram is the tool that delivers.",
    features: [
      "Accurate text rendering in images",
      "Logo and poster generation",
      "Magic prompt enhancement",
      "Multiple aspect ratios",
      "Private generation mode",
      "Commercial usage",
    ],
    price: 700,
    rating: 4.5,
    reviewCount: 143,
    userCount: "5.2k",
    badge: "new",
    tags: ["images", "typography", "posters"],
    createdAt: "2026-09-06",
    popularity: 74,
    stock: 170,
  }),
  build({
    name: "Runway ML",
    slug: "runway-ml",
    category: "ai-video",
    mark: "Rw",
    tone: "brand",
    tagline: "AI video generation and editing suite",
    shortDescription:
      "Runway for text-to-video, video-to-video and advanced AI editing.",
    overview:
      "Runway is a full creative suite for AI video. Generate clips from text or images, remove objects, change styles and edit with motion brush tools. Used by studios and creators worldwide.",
    features: [
      "Text and image to video",
      "Motion brush and camera controls",
      "Green screen and inpainting",
      "Style transfer",
      "High-resolution exports",
      "Team workspaces",
    ],
    price: 1800,
    rating: 4.7,
    reviewCount: 231,
    userCount: "7.8k",
    badge: "trending",
    tags: ["video", "generation", "editing"],
    createdAt: "2026-07-25",
    popularity: 86,
    stock: 80,
    featured: true,
    trending: true,
  }),
  build({
    name: "HeyGen",
    slug: "heygen",
    category: "ai-video",
    mark: "Hg",
    tagline: "AI avatars and video translation",
    shortDescription:
      "HeyGen for realistic AI avatars, voice cloning and video translation.",
    overview:
      "HeyGen turns scripts into presenter-led videos with realistic AI avatars. Translate videos into dozens of languages with lip-sync, or clone your own avatar for scalable content.",
    features: [
      "100+ realistic AI avatars",
      "Instant avatar cloning",
      "Video translation with lip-sync",
      "Voice cloning in 40+ languages",
      "Templates and brand kits",
      "1080p exports",
    ],
    price: 2200,
    rating: 4.6,
    reviewCount: 176,
    userCount: "6.1k",
    tags: ["avatars", "video", "translation"],
    createdAt: "2026-06-09",
    popularity: 79,
    stock: 70,
    trending: true,
  }),
  build({
    name: "Descript",
    slug: "descript",
    category: "ai-video",
    mark: "De",
    tagline: "Edit video by editing text",
    shortDescription:
      "Descript for text-based video editing, studio sound and AI clips.",
    overview:
      "Descript makes video editing as easy as editing a document. Remove filler words, clone your voice for corrections and generate clips, all from a text transcript.",
    features: [
      "Text-based video editing",
      "Studio Sound noise removal",
      "Overdub voice cloning",
      "Filler word removal",
      "Automatic captions and clips",
      "Screen recording",
    ],
    price: 1300,
    rating: 4.7,
    reviewCount: 198,
    userCount: "7.2k",
    tags: ["video", "podcast", "editing"],
    createdAt: "2026-04-30",
    popularity: 76,
    stock: 95,
  }),
  build({
    name: "Suno AI",
    slug: "suno-ai",
    category: "ai-audio-music",
    mark: "Su",
    tone: "brand",
    tagline: "Generate full songs from a prompt",
    shortDescription:
      "Suno AI to create original songs with vocals and instruments in seconds.",
    overview:
      "Suno AI generates complete songs, including vocals, from a simple text prompt. Perfect for content creators, game developers and anyone who needs custom music fast.",
    features: [
      "Full songs with vocals",
      "Custom lyrics support",
      "Multiple genres and moods",
      "Stem downloads",
      "Commercial usage rights",
      "Fast generation",
    ],
    price: 600,
    rating: 4.5,
    reviewCount: 224,
    userCount: "11.4k",
    badge: "trending",
    tags: ["music", "audio", "songs"],
    createdAt: "2026-08-11",
    popularity: 82,
    stock: 210,
    trending: true,
  }),
  build({
    name: "ElevenLabs",
    slug: "elevenlabs",
    category: "ai-voice",
    mark: "El",
    tone: "brand",
    tagline: "The most realistic AI voices",
    shortDescription:
      "ElevenLabs for lifelike text-to-speech, voice cloning and dubbing.",
    overview:
      "ElevenLabs produces the most natural AI voices available. Generate voiceovers, clone a voice from a short sample and dub content into dozens of languages with matching emotion.",
    features: [
      "Ultra-realistic text to speech",
      "Instant and professional voice cloning",
      "Dubbing across 30+ languages",
      "Voice library with 1000+ voices",
      "API access",
      "Commercial license",
    ],
    price: 1400,
    rating: 4.9,
    reviewCount: 487,
    userCount: "15.9k",
    badge: "popular",
    tags: ["voice", "tts", "cloning"],
    createdAt: "2026-07-03",
    popularity: 92,
    stock: 130,
    featured: true,
    trending: true,
  }),
  build({
    name: "Murf AI",
    slug: "murf-ai",
    category: "ai-voice",
    mark: "Mu",
    tagline: "Studio-quality AI voiceovers",
    shortDescription:
      "Murf AI for professional voiceovers, dubbing and voice changing.",
    overview:
      "Murf AI is designed for presentations, ads and e-learning. Choose from 120+ voices, sync voice to video and adjust pitch, pace and emphasis with a simple editor.",
    features: [
      "120+ voices in 20+ languages",
      "Voice changer",
      "Video and audio sync",
      "Background music library",
      "Team collaboration",
      "Commercial rights",
    ],
    price: 950,
    rating: 4.5,
    reviewCount: 159,
    userCount: "6.8k",
    tags: ["voice", "voiceover", "elearning"],
    createdAt: "2026-03-28",
    popularity: 70,
    stock: 140,
  }),
  build({
    name: "GitHub Copilot",
    slug: "github-copilot",
    category: "ai-coding",
    mark: "Co",
    tone: "ink",
    tagline: "Your AI pair programmer",
    shortDescription:
      "GitHub Copilot with code completion, chat and multi-model support.",
    overview:
      "GitHub Copilot suggests whole lines and functions as you type, answers questions in chat and helps you refactor or explain unfamiliar code. Works in VS Code, JetBrains and Neovim.",
    features: [
      "Real-time code completion",
      "Copilot Chat in your editor",
      "Multi-model selection",
      "Code explanation and refactoring",
      "Unit test generation",
      "Works with 20+ languages",
    ],
    price: 1250,
    compareAtPrice: 1600,
    rating: 4.8,
    reviewCount: 612,
    userCount: "26.5k",
    badge: "popular",
    tags: ["coding", "developer", "ide"],
    createdAt: "2026-05-21",
    popularity: 95,
    stock: 160,
    featured: true,
    trending: true,
  }),
  build({
    name: "Cursor Pro",
    slug: "cursor-pro",
    category: "ai-coding",
    mark: "Cu",
    tone: "brand",
    tagline: "The AI-first code editor",
    shortDescription:
      "Cursor Pro with agent mode, codebase chat and multi-file edits.",
    overview:
      "Cursor is an editor built around AI. Ask questions about your codebase, apply multi-file edits and let agent mode complete tasks end to end. A favourite among fast-moving engineering teams.",
    features: [
      "Agent mode for multi-step tasks",
      "Codebase-wide chat",
      "Multi-file edits",
      "Frontier model access",
      "Tab autocomplete",
      "Privacy mode",
    ],
    price: 1600,
    rating: 4.8,
    reviewCount: 398,
    userCount: "13.3k",
    badge: "trending",
    tags: ["coding", "editor", "agent"],
    createdAt: "2026-08-02",
    popularity: 91,
    stock: 100,
    trending: true,
  }),
  build({
    name: "Canva Pro",
    slug: "canva-pro",
    category: "ai-design",
    mark: "Cv",
    tone: "brand",
    tagline: "Design anything with AI assistance",
    shortDescription:
      "Canva Pro with Magic Studio, brand kit, premium assets and background remover.",
    overview:
      "Canva Pro makes professional design accessible. Magic Studio generates images, text and presentations, while the brand kit keeps everything consistent. Includes 100M+ premium assets.",
    features: [
      "Magic Studio AI tools",
      "Brand kit and templates",
      "100M+ premium assets",
      "Background remover",
      "Magic resize",
      "1TB cloud storage",
    ],
    price: 350,
    compareAtPrice: 600,
    rating: 4.8,
    reviewCount: 934,
    userCount: "38.7k",
    badge: "best-value",
    tags: ["design", "templates", "social"],
    createdAt: "2026-02-19",
    popularity: 93,
    stock: 400,
    featured: true,
    trending: true,
  }),
  build({
    name: "Gamma",
    slug: "gamma",
    category: "ai-design",
    mark: "Ga",
    tagline: "AI presentations and documents",
    shortDescription:
      "Gamma to generate polished presentations, docs and websites from a prompt.",
    overview:
      "Gamma turns a prompt or document into a designed presentation, document or site in seconds. Smart layouts, AI images and analytics make it ideal for pitches and reports.",
    features: [
      "AI presentation generation",
      "Smart layout engine",
      "AI image generation",
      "Websites and documents",
      "Export to PPT and PDF",
      "Viewer analytics",
    ],
    price: 750,
    rating: 4.6,
    reviewCount: 287,
    userCount: "9.1k",
    badge: "new",
    tags: ["presentations", "design", "slides"],
    createdAt: "2026-09-01",
    popularity: 81,
    stock: 190,
    trending: true,
  }),
  build({
    name: "Figma AI",
    slug: "figma-ai",
    category: "ai-design",
    mark: "Fi",
    tone: "ink",
    tagline: "AI features inside your design workflow",
    shortDescription:
      "Figma AI with smart suggestions, auto-layout help and content generation.",
    overview:
      "Figma AI brings AI into the design canvas. Generate placeholder content, rename layers, search by description and speed up prototyping without leaving your file.",
    features: [
      "AI content and copy generation",
      "Automatic layer renaming",
      "Visual search across files",
      "Smart prototyping suggestions",
      "Real-time collaboration",
      "Dev Mode handoff",
    ],
    price: 1000,
    rating: 4.6,
    reviewCount: 176,
    userCount: "7.5k",
    tags: ["ui", "design", "prototyping"],
    createdAt: "2026-06-27",
    popularity: 77,
    stock: 120,
  }),
  build({
    name: "HubSpot AI",
    slug: "hubspot-ai",
    category: "ai-marketing",
    mark: "Hs",
    tone: "brand",
    tagline: "AI copilot for your CRM",
    shortDescription:
      "HubSpot AI for content, prospecting and customer insights in your CRM.",
    overview:
      "HubSpot AI embeds AI across marketing, sales and service. Generate emails and posts, summarize calls and surface the next best action for every deal.",
    features: [
      "AI content assistant",
      "Call and email summaries",
      "Predictive lead scoring",
      "ChatSpot AI assistant",
      "Campaign analytics",
      "CRM automation",
    ],
    price: 2800,
    rating: 4.5,
    reviewCount: 132,
    userCount: "4.9k",
    tags: ["crm", "marketing", "sales"],
    createdAt: "2026-04-14",
    popularity: 68,
    stock: 60,
  }),
  build({
    name: "Surfer SEO",
    slug: "surfer-seo",
    category: "ai-seo",
    mark: "Sf",
    tagline: "Write content that ranks",
    shortDescription:
      "Surfer SEO for data-driven content briefs and on-page optimization.",
    overview:
      "Surfer SEO analyzes top-ranking pages and builds a content brief you can actually follow. Score your draft in real time and optimize structure, terms and length as you write.",
    features: [
      "Content editor with live score",
      "SERP analysis and briefs",
      "Keyword research",
      "Internal link suggestions",
      "AI article outlines",
      "Team seats",
    ],
    price: 2000,
    rating: 4.7,
    reviewCount: 204,
    userCount: "5.7k",
    badge: "editor-choice",
    tags: ["seo", "content", "keywords"],
    createdAt: "2026-05-06",
    popularity: 75,
    stock: 85,
  }),
  build({
    name: "Semrush AI",
    slug: "semrush-ai",
    category: "ai-seo",
    mark: "Sr",
    tone: "brand",
    tagline: "All-in-one AI SEO platform",
    shortDescription:
      "Semrush AI for keyword, competitor, backlink and content analysis.",
    overview:
      "Semrush is the most complete SEO platform available. Track rankings, audit sites, research competitors and generate optimized content briefs, all with AI assistance.",
    features: [
      "Keyword Magic Tool",
      "Site audit and position tracking",
      "Backlink analytics",
      "Competitor research",
      "AI content templates",
      "PPC and market data",
    ],
    price: 3200,
    rating: 4.7,
    reviewCount: 318,
    userCount: "8.3k",
    tags: ["seo", "analytics", "keywords"],
    createdAt: "2026-03-17",
    popularity: 83,
    stock: 75,
    featured: true,
  }),
  build({
    name: "Buffer AI",
    slug: "buffer-ai",
    category: "ai-social-media",
    mark: "Bu",
    tagline: "AI social media scheduling",
    shortDescription:
      "Buffer AI to create, schedule and analyze social content across platforms.",
    overview:
      "Buffer AI helps small teams stay consistent on social. Generate post ideas and captions, schedule to every major platform and see what performs best.",
    features: [
      "AI post and caption generation",
      "Multi-platform scheduling",
      "Content calendar",
      "Performance analytics",
      "Team approvals",
      "Link-in-bio tool",
    ],
    price: 500,
    rating: 4.5,
    reviewCount: 186,
    userCount: "7.9k",
    badge: "best-value",
    tags: ["social", "scheduling", "content"],
    createdAt: "2026-07-12",
    popularity: 72,
    stock: 230,
  }),
  build({
    name: "Notion AI",
    slug: "notion-ai",
    category: "ai-productivity",
    mark: "No",
    tone: "ink",
    tagline: "AI writing and search in your workspace",
    shortDescription:
      "Notion AI to write, summarize and find anything across your workspace.",
    overview:
      "Notion AI adds writing help, summaries and a workspace-wide Q&A on top of Notion. Draft documents, extract action items from meetings and find answers across every page.",
    features: [
      "Workspace-wide AI Q&A",
      "Writing and editing assistance",
      "Meeting notes and action items",
      "Database auto-fill",
      "AI translation",
      "Connects to Slack and Drive",
    ],
    price: 700,
    rating: 4.7,
    reviewCount: 429,
    userCount: "16.4k",
    badge: "popular",
    tags: ["notes", "workspace", "productivity"],
    createdAt: "2026-06-23",
    popularity: 88,
    stock: 200,
    featured: true,
    trending: true,
  }),
  build({
    name: "Otter.ai",
    slug: "otter-ai",
    category: "ai-productivity",
    mark: "Ot",
    tagline: "AI meeting notes and summaries",
    shortDescription:
      "Otter.ai for live transcription, summaries and action items from meetings.",
    overview:
      "Otter.ai joins your meetings, transcribes in real time and produces a clean summary with action items. Works with Zoom, Meet and Teams, and keeps a searchable archive.",
    features: [
      "Live transcription",
      "AI meeting summaries",
      "Action item extraction",
      "Zoom, Meet and Teams integration",
      "Speaker identification",
      "Searchable archive",
    ],
    price: 900,
    rating: 4.5,
    reviewCount: 243,
    userCount: "10.2k",
    tags: ["meetings", "transcription", "notes"],
    createdAt: "2026-04-08",
    popularity: 74,
    stock: 150,
  }),
  build({
    name: "Zapier AI",
    slug: "zapier-ai",
    category: "ai-automation",
    mark: "Za",
    tone: "brand",
    tagline: "Automate work across 6000+ apps",
    shortDescription:
      "Zapier AI to build automations and AI agents without code.",
    overview:
      "Zapier connects the tools you already use and adds AI steps and agents. Describe what you want in plain language and Zapier builds the automation for you.",
    features: [
      "AI-powered Zap builder",
      "6000+ app integrations",
      "AI agents and chatbots",
      "Multi-step workflows",
      "Conditional logic and filters",
      "Team and enterprise controls",
    ],
    price: 1500,
    rating: 4.7,
    reviewCount: 356,
    userCount: "12.8k",
    badge: "popular",
    tags: ["automation", "integration", "no-code"],
    createdAt: "2026-05-27",
    popularity: 87,
    stock: 140,
    featured: true,
    trending: true,
  }),
  build({
    name: "Make",
    slug: "make",
    category: "ai-automation",
    mark: "Mk",
    tagline: "Visual automation with AI steps",
    shortDescription:
      "Make for visual, powerful automations with built-in AI modules.",
    overview:
      "Make gives you a visual canvas to design complex automations. Add AI modules for text, image and data processing, and connect thousands of apps with fine-grained control.",
    features: [
      "Visual scenario builder",
      "AI and LLM modules",
      "Thousands of app connectors",
      "Error handling and retries",
      "Data stores",
      "Team collaboration",
    ],
    price: 1200,
    rating: 4.6,
    reviewCount: 167,
    userCount: "6.6k",
    tags: ["automation", "workflows", "no-code"],
    createdAt: "2026-03-05",
    popularity: 69,
    stock: 130,
  }),
  build({
    name: "ChatPDF",
    slug: "chatpdf",
    category: "ai-pdf-documents",
    mark: "Cp",
    tagline: "Chat with any PDF",
    shortDescription:
      "ChatPDF to ask questions, summarize and extract data from documents.",
    overview:
      "ChatPDF lets you upload a document and ask questions in plain language. It summarizes long reports, finds specific clauses and extracts tables, with page references for every answer.",
    features: [
      "Ask questions with page citations",
      "Instant summaries",
      "Multi-document analysis",
      "Table and data extraction",
      "Supports 50+ languages",
      "Secure file handling",
    ],
    price: 400,
    rating: 4.4,
    reviewCount: 178,
    userCount: "8.1k",
    badge: "best-value",
    tags: ["pdf", "documents", "research"],
    createdAt: "2026-08-05",
    popularity: 73,
    stock: 250,
    trending: true,
  }),
  build({
    name: "DeepL Pro",
    slug: "deepl-pro",
    category: "ai-translation",
    mark: "DL",
    tone: "brand",
    tagline: "The most accurate AI translation",
    shortDescription:
      "DeepL Pro for high-accuracy translation, glossaries and document translation.",
    overview:
      "DeepL Pro delivers translations that read naturally. Translate full documents while keeping formatting, build glossaries for consistency and integrate through the API.",
    features: [
      "Best-in-class translation quality",
      "Document translation with formatting",
      "Custom glossaries",
      "30+ languages",
      "API access",
      "Data privacy and no retention",
    ],
    price: 850,
    rating: 4.8,
    reviewCount: 392,
    userCount: "14.7k",
    badge: "popular",
    tags: ["translation", "localization", "documents"],
    createdAt: "2026-06-14",
    popularity: 85,
    stock: 180,
    featured: true,
    trending: true,
  }),
  build({
    name: "Shopify Magic",
    slug: "shopify-magic",
    category: "ai-ecommerce",
    mark: "Sh",
    tone: "brand",
    tagline: "AI built for e-commerce",
    shortDescription:
      "Shopify Magic for product descriptions, store content and sidekick assistance.",
    overview:
      "Shopify Magic writes product descriptions, answers customer questions and helps you run your store. Sidekick acts as an AI assistant for the whole business.",
    features: [
      "AI product descriptions",
      "Sidekick store assistant",
      "Email and blog generation",
      "Image editing and backgrounds",
      "Customer chat suggestions",
      "Store analytics insights",
    ],
    price: 650,
    rating: 4.4,
    reviewCount: 121,
    userCount: "5.4k",
    tags: ["ecommerce", "store", "product"],
    createdAt: "2026-07-18",
    popularity: 66,
    stock: 160,
  }),
  build({
    name: "OpenRouter Credits",
    slug: "openrouter-credits",
    category: "ai-developer-tools",
    mark: "OR",
    tone: "ink",
    tagline: "One API for every frontier model",
    shortDescription:
      "Prepaid OpenRouter credits to access hundreds of AI models through one API.",
    overview:
      "OpenRouter gives developers a single API key for hundreds of models from every major lab. Compare prices, route requests automatically and pay only for what you use.",
    features: [
      "300+ models, one API",
      "Automatic fallback routing",
      "Pay-as-you-go credits",
      "OpenAI-compatible endpoint",
      "Usage analytics",
      "No monthly commitment",
    ],
    price: 500,
    billing: "one-time",
    duration: "Prepaid credits",
    rating: 4.6,
    reviewCount: 143,
    userCount: "6.9k",
    tags: ["api", "developer", "llm"],
    createdAt: "2026-08-23",
    popularity: 80,
    stock: 500,
    trending: true,
  }),
  build({
    name: "Khanmigo",
    slug: "khanmigo",
    category: "ai-education",
    mark: "Kh",
    tagline: "AI tutor for learners of every age",
    shortDescription:
      "Khanmigo AI tutor for guided learning across maths, science and writing.",
    overview:
      "Khanmigo is an AI tutor that guides students to answers instead of giving them away. It supports maths, science, writing and coding, and gives teachers planning tools.",
    features: [
      "Socratic step-by-step tutoring",
      "Maths, science and writing support",
      "Teacher lesson planning tools",
      "Progress tracking",
      "Parent controls",
      "Safe, education-first AI",
    ],
    price: 300,
    rating: 4.5,
    reviewCount: 96,
    userCount: "3.8k",
    tags: ["education", "tutor", "students"],
    createdAt: "2026-09-09",
    popularity: 62,
    stock: 300,
    badge: "new",
  }),
  build({
    name: "Bing Image Creator",
    slug: "bing-image-creator",
    category: "ai-image",
    mark: "Bi",
    tagline: "Free AI image generation",
    shortDescription:
      "Generate images free with Microsoft's AI image creator.",
    overview:
      "Bing Image Creator lets you generate images from text for free. Great for quick concepts, blog visuals and social posts when you do not need a paid plan.",
    features: [
      "Free image generation",
      "DALL·E powered",
      "Multiple styles",
      "Fast results",
      "No credit card required",
      "Works in browser",
    ],
    price: 0,
    isFree: true,
    duration: "Free",
    rating: 4.3,
    reviewCount: 412,
    userCount: "31.2k",
    tags: ["free", "images", "microsoft"],
    createdAt: "2026-01-15",
    popularity: 70,
    stock: 9999,
  }),
  build({
    name: "Google AI Studio",
    slug: "google-ai-studio",
    category: "ai-developer-tools",
    mark: "AI",
    tone: "brand",
    tagline: "Free prototyping with Gemini models",
    shortDescription:
      "Google AI Studio to prototype with Gemini models and get a free API key.",
    overview:
      "Google AI Studio is a free environment for building with Gemini. Test prompts, tune parameters and grab an API key to move into production.",
    features: [
      "Free Gemini API key",
      "Prompt testing and tuning",
      "Structured output tools",
      "Multimodal inputs",
      "Code export in several languages",
      "Usage dashboard",
    ],
    price: 0,
    isFree: true,
    duration: "Free",
    rating: 4.6,
    reviewCount: 268,
    userCount: "19.6k",
    badge: "best-value",
    tags: ["free", "api", "developer"],
    createdAt: "2026-02-26",
    popularity: 79,
    stock: 9999,
    trending: true,
  }),
  build({
    name: "Microsoft Copilot Free",
    slug: "microsoft-copilot-free",
    category: "ai-productivity",
    mark: "MS",
    tone: "brand",
    tagline: "Free AI assistant with web grounding",
    shortDescription:
      "Microsoft Copilot free tier for chat, image generation and web answers.",
    overview:
      "Microsoft Copilot combines a chat assistant with web grounding and image generation. The free tier is a great starting point for everyday tasks.",
    features: [
      "Free AI chat",
      "Web-grounded answers with citations",
      "Image generation",
      "Works on Windows and web",
      "Voice input",
      "No cost",
    ],
    price: 0,
    isFree: true,
    duration: "Free",
    rating: 4.4,
    reviewCount: 356,
    userCount: "27.4k",
    tags: ["free", "assistant", "microsoft"],
    createdAt: "2026-01-30",
    popularity: 75,
    stock: 9999,
  }),
  build({
    name: "Stable Diffusion Web",
    slug: "stable-diffusion-web",
    category: "ai-image",
    mark: "SD",
    tagline: "Open-source image generation",
    shortDescription:
      "Run Stable Diffusion in your browser with no setup or install.",
    overview:
      "Stable Diffusion Web gives you open-source image generation directly in the browser. Experiment with models, samplers and styles without installing anything locally.",
    features: [
      "Open-source models",
      "No installation required",
      "Negative prompts and seeds",
      "Img2img and inpainting",
      "Multiple samplers",
      "Community models",
    ],
    price: 0,
    isFree: true,
    duration: "Free",
    rating: 4.2,
    reviewCount: 187,
    userCount: "14.3k",
    tags: ["free", "open-source", "images"],
    createdAt: "2026-02-12",
    popularity: 64,
    stock: 9999,
  }),
  build({
    name: "Pika Labs",
    slug: "pika-labs",
    category: "ai-video",
    mark: "Pi",
    tone: "brand",
    tagline: "Fun, fast AI video generation",
    shortDescription:
      "Pika Labs for quick text-to-video and image-to-video clips.",
    overview:
      "Pika Labs makes AI video generation fast and playful. Animate images, apply effects and produce short clips ready for social in minutes.",
    features: [
      "Text and image to video",
      "Pikaffects video effects",
      "Lip sync",
      "Multiple aspect ratios",
      "Fast rendering",
      "Commercial usage",
    ],
    price: 850,
    rating: 4.4,
    reviewCount: 132,
    userCount: "5.9k",
    tags: ["video", "social", "effects"],
    createdAt: "2026-07-08",
    popularity: 67,
    stock: 110,
  }),
  build({
    name: "Udio",
    slug: "udio",
    category: "ai-audio-music",
    mark: "Ud",
    tagline: "AI music with studio-quality sound",
    shortDescription:
      "Udio to create high-fidelity AI music with detailed style control.",
    overview:
      "Udio focuses on audio fidelity and control. Generate tracks, extend them, remix sections and download stems for use in your own productions.",
    features: [
      "High-fidelity music generation",
      "Extend and remix tracks",
      "Stem downloads",
      "Style and mood control",
      "Commercial rights",
      "Fast generation",
    ],
    price: 550,
    rating: 4.4,
    reviewCount: 118,
    userCount: "4.7k",
    tags: ["music", "audio", "production"],
    createdAt: "2026-06-30",
    popularity: 63,
    stock: 150,
  }),
  build({
    name: "Tabnine",
    slug: "tabnine",
    category: "ai-coding",
    mark: "Tb",
    tone: "ink",
    tagline: "Private AI code completion",
    shortDescription:
      "Tabnine for private, on-premise-friendly AI code completion.",
    overview:
      "Tabnine is built for teams with strict privacy needs. It completes code across your IDE, can run on your own infrastructure and never trains on your code.",
    features: [
      "Private and on-prem options",
      "Whole-line and full-function completion",
      "Natural language to code",
      "Test generation",
      "Team training on your repos",
      "20+ languages",
    ],
    price: 800,
    rating: 4.3,
    reviewCount: 108,
    userCount: "4.2k",
    tags: ["coding", "privacy", "completion"],
    createdAt: "2026-04-02",
    popularity: 60,
    stock: 120,
  }),
  build({
    name: "Copy.ai",
    slug: "copy-ai",
    category: "ai-writing",
    mark: "CA",
    tagline: "GTM AI for sales and marketing",
    shortDescription:
      "Copy.ai for go-to-market teams to automate copy and research workflows.",
    overview:
      "Copy.ai is a go-to-market AI platform. Automate prospecting research, personalize outreach and generate campaign copy with workflows that connect to your CRM.",
    features: [
      "GTM AI workflows",
      "Sales prospecting research",
      "Email personalization at scale",
      "Brand voice",
      "CRM integrations",
      "Team workspaces",
    ],
    price: 1200,
    rating: 4.4,
    reviewCount: 152,
    userCount: "5.6k",
    tags: ["copywriting", "sales", "marketing"],
    createdAt: "2026-03-22",
    popularity: 65,
    stock: 100,
  }),
  build({
    name: "Adobe Firefly",
    slug: "adobe-firefly",
    category: "ai-image",
    mark: "Af",
    tone: "brand",
    tagline: "Commercially safe generative AI",
    shortDescription:
      "Adobe Firefly for commercially safe image generation and editing.",
    overview:
      "Adobe Firefly is trained on licensed content, making its output safe for commercial use. Generate images, edit photos and extend canvases inside the Adobe ecosystem.",
    features: [
      "Commercially safe generations",
      "Generative fill and expand",
      "Text effects",
      "Photoshop and Illustrator integration",
      "Style reference",
      "Content credentials",
    ],
    price: 1100,
    rating: 4.5,
    reviewCount: 221,
    userCount: "9.4k",
    tags: ["images", "adobe", "commercial"],
    createdAt: "2026-05-11",
    popularity: 76,
    stock: 130,
  }),
  build({
    name: "Mailchimp AI",
    slug: "mailchimp-ai",
    category: "ai-marketing",
    mark: "Mc",
    tone: "brand",
    tagline: "AI email marketing on autopilot",
    shortDescription:
      "Mailchimp AI for email campaigns, automations and audience insights.",
    overview:
      "Mailchimp AI helps you build email campaigns faster. Generate content, pick send times and automate journeys that adapt to how customers behave.",
    features: [
      "AI email content generator",
      "Customer journey builder",
      "Send-time optimization",
      "Audience segmentation",
      "Performance reporting",
      "E-commerce integrations",
    ],
    price: 1100,
    rating: 4.3,
    reviewCount: 164,
    userCount: "6.2k",
    tags: ["email", "marketing", "automation"],
    createdAt: "2026-04-18",
    popularity: 64,
    stock: 140,
  }),
  build({
    name: "Claude Code",
    slug: "claude-code",
    category: "ai-developer-tools",
    mark: "CC",
    tone: "brand",
    tagline: "Agentic coding in your terminal",
    shortDescription:
      "Claude Code for agentic development directly from the command line.",
    overview:
      "Claude Code works in your terminal, reading your repository and completing multi-step engineering tasks. It edits files, runs tests and explains its changes.",
    features: [
      "Terminal-based coding agent",
      "Multi-file editing",
      "Runs tests and commands",
      "Git-aware workflows",
      "Long-context codebase understanding",
      "MCP integrations",
    ],
    price: 1700,
    rating: 4.8,
    reviewCount: 211,
    userCount: "7.1k",
    badge: "new",
    tags: ["coding", "agent", "terminal"],
    createdAt: "2026-09-14",
    popularity: 89,
    stock: 90,
    featured: true,
    trending: true,
  }),
];

/* ------------------------------- selectors -------------------------------- */

export function getTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}

export function getToolsByCategory(slug: string): Tool[] {
  return tools.filter((t) => t.category === slug);
}

export function getFeaturedTools(limit = 8): Tool[] {
  return tools
    .filter((t) => t.featured)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getTrendingTools(limit = 8): Tool[] {
  return tools
    .filter((t) => t.trending)
    .sort((a, b) => b.popularity - a.popularity)
    .slice(0, limit);
}

export function getNewTools(limit = 8): Tool[] {
  return [...tools]
    .sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt))
    .slice(0, limit);
}

export function getFreeTools(): Tool[] {
  return tools.filter((t) => t.isFree);
}

export function getPaidTools(): Tool[] {
  return tools.filter((t) => !t.isFree);
}

export function getRelatedTools(slug: string, limit = 4): Tool[] {
  const tool = getTool(slug);
  if (!tool) return [];
  const sameCategory = tools.filter(
    (t) => t.category === tool.category && t.slug !== slug,
  );
  const sharedTags = tools.filter(
    (t) =>
      t.slug !== slug &&
      t.category !== tool.category &&
      t.tags.some((tag) => tool.tags.includes(tag)),
  );
  return [...sameCategory, ...sharedTags].slice(0, limit);
}

export function searchTools(query: string): Tool[] {
  const q = query.trim().toLowerCase();
  if (!q) return tools;
  return tools.filter((t) =>
    [t.name, t.tagline, t.shortDescription, t.category, ...t.tags]
      .join(" ")
      .toLowerCase()
      .includes(q),
  );
}

export const priceBounds = {
  min: 0,
  max: Math.max(...tools.map((t) => t.price)),
};
