export type ServiceId =
  | "ai-workflow-sprint"
  | "ai-assistant-build"
  | "growth-system-audit"
  | "product-mvp-build";

export type ServiceOffer = {
  id: ServiceId;
  title: string;
  oneLiner: string;
  bestFor: string;
  deliverables: string[];
  timeline: string;
  // Mid-market, value-based ranges (not lowest). Exact price scoped on a call.
  priceRange: string;
  cta: string;
};

export const services: ServiceOffer[] = [
  {
    id: "ai-workflow-sprint",
    title: "AI Workflow Sprint",
    oneLiner: "Pick one time-draining workflow and walk away with a working AI prototype that does it for you.",
    bestFor: "Small teams drowning in repetitive research, support, admin, CRM or reporting work.",
    deliverables: ["workflow audit", "agent map", "working prototype", "integration plan"],
    timeline: "1–2 weeks",
    priceRange: "€1,500–€4,000",
    cta: "Start a workflow sprint",
  },
  {
    id: "ai-assistant-build",
    title: "AI Assistant Build",
    oneLiner:
      "A custom AI assistant for support, sales or internal knowledge — embedded in the tools your team already uses.",
    bestFor: "Businesses that want AI doing real work in their operations, not just a chatbot demo.",
    deliverables: [
      "assistant scope",
      "prompt/workflow design",
      "knowledge base connection",
      "human handoff logic",
    ],
    timeline: "2–4 weeks",
    priceRange: "€4,000–€12,000",
    cta: "Build an assistant",
  },
  {
    id: "growth-system-audit",
    title: "Growth System Audit",
    oneLiner:
      "Find where your ad spend and funnel leak money — and the fastest experiments to fix it.",
    bestFor: "Teams spending on paid acquisition without clear visibility into what works.",
    deliverables: [
      "tracking review",
      "CAC/ROAS analysis",
      "experiment backlog",
      "dashboard recommendations",
    ],
    timeline: "5–10 working days",
    priceRange: "€1,500–€5,000",
    cta: "Request a growth audit",
  },
  {
    id: "product-mvp-build",
    title: "Product / MVP Build",
    oneLiner:
      "Turn a manual process or product idea into a usable web app, dashboard or internal tool.",
    bestFor: "Founders and operators who need a fast, practical build — not a six-month project.",
    deliverables: ["product scope", "UX flow", "MVP build", "deployment plan"],
    timeline: "3–6 weeks",
    priceRange: "€6,000–€20,000",
    cta: "Discuss a product build",
  },
];

export function getService(id?: string) {
  return services.find((service) => service.id === id) ?? services[0];
}
