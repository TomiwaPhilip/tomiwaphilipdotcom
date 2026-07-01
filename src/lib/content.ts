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

export type WritingBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; lang?: string; code: string };

export interface Writing {
  slug: string;
  title: string;
  date: string;
  read: string;
  blurb: string;
  tag: "ai" | "web3" | "engineering" | "essay";
  href?: string;
  keywords?: string[];
  body?: WritingBlock[];
}

export const writing: Writing[] = [
  {
    slug: "trust-as-a-service",
    title: "Trust-as-a-Service: how stablecoins quietly replaced correspondent banking for African fintech",
    date: "2026-05",
    read: "10 min",
    blurb:
      "SWIFT takes three days. USDC takes fifteen seconds. But moving the money is the easy part — the hard part is trust. Here's what a decentralized settlement layer looks like in production, and why every African fintech is now building on stablecoin rails.",
    tag: "web3",
    keywords: [
      "stablecoins Africa",
      "USDC cross-border payments",
      "correspondent banking alternative",
      "stablecoin infrastructure Nigeria",
      "cross-border payments Africa",
      "remittance stablecoins",
      "on-ramp off-ramp Nigeria",
      "USDT Naira",
      "fintech Africa 2026",
      "settlement engine",
    ],
    body: [
      { type: "p", text: "In 2024, sending USD 10,000 from Lagos to Nairobi still meant a wire transfer, two correspondent banks, a compliance hold, and a settlement window measured in business days. In mid-2026, the same payment settles in under a minute over USDC on Base or Solana, with a fee under a dollar. The rails changed. The trust model did not." },
      { type: "p", text: "This piece is about the gap between those two sentences — and why every serious African fintech I've worked with in the last eighteen months has quietly rebuilt their settlement layer on stablecoins while their public messaging still says \"we partner with licensed banking providers.\"" },

      { type: "h2", text: "Why correspondent banking couldn't be patched" },
      { type: "p", text: "Correspondent banking is a network of bilateral trust: your local bank has an account at a US or EU bank, which has an account at a receiving bank, which has an account at the destination bank. Every hop is a manual reconciliation, a compliance check, and a fee. It works — sort of — for large, infrequent transfers between two well-connected jurisdictions. It falls apart for the actual pattern of modern African commerce: many small transfers, frequent, across ten currencies, with the receiver's KYC state changing weekly." },
      { type: "p", text: "The last decade of fintech tried to patch this with API abstractions on top. Flutterwave, Wise, and every remittance startup essentially became better UX for the same underlying rails. That works until de-risking hits — and de-risking has been hitting African corridors since 2015. The correspondent banks retreated. The rails degraded. The APIs got slower and more expensive to run." },
      { type: "quote", text: "The failure mode of correspondent banking isn't slowness. It's that the network can decide, unilaterally and without appeal, that your entire country is no longer eligible." },

      { type: "h2", text: "What stablecoin rails actually replaced" },
      { type: "p", text: "The stablecoin thesis for cross-border payments is now boring, which is the highest compliment you can pay a piece of infrastructure. USDC and USDT (and, increasingly, PYUSD and regulated bank-issued alternatives) do three things correspondent banking never could:" },
      { type: "ul", items: [
        "Final settlement in seconds, not days — a Solana or Base transfer confirms in under a minute and cannot be reversed by a downstream compliance decision.",
        "Programmable escrow — funds can be held, released, split, or refunded by contract logic, not by a human at a downstream bank.",
        "Currency-agnostic settlement — the receiver decides when and how to off-ramp into local currency, and can even choose to hold USD-denominated value without needing a US bank account.",
      ]},
      { type: "p", text: "For a Nigerian merchant receiving payment from a UK customer, the flow used to be: card network → UK acquirer → international scheme → Nigerian acquirer → Naira settlement (3–5 days, 4–8% total fees, chargeback risk for 180 days). The new flow is: customer pays in USDC → escrow contract holds until delivery → merchant off-ramps to Naira via a local liquidity provider (15 seconds, ~1.5% total, no chargeback surface)." },

      { type: "h2", text: "The trust primitive is still missing" },
      { type: "p", text: "Here's the part the crypto-native discourse consistently gets wrong: moving the money is the easy part. Stablecoins solved the transport layer. They did not solve the question of whether the counterparty on the other end is who they say they are, has done what they said they'd do, or has the standing to make the claim they're making." },
      { type: "p", text: "In traditional finance, that question is answered — badly, expensively, but answered — by the correspondent banking chain itself. Every hop is also a trust attestation. When you strip the hops out, you strip the attestations out with them. The stablecoin transfer settles instantly, but nobody knows if the merchant actually shipped the goods, or if the freelancer actually delivered the work, or if the invoice is legitimate." },
      { type: "p", text: "This is what we started calling Trust-as-a-Service at Vouchify, and what I'm now productising through Shakes Labs: a portable, cryptographically-verifiable layer of attestations that travels with the payment." },

      { type: "h2", text: "What Trust-as-a-Service looks like in production" },
      { type: "p", text: "The architecture is deliberately unsexy. There are four pieces:" },
      { type: "ol", items: [
        "Identity attestations — verified once, portable everywhere. A merchant KYCs with one provider; that verification becomes a signed credential the merchant controls and can present to any counterparty. No re-verification per transaction.",
        "Delivery attestations — signed receipts from oracles, logistics providers, or the customer themselves, cryptographically bound to a specific payment. This is what unlocks conditional escrow that isn't just \"buyer released the funds.\"",
        "Reputation graphs — on-chain history of completed transactions, disputes, and resolutions, scoped per counterparty so a bad actor in one context doesn't necessarily tank their standing elsewhere.",
        "Programmable dispute resolution — smart-contract escrow with clearly-defined arbitration paths, so \"the merchant disappeared\" is a solved case, not a support ticket.",
      ]},
      { type: "p", text: "None of these are novel individually. The novelty is packaging them as a single primitive that a fintech founder in Lagos, Nairobi, or Accra can drop into their product in a week — rather than spending a year building it from scratch." },

      { type: "h2", text: "What this means for African fintech in 2026" },
      { type: "p", text: "Three concrete shifts:" },
      { type: "ul", items: [
        "New fintechs will not build on correspondent banking. It's not that they've decided against it — it's that the unit economics don't work and the reliability isn't there. Stablecoin-first is now the default architecture, with fiat rails treated as an off-ramp integration.",
        "The moat moves up the stack. If everyone has access to sub-second, sub-dollar cross-border settlement, the differentiator is the trust layer on top: how quickly can you verify the counterparty, how portable is that verification, how fair is your dispute resolution.",
        "Regulatory clarity accelerates, not slows, adoption. The 2025 stablecoin regulations in the EU, US, and now Nigeria don't threaten the model — they legitimise it. Banks are integrating, not resisting.",
      ]},

      { type: "h2", text: "The uncomfortable part" },
      { type: "p", text: "The uncomfortable part, if you work in traditional banking, is that this is not a story where the incumbents catch up. Correspondent banking is not going to be modernised. It's going to be routed around. The banks that survive the transition are the ones who accept that their role is off-ramp liquidity and local-currency custody — high-margin, low-volume utility roles — not settlement primary." },
      { type: "p", text: "If you're building in African fintech and you haven't yet rewritten your settlement layer around stablecoins with a portable trust primitive on top, you're operating on infrastructure that is quietly being deprecated around you." },
      { type: "p", text: "If you want to talk about how this looks in your specific product, that's what Shakes Labs exists for. Get in touch." },
    ],
  },
  {
    slug: "speed-to-market",
    title: "How we shipped enterprise wallet infrastructure in 7 days (with 3 people and AI agents)",
    date: "2026-06",
    read: "8 min",
    blurb:
      "The scope cuts, architecture bets, AI-agent workflow, and team rituals that compressed a year of work into a week. A field report on shipping an MVP with Claude Code, Cursor, and one very brave client.",
    tag: "engineering",
    keywords: [
      "MVP development",
      "how to ship an MVP fast",
      "AI-augmented development",
      "Claude Code workflow",
      "Cursor for teams",
      "vibe coding production",
      "small team engineering",
      "startup engineering velocity",
      "AI pair programming",
      "MVP in one week",
    ],
    body: [
      { type: "p", text: "Late 2025, a client came to us needing enterprise wallet infrastructure — custody, multi-sig approvals, treasury reporting, the works — for a product launch that was already announced. The original vendor had dropped out. The launch was in eight days. They asked if it was possible." },
      { type: "p", text: "We shipped in seven. Team of three. This is exactly how, including the parts that were embarrassing and the parts I'd only do again if the client understood the trade." },

      { type: "h2", text: "The 7-day constraint" },
      { type: "p", text: "The scope, as originally quoted by the departed vendor, was ten weeks. Team of six. What we agreed to deliver in seven days:" },
      { type: "ul", items: [
        "Custody wallets (hot + warm, no cold storage in v1)",
        "Multi-signature approval flow with role-based policy",
        "Treasury dashboard: balance, transaction history, export",
        "Webhook integration with the client's existing back-office",
        "Basic reconciliation reports",
      ]},
      { type: "p", text: "What we cut and deferred to v2:" },
      { type: "ul", items: [
        "Cold storage integration (delivered week 3, off the critical path)",
        "Custom RBAC beyond three roles (client accepted three roles for launch)",
        "The reporting suite with configurable dashboards (they got CSV export instead)",
        "Every branded UI polish item that wasn't blocking usability",
      ]},

      { type: "h2", text: "Team composition" },
      { type: "p", text: "Three people, each with a very defined lane:" },
      { type: "ul", items: [
        "One senior full-stack (me) — architecture, integration boundaries, unblocking",
        "One backend specialist — smart contracts, custody logic, the parts where getting it wrong costs real money",
        "One frontend + product engineer — dashboard, approval UX, the client-facing polish",
      ]},
      { type: "p", text: "No PM. No designer. No QA function. The client had a technical founder who acted as product owner in a shared Slack. The reason a team of three worked is not that we're superhuman — it's that we had zero coordination overhead. Every decision had one owner. Every disagreement was resolved in the shared channel within an hour or escalated to me." },

      { type: "h2", text: "The AI-agent workflow (this is the part that changed everything)" },
      { type: "p", text: "This project is the reason I now believe the \"single senior engineer + AI agents\" pattern is a structurally different mode of software delivery, not a marginal productivity boost. Concretely:" },
      { type: "ul", items: [
        "Claude Code ran as a background agent on scaffolding, boilerplate, tests, and refactors. Every morning I'd queue up 10–15 well-scoped tasks; by lunchtime most were done and reviewed.",
        "Cursor was the primary editor for anything requiring active human judgement — smart contract logic, custody flows, policy engine. Chat + inline suggestions, no full agent mode.",
        "GitHub Copilot handled the last-mile completions in files we'd already touched.",
        "For architecture decisions, we used Claude in a Projects context loaded with our design docs, and treated it as a fourth voice in every design review.",
      ]},
      { type: "p", text: "The workflow that worked was aggressive scoping into small, verifiable units. \"Add a policy engine\" is a bad task. \"Add a policy engine that evaluates the following four rules against a transaction and returns approve/reject/escalate, with these five unit tests\" is a great task. Well-scoped tasks with clear acceptance criteria are what turns AI-augmented development from marketing copy into actual throughput." },

      { type: "h2", text: "Architecture bets that paid off" },
      { type: "p", text: "Three bets we made on day one that we'd have questioned if we had more time:" },
      { type: "ol", items: [
        "Boring stack. Postgres, TypeScript, Next.js, one Solidity contract, viem for chain interaction. Nothing where we'd hit a bug that couldn't be Googled or Claude'd in five minutes.",
        "Event-sourced ledger, no live balance table. Every transaction wrote an event; balances were derived. Simpler code, and it made reconciliation trivial — the reconciliation report was literally a SQL query over the events.",
        "Multi-sig as policy-first, not signature-first. We didn't build a generic multi-sig contract; we built a policy engine off-chain that decided when a transaction needed multiple signatures, then requested them. Much easier to change policy than to redeploy contracts.",
      ]},

      { type: "h2", text: "Rituals" },
      { type: "p", text: "The rituals were minimal but non-negotiable:" },
      { type: "ul", items: [
        "10-minute daily kickoff at 9am. One sentence: what am I shipping today, what's blocking me.",
        "Live demo to the client at 6pm every day. This is the single most important ritual. If it doesn't demo, it's not shipped.",
        "End-of-day merge to main. No long-lived branches. Everything went behind a feature flag if it wasn't ready to be seen.",
        "Weekend was a real weekend. We shipped Sunday night for the Monday launch; nobody worked Saturday. Burnout was not a productivity gain we could afford.",
      ]},

      { type: "h2", text: "What went wrong" },
      { type: "p", text: "Two things went wrong that are worth being honest about." },
      { type: "p", text: "First, we shipped a subtle bug in the approval policy on day 5 that would have let a single admin approve their own transaction under a specific edge case. Caught in the day-6 client demo. Fixed in an hour. It shipped because I had reviewed the PR at 11pm and skimmed. Lesson: no PR reviews after 10pm, ever." },
      { type: "p", text: "Second, we underestimated the ops work. The code was ready by end of day 6. Getting it into the client's production environment — VPN access, secrets management, their existing observability stack — took most of day 7. If I did this again I would allocate a full day to \"landing\" from the start." },

      { type: "h2", text: "When you should do this" },
      { type: "p", text: "Not always. Compressing a year of work into a week has real costs:" },
      { type: "ul", items: [
        "The client has to accept a stripped scope and trust you on cuts. If they don't, you'll re-litigate every deferred item and lose the week.",
        "The team has to be genuinely senior. This is not a mode where you can bring junior engineers along; there's no time to teach.",
        "You need to be willing to ship boring. Anything ambitious is an on-fire risk when the timeline is measured in days.",
      ]},
      { type: "p", text: "But when it fits, it's the highest-leverage mode of engineering I've ever worked in. The client got their product launched on time. We got a case study, a long-term retainer, and a template we've now used on four other engagements. And every time, the AI-agent workflow makes it a little more possible for a team of three to do what used to require a team of ten." },
    ],
  },
  {
    slug: "llm-anomaly-detection",
    title: "LLMs as anomaly detectors: catching fraud at 100k tx/day with AI agents in production",
    date: "2026-03",
    read: "12 min",
    blurb:
      "What worked, what burned tokens for nothing, and the eval harness we built to keep it honest. A field report on running LLM-based anomaly detection at real fintech scale — with real cost numbers, real failure modes, and the agent architecture that finally shipped.",
    tag: "ai",
    keywords: [
      "AI fraud detection",
      "LLM anomaly detection",
      "agentic AI production",
      "AI agents fintech",
      "LLM in production",
      "transaction monitoring AI",
      "LLM cost optimization",
      "AI observability",
      "LLM eval framework",
      "structured outputs LLM",
    ],
    body: [
      { type: "p", text: "For most of 2024, if you asked me whether LLMs had a role in real-time fraud detection at scale, I would have said no. Latency was wrong, cost per inference was wrong, hallucination rate was wrong. In 2025 we tried anyway. In 2026 it's a core part of our fraud stack, catching things our classical models miss and doing it cheaply enough to run on every transaction. This is what changed my mind, and what I'd tell anyone thinking about doing the same." },

      { type: "h2", text: "Why classical ML wasn't enough" },
      { type: "p", text: "Our baseline was a well-tuned gradient-boosted model on ~150 hand-engineered features. It caught the obvious patterns — velocity anomalies, geo-mismatches, known-bad device fingerprints — with reasonable precision. It failed at three specific things:" },
      { type: "ul", items: [
        "Narrative fraud — where the transactions were individually normal but the sequence, in the context of the account's history, told a story a human would immediately recognise as fraud.",
        "Novel patterns — anything a fraudster invented after our last training run was invisible to us for weeks.",
        "Contextual thin-signal — small accounts where we didn't have enough behavioural history to make the ML confident, but where a plain-English summary of the account state would trip any human analyst's instincts.",
      ]},
      { type: "p", text: "These are exactly the failure modes where LLMs, in theory, should shine. The theory turned out to be right. The engineering was harder than the theory." },

      { type: "h2", text: "The agent architecture we shipped" },
      { type: "p", text: "The naive version — send every transaction to GPT-4 or Claude with a big prompt, get back a fraud score — does not work. It's too slow, too expensive, and the models are terrible at outputting well-calibrated numerical scores. What works is a routed architecture with specialist agents:" },
      { type: "ol", items: [
        "Router (small, cheap model). Every transaction hits a fast Haiku-class router that decides whether the LLM stack sees it at all. Roughly 5% of traffic passes this gate; the rest goes straight to the ML model. This alone drops cost by 95%.",
        "Context assembler (deterministic code, not LLM). Given a transaction that passes the gate, this pulls the account history, recent related transactions, device state, and known risk signals into a structured summary. This is not an agent — it's a boring SQL + serialisation function. Getting this right is where most of the engineering work lives.",
        "Specialist agents (mid-tier model, structured output). Depending on the router's classification, one of three specialist agents runs: account-takeover, merchant-collusion, or synthetic-identity. Each is a dedicated prompt with dedicated eval data.",
        "Adjudicator (larger model, only when disagreement). If two specialists disagree, or if the specialist disagrees with the classical model with high confidence, an adjudicator agent gets both perspectives and outputs a final decision with reasoning. This runs on ~0.3% of traffic.",
      ]},
      { type: "p", text: "The point of this shape is that most transactions are cheap, only the ambiguous ones get expensive scrutiny, and every decision has a paper trail." },

      { type: "h2", text: "What burned tokens for nothing" },
      { type: "p", text: "The mistakes were expensive and instructive:" },
      { type: "ul", items: [
        "Chain-of-thought without token limits. Early on, the specialist agents were allowed to \"think\" freely before answering. Some transactions cost 40x the median. We capped reasoning at 500 tokens and quality did not measurably drop.",
        "Free-form output. We started with \"explain your reasoning and give a score.\" Parsing the score reliably was a permanent bug source. Switching to structured outputs (JSON schema with an enum for decision, a bounded float for confidence, and a bounded text for rationale) killed an entire class of failures.",
        "Sending the raw ledger. The context assembler initially dumped 5,000 tokens of transaction history. Most of it was noise. Summarising the last 30 days into a 300-token narrative — deterministically, with code, not an LLM call — cut cost and improved accuracy.",
        "Retries on \"I don't know.\" Not retrying is the right answer. \"I don't know\" is signal; escalate to the adjudicator.",
      ]},

      { type: "h2", text: "The eval harness" },
      { type: "p", text: "The single thing that made this system safe to ship was an eval harness we ran on every prompt change, model change, and quarterly baseline. The core loop:" },
      { type: "ul", items: [
        "A golden set of ~4,000 transactions with human-labelled ground truth, curated over months and continuously updated.",
        "Automated metrics: precision, recall, false-positive rate at fixed thresholds, cost per detected fraud dollar, latency p50/p95/p99.",
        "Regression gates: any prompt change that drops recall by more than 2% or increases cost per detection by more than 15% blocks the deploy automatically.",
        "Shadow mode for every change: two weeks running in parallel with the old version before promotion, with per-decision comparison logged.",
      ]},
      { type: "p", text: "This is boring MLOps applied to LLM prompts. It is also the difference between an LLM system you can operate and an LLM system that operates you." },

      { type: "h2", text: "Real cost numbers" },
      { type: "p", text: "At 100k transactions per day, our LLM stack costs approximately $180/day in inference. Compared to the fraud dollars it catches that our classical model missed — averaging around $22,000/day — this is not a close call. Two things made the economics work:" },
      { type: "ul", items: [
        "The router keeps 95% of traffic out of the LLM path entirely.",
        "Model pricing dropped ~4x between mid-2024 and mid-2026. What was uneconomic 18 months ago is now boring infrastructure.",
      ]},

      { type: "h2", text: "Lessons for anyone building this" },
      { type: "ol", items: [
        "Route aggressively. Do not send every request to a big model. Cheap gates in front of expensive models are how you make the economics work.",
        "Deterministic context assembly beats agentic context gathering. The temptation to have the agent \"figure out what data it needs\" is huge and expensive. Resist it. Give the agent the same 15 well-chosen fields every time.",
        "Structured outputs are non-negotiable. If your production system depends on parsing free-form model output, you have a latent bug waiting to break at scale.",
        "Eval before you ship, always. If you don't have an eval harness that gates deploys, you don't have a production LLM system — you have a proof of concept running in prod.",
        "Cost per outcome, not cost per token. \"$180/day sounds expensive\" is meaningless without \"and it catches $22k/day of fraud.\" Frame the ROI in the units the business cares about.",
      ]},
      { type: "p", text: "The bigger point is that LLMs in production aren't magic — they're a new component in the same engineering discipline you already do. Ship boring architectures, measure everything, and stop believing the demos." },
    ],
  },
  {
    slug: "rag-eval-harness",
    title: "Building a RAG eval harness that catches regressions before your users do (2026 update)",
    date: "2026-06",
    read: "10 min",
    blurb:
      "Hit-rate lies. Recall@k lies harder. Here's how we measure the things that actually matter in retrieval-augmented systems — faithfulness, coverage, freshness — and why the arrival of agentic retrieval and MCP made the eval problem harder, not easier.",
    tag: "ai",
    keywords: [
      "RAG evaluation",
      "RAG in production 2026",
      "RAGAS",
      "LLM eval framework",
      "retrieval evaluation",
      "LLM regression testing",
      "LlamaIndex eval",
      "LangChain eval",
      "MCP retrieval",
      "agentic RAG",
      "faithfulness metric",
      "RAG golden set",
    ],
    body: [
      { type: "p", text: "Every team I've worked with that ships a RAG system in production eventually has the same conversation. The retrieval metrics look great — hit-rate is 89%, recall@5 is 94%, the offline eval smiles at you — and then a user asks a question that should be trivial, and the system confidently gives back an answer stitched together from three unrelated documents. What went wrong? Nothing your eval was measuring." },
      { type: "p", text: "This is a piece about how we build eval harnesses for RAG systems that actually catch the regressions users care about. It's grown a lot in 2026 as agentic retrieval and MCP have moved from experiment to default — so consider this the current-year update to the argument, not a static best-practice list." },

      { type: "h2", text: "Why hit-rate lies" },
      { type: "p", text: "Hit-rate — did we retrieve at least one relevant document in the top-k — is the metric everyone starts with because it's easy to compute and looks like recall. It is a comforting lie. The system can hit every relevant document and still produce a wrong answer, because:" },
      { type: "ul", items: [
        "The relevant document was ranked 5th, and the generator over-weighted the noisier documents at ranks 1–4.",
        "The relevant document was retrieved but was contradicted by a stale, more prominently-cited document also in the context.",
        "The relevant document was there but the LLM ignored it in favour of its parametric memory.",
        "The query was ambiguous and \"relevant\" was defined too loosely in your golden set.",
      ]},
      { type: "p", text: "Hit-rate optimises retrieval as if the generator is a passive component. It is not." },

      { type: "h2", text: "The regression that shipped and taught us this" },
      { type: "p", text: "In mid-2025 we shipped a documentation assistant for an enterprise client. Retrieval quality by every offline metric was better than the previous version. Support tickets went up 30% in the first week. On investigation, the new embedding model was pulling in more \"loosely relevant\" chunks — architecturally related but factually stale — and the generator was faithfully synthesising them into confident wrong answers. Our hit-rate was up. Our faithfulness was down. Our eval didn't measure faithfulness." },
      { type: "p", text: "That was the last time I trusted a retrieval-only evaluation." },

      { type: "h2", text: "The four dimensions that matter" },
      { type: "p", text: "We now score every RAG deploy on four independent dimensions, each with its own golden set and its own regression gate:" },
      { type: "ol", items: [
        "Retrieval quality — did the right documents make it into context? Measured via recall@k and mean reciprocal rank against a curated golden set, per query type.",
        "Faithfulness — is the generated answer supported by the retrieved documents, or did the model invent, extrapolate, or contradict? Scored by a stronger LLM judge with explicit rubric, or by span-alignment when we can afford it.",
        "Coverage — did the answer address the full question, or only the parts the retrieval surfaced? Especially important for multi-hop queries.",
        "Freshness — for time-sensitive queries, is the answer citing current information or 18-month-old cached snapshots? This one blows up in production the fastest.",
      ]},
      { type: "p", text: "Each dimension can regress independently. A retrieval improvement can drop faithfulness. A prompt change can improve coverage but hurt freshness. If you only track one metric, you'll ship one of these regressions eventually." },

      { type: "h2", text: "Golden set construction, in practice" },
      { type: "p", text: "The single highest-leverage investment in a RAG eval is the golden set. Everything else is downstream of it. What has worked for us:" },
      { type: "ul", items: [
        "Start from real user queries, not synthetic ones. Synthetic queries have a distinctive shape that lets your system cheat.",
        "Stratify by intent — factual lookup, reasoning, multi-hop, comparative, temporal. Report per-stratum, not just aggregate. Aggregate hides which slice is regressing.",
        "Include known-hard cases — the queries that broke you in the past. This is your regression suite. It only grows.",
        "Have a real human label the ground truth. LLM-generated labels are fine for scaling, but the seed set should be human-authored or your judges will be measuring their own biases.",
        "Refresh 10% of the set quarterly. Users' questions change. If your golden set is frozen from Q1 2025 and it's now Q3 2026, your eval is measuring irrelevant behaviour.",
      ]},

      { type: "h2", text: "Automated in CI, not as a Jupyter ritual" },
      { type: "p", text: "The eval is a gate on the deploy pipeline, not a notebook run when someone remembers. Concretely:" },
      { type: "ul", items: [
        "Every PR that touches prompts, retrieval config, or model versions runs a subset (~200 queries) of the golden set against the current and proposed configs. Report a diff.",
        "Every merge to main runs the full golden set (~3,000 queries) and blocks deploy if any dimension regresses beyond the gate.",
        "Weekly, we run a larger shadow eval against production traffic samples, to catch drift the golden set misses.",
        "Every gate failure files a ticket with the specific query, the specific regression, and both answers side by side. The person who caused the regression fixes it or the change is reverted. No exceptions.",
      ]},

      { type: "h2", text: "The 2026 wrinkle: agentic retrieval and MCP" },
      { type: "p", text: "Through 2025, RAG was a single-step pipeline: query → embed → retrieve → generate. Evaluation was tractable because the shape was fixed. In 2026, the norm is agentic retrieval — the agent decides what to retrieve, from which source, when to re-query, when to stop — and the arrival of MCP has made \"which source\" mean \"any tool the agent has access to.\" This is much more powerful. It is also much harder to evaluate." },
      { type: "p", text: "The eval framework has to expand to cover:" },
      { type: "ul", items: [
        "Tool-selection accuracy — did the agent pick the right MCP tool for the query, or did it query the CRM when it should have queried the docs?",
        "Retrieval trajectory efficiency — how many tool calls did it take to get to the answer? Regressions here show up as latency and cost blowups before they show up as quality issues.",
        "Cross-tool consistency — when two tools return conflicting information, does the agent resolve it or does it silently pick one?",
        "Stop-condition correctness — did the agent stop retrieving when it had enough, or did it over-retrieve (expensive) or under-retrieve (wrong answer)?",
      ]},
      { type: "p", text: "We do this by logging every tool call in the trajectory and evaluating the trajectory as a whole, not just the final answer. It's more work. It's also the only way to catch the class of bugs where the answer is right but the path was expensive, or the answer is wrong but individual retrieval steps looked fine." },

      { type: "h2", text: "The dashboard we wish existed" },
      { type: "p", text: "There's an obvious product opportunity here — a RAG eval platform that treats faithfulness, coverage, freshness, and trajectory as first-class dimensions and integrates cleanly into CI. RAGAS, LangSmith, Braintrust, and the newer entrants are all moving in this direction but none of them is complete. If you're building in this space, ping me — happy to compare notes." },

      { type: "h2", text: "The short version" },
      { type: "p", text: "If you take one thing from this: an eval harness is not a nice-to-have you add after your RAG system is in production. It is the mechanism that makes the RAG system safe to change. Without it, every improvement is a coin flip. With it, you can move fast because you know when you've broken something." },
      { type: "p", text: "The teams that ship reliably in this space are not the ones with the fanciest retrieval — they're the ones with the tightest feedback loop between change and measurement. Build the loop first. The system quality follows." },
    ],
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
