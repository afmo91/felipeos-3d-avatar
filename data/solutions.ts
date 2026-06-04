// Concrete, productized things clients can buy. Distinct from `services` (the
// engagement model) — these answer "what exactly can you build for me?".
// Ranges are mid-market and value-based (researched, not lowest). Final price
// is scoped on a call.

export type Solution = {
  id: string;
  title: string;
  blurb: string;
  tech: string[];
  priceRange: string;
};

export const solutions: Solution[] = [
  {
    id: "ai-assistant",
    title: "Custom AI Assistant",
    blurb:
      "A branded assistant trained on your docs and tools, embedded where your team and customers already work — web, Slack or WhatsApp.",
    tech: ["RAG", "APIs", "Claude / OpenAI"],
    priceRange: "€4,000–€12,000",
  },
  {
    id: "support-sav-agent",
    title: "Customer Support (SAV) Agent",
    blurb:
      "Deflects repetitive tickets, drafts accurate replies, classifies and routes requests, and escalates the hard cases to a human.",
    tech: ["RAG", "Ticket classification", "Human handoff"],
    priceRange: "€3,500–€10,000",
  },
  {
    id: "prospecting-agent",
    title: "B2B Prospecting Agent",
    blurb:
      "Finds and qualifies leads, enriches their data, drafts personalized outreach and books meetings straight into your CRM.",
    tech: ["Web scraping", "CRM integration", "Outreach drafting"],
    priceRange: "€3,500–€9,000",
  },
  {
    id: "openclaw-runtime",
    title: "OpenCLAW Agent Runtime",
    blurb:
      "Set up and configure an autonomous agent runtime so agents can safely run multi-step tasks against your tools — with guardrails and human approval.",
    tech: ["Agent orchestration", "Tool use", "Guardrails"],
    priceRange: "€2,500–€8,000",
  },
  {
    id: "rag-knowledge-base",
    title: "RAG Knowledge Base",
    blurb:
      "Turn your documents, wikis and past tickets into an instant, cited answer engine for staff or customers.",
    tech: ["Vector DB", "Embeddings", "Citations"],
    priceRange: "€4,000–€15,000",
  },
  {
    id: "workflow-automation",
    title: "Workflow Automation",
    blurb:
      "Connect the apps you already use and let AI handle the repetitive steps — intake, classification, data entry and reporting.",
    tech: ["APIs", "Webhooks", "n8n / Make"],
    priceRange: "€1,500–€6,000",
  },
  {
    id: "voice-agent",
    title: "AI Voice Agent (Callbot)",
    blurb:
      "A GDPR-compliant voice agent that answers and makes calls, qualifies, books appointments and routes to a human when needed.",
    tech: ["Voice / telephony", "Call routing", "Booking integration"],
    priceRange: "€4,000–€15,000",
  },
];

// Maps a homepage solution to its dedicated landing page (English by default).
export function landingPathForSolution(id: string, locale: "en" | "fr" = "en") {
  return `/lp/${locale}/${id}`;
}

// Technical capabilities — credibility + SEO. Grouped for a compact chip strip.
export type CapabilityGroup = {
  label: string;
  items: string[];
};

export const capabilityGroups: CapabilityGroup[] = [
  {
    label: "Models & techniques",
    items: ["RAG (retrieval-augmented generation)", "Fine-tuning", "Prompt engineering", "Evals & guardrails", "Multi-step reasoning"],
  },
  {
    label: "Agents & orchestration",
    items: ["Agent orchestration", "Multi-agent systems", "OpenCLAW runtime", "Tool use", "MCP (Model Context Protocol)"],
  },
  {
    label: "Integration & data",
    items: ["REST / GraphQL APIs", "Webhooks", "Vector databases & embeddings", "CRM / ERP integration", "WhatsApp & email"],
  },
  {
    label: "Models & stack",
    items: ["Anthropic Claude", "OpenAI", "Open-source LLMs (Llama, Mistral)", "Next.js / Vercel", "AWS (S3, Glue, Athena)", "Supabase"],
  },
];
