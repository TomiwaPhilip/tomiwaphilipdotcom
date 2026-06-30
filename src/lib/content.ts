/**
 * Single source of truth for case studies, experience, skills, writing.
 * Keep this typed so OG image generation + JSON-LD stay in sync.
 */

export interface Mission {
  slug: string;
  company: string;
  role: string;
  period: string;
  status: "active" | "shipped" | "archived";
  axis: "ai" | "web3" | "both";
  oneLiner: string;
  metrics: { label: string; value: string; suffix?: string }[];
  problem: string;
  approach: string;
  impact: string;
  stack: string[];
  link?: string;
}

export const missions: Mission[] = [
  {
    slug: "shakes-labs",
    company: "Shakes Labs",
    role: "Founder · CEO · CTO",
    period: "2026 — Present",
    status: "active",
    axis: "both",
    oneLiner:
      "Long-term technology partnership studio shipping AI, Web3, mobile, and web for ventures that compound.",
    metrics: [
      { label: "products delivered", value: "20", suffix: "+" },
      { label: "discipline", value: "AI · WEB3", suffix: "" },
      { label: "engagement model", value: "long-term", suffix: "" },
    ],
    problem:
      "Ambitious teams need engineering partners who can ship across AI, Web3, mobile, and core product without juggling four vendors. Most studios optimize for billable hours, not compounding outcomes.",
    approach:
      "Founded Shakes Labs as a long-horizon partnership studio: ride-along CTO services, product + infra co-design, and a shared bench across AI, Web3, mobile, and web. Each engagement starts from a thesis, not a backlog — we earn the right to stay by making the next sprint cheaper than the last.",
    impact:
      "20+ production products delivered. Several clients now run their entire technical roadmap through Shakes Labs. The studio is the umbrella for everything I'm building — ventures, advisory, and the lab.",
    stack: ["TypeScript", "Python", "Rust", "Solidity", "Next.js", "React Native", "PostgreSQL", "AWS"],
    link: "https://shakeslabs.com",
  },
  {
    slug: "vouchify",
    company: "Vouchify",
    role: "Chief Technical Officer",
    period: "2024 — 2026",
    status: "shipped",
    axis: "both",
    oneLiner:
      "Trust-as-a-Service settlement engine for cross-border crypto-to-fiat liquidity.",
    metrics: [
      { label: "transactions / day", value: "100K", suffix: "+" },
      { label: "uptime", value: "99.99", suffix: "%" },
      { label: "fraud loss reduction", value: "45", suffix: "%" },
    ],
    problem:
      "Cross-border B2B settlements were slow, opaque, and stalked by counterparty risk. The status quo was correspondent banking — expensive, sluggish, jurisdiction-locked.",
    approach:
      "Architected a high-performance settlement engine running 100,000+ daily transactions on stablecoin rails with 99.99% uptime. Layered a proprietary Trust-as-a-Service (TaaS) protocol on top — decentralized verification + multi-sig — to eliminate counterparty risk. LLM-driven anomaly detection monitored transaction patterns in real time for fraud and regional compliance.",
    impact:
      "45% reduction in fraud-related losses. Compliance with evolving regional fintech regulations baked into the runtime. A trust primitive that B2B and retail users could actually rely on.",
    stack: ["TypeScript", "Rust", "Solidity", "PostgreSQL", "Redis", "AWS", "LLM Ops"],
  },
  {
    slug: "zet-money",
    company: "Zet.money",
    role: "Product Strategist / CTO",
    period: "2025 — 2026",
    status: "shipped",
    axis: "web3",
    oneLiner:
      "Crypto-native OPay — a stablecoin-rails payment gateway for the Nigerian retail market.",
    metrics: [
      { label: "transaction finality", value: "<6", suffix: "s" },
      { label: "remittance overhead cut", value: "40", suffix: "%" },
      { label: "addressable users", value: "26M", suffix: "+" },
    ],
    problem:
      "Nigerian retail crypto users want utility — bill payments, virtual cards, P2P — not just speculation. Stablecoin rails are fast but disconnected from local banking (NGM).",
    approach:
      "Spearheaded the technical roadmap and product strategy for a next-gen crypto-fiat payment gateway. Engineered a high-throughput infrastructure that bridges stablecoin rails with local banking, enabling bill payments, virtual card issuance, and peer-to-peer transfers. Defined and executed the GTM playbook positioning the platform as a 'crypto-native OPay.'",
    impact:
      "Sub-6-second finality. 40% reduction in cross-border remittance overhead. Positioned for 26M+ potential retail users across Nigeria.",
    stack: ["TypeScript", "Solidity", "Node.js", "Next.js", "PostgreSQL", "GCP"],
  },
  {
    slug: "mileston",
    company: "Mileston",
    role: "Senior Software Developer",
    period: "2024 — 2025",
    status: "shipped",
    axis: "web3",
    oneLiner:
      "Enterprise-grade fullstack wallet infrastructure, shipped in 7 days, now serving 1,000+ businesses.",
    metrics: [
      { label: "businesses served", value: "1,000", suffix: "+" },
      { label: "time to v1", value: "7", suffix: " days" },
      { label: "chains supported", value: "4", suffix: "+" },
    ],
    problem:
      "Businesses need wallet infrastructure that's enterprise-grade out of the box — multi-chain, programmable, observable — without spending a year stitching primitives.",
    approach:
      "Designed and shipped a fullstack wallet platform from the ground up, supporting Base, Avalanche, Ethereum, and Solana. Modular service architecture, API-first, with an admin surface and SDK for downstream products.",
    impact:
      "1,000+ businesses now run on it. Reference architecture for what a small team can ship when the scope is ruthlessly tight.",
    stack: ["TypeScript", "Solidity", "Rust", "Node.js", "Foundry", "Hardhat", "Docker"],
  },
  {
    slug: "veridaq",
    company: "Veridaq",
    role: "Senior Software Developer · Tech Lead",
    period: "2023 — 2024",
    status: "shipped",
    axis: "ai",
    oneLiner:
      "Led product engineering — shipping AI/ML features and building the engineering culture from scratch.",
    metrics: [
      { label: "products launched", value: "3", suffix: "" },
      { label: "team scaled to", value: "8", suffix: " engineers" },
      { label: "AI features in prod", value: "5", suffix: "+" },
    ],
    problem:
      "Build an engineering org that can move fast on AI/ML while keeping production reliable and the codebase humane.",
    approach:
      "Drove the technical strategy, hired and grew a high-performing team, and shipped multiple AI-powered products. Oversaw design, implementation, and deployment of scalable services.",
    impact:
      "Engineering culture and product velocity that outlived my tenure. Foundational AI features still in production.",
    stack: ["Python", "TypeScript", "PyTorch", "Hugging Face", "PostgreSQL", "AWS"],
  },
];

export interface Experience {
  company: string;
  role: string;
  period: string;
  blurb: string;
  axis: "ai" | "web3" | "both" | "general";
}

export const experience: Experience[] = [
  {
    company: "Shakes Labs",
    role: "Founder · CEO · CTO",
    period: "2026 — Present",
    blurb: "Founded a long-term technology partnership studio — mobile, web, AI, Web3. 20+ products delivered for ventures that compound.",
    axis: "both",
  },
  {
    company: "Vouchify",
    role: "Chief Technical Officer",
    period: "2024 — 2026",
    blurb: "Architected the settlement engine + Trust-as-a-Service protocol on stablecoin rails. 100k+ tx/day, 99.99% uptime.",
    axis: "both",
  },
  {
    company: "Zet.money",
    role: "Product Strategist / CTO",
    period: "2025 — 2026",
    blurb: "Crypto-native payment gateway with sub-6s finality for the Nigerian retail market.",
    axis: "web3",
  },
  {
    company: "Mileston",
    role: "Senior Software Developer",
    period: "2024 — 2025",
    blurb: "Enterprise wallet infrastructure across Base, Avalanche, Ethereum, Solana.",
    axis: "web3",
  },
  {
    company: "Veridaq",
    role: "Senior Software Developer · Tech Lead",
    period: "2023 — 2024",
    blurb: "Led tech strategy, scaled an engineering team, shipped AI-powered products.",
    axis: "ai",
  },
  {
    company: "Ivy",
    role: "Machine Learning Engineer (Intern)",
    period: "2022 — 2023",
    blurb: "LLM orchestration, RAG eval frameworks, automated fine-tuning + deployment.",
    axis: "ai",
  },
  {
    company: "Tomiverse Technologies",
    role: "Full-Stack Developer · Educator",
    period: "2019 — 2022",
    blurb: "Shipped 15+ client apps. Mentored 400+ developers — 70% placement into junior roles.",
    axis: "general",
  },
  {
    company: "Elite Computer Technologies",
    role: "Frontend Developer",
    period: "2017 — 2019",
    blurb: "Agency frontend work — modularized legacy code, mastered modern frameworks fast.",
    axis: "general",
  },
];

export interface SkillGroup {
  group: string;
  axis: "ai" | "web3" | "platform";
  items: string[];
}

export const skills: SkillGroup[] = [
  {
    group: "Languages",
    axis: "platform",
    items: ["TypeScript", "Python", "JavaScript", "Rust", "Solidity", "Java"],
  },
  {
    group: "AI / ML",
    axis: "ai",
    items: [
      "PyTorch",
      "TensorFlow",
      "JAX",
      "Hugging Face",
      "Scikit-learn",
      "LangChain",
      "RAG",
      "NLP",
      "Computer Vision",
      "Deep Learning",
      "Pinecone",
    ],
  },
  {
    group: "Web3",
    axis: "web3",
    items: [
      "Solidity",
      "Foundry",
      "Hardhat",
      "Ethereum",
      "Base",
      "Avalanche",
      "Solana",
      "Smart Contracts",
      "DeFi",
      "Wallet Infra",
    ],
  },
  {
    group: "Full-Stack",
    axis: "platform",
    items: ["Next.js", "React", "Node.js", "Express", "NestJS", "Tailwind", "GraphQL", "REST"],
  },
  {
    group: "Cloud & Data",
    axis: "platform",
    items: [
      "AWS",
      "Azure",
      "GCP",
      "Docker",
      "Kubernetes",
      "Redis",
      "PostgreSQL",
      "MongoDB",
      "Vector DBs",
      "CI/CD",
    ],
  },
];

export interface Writing {
  slug: string;
  title: string;
  date: string;
  read: string;
  blurb: string;
  tag: "ai" | "web3" | "engineering" | "essay";
  href?: string;
}

export const writing: Writing[] = [
  {
    slug: "trust-as-a-service",
    title: "Trust-as-a-Service: the missing primitive in cross-border settlement",
    date: "2026-04",
    read: "9 min",
    blurb:
      "Why correspondent banking can't be patched, and what a decentralized trust layer looks like in production.",
    tag: "web3",
  },
  {
    slug: "speed-to-market",
    title: "How we shipped enterprise wallet infrastructure in 7 days",
    date: "2025-11",
    read: "6 min",
    blurb:
      "The scope cuts, architecture bets, and team rituals that compressed a year of work into a week.",
    tag: "engineering",
  },
  {
    slug: "llm-anomaly-detection",
    title: "LLMs as anomaly detectors: lessons from 100k tx/day",
    date: "2026-02",
    read: "11 min",
    blurb:
      "What worked, what burned tokens for nothing, and the eval harness we built to keep it honest.",
    tag: "ai",
  },
  {
    slug: "rag-eval-harness",
    title: "Building a RAG eval harness that actually catches regressions",
    date: "2025-08",
    read: "8 min",
    blurb:
      "Beyond hit-rate: how to measure the things that matter in retrieval-augmented systems.",
    tag: "ai",
  },
];

export interface NowItem {
  kind: "building" | "reading" | "thinking" | "shipping";
  label: string;
  detail?: string;
  href?: string;
}

export const now: NowItem[] = [
  {
    kind: "building",
    label: "Shakes Labs",
    detail: "Founder · CEO · CTO. Long-term technology partnership studio — mobile, web, AI, Web3. 20+ delivered, more in flight.",
    href: "https://shakeslabs.com",
  },
  {
    kind: "shipping",
    label: "Trust-as-a-Service — productized",
    detail: "Packaging the settlement-engine pattern from Vouchify into a reusable primitive that any Shakes Labs client can plug into.",
  },
  {
    kind: "thinking",
    label: "Where trust will live in 2030",
    detail: "Sovereign-grade verification layers for AI agents transacting on behalf of humans.",
  },
  {
    kind: "reading",
    label: "Information Theory, Inference, and Learning Algorithms",
    detail: "MacKay. Re-reading chapters on minimum description length.",
  },
];
