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
  cta: string;
};

export const services: ServiceOffer[] = [
  {
    id: "ai-workflow-sprint",
    title: "AI Workflow Sprint",
    oneLiner: "Map one high-value workflow, design the agentic process and ship a working prototype.",
    bestFor: "Teams with repetitive research, support, admin, CRM or reporting tasks.",
    deliverables: ["workflow audit", "agent map", "prototype", "integration plan"],
    timeline: "1–2 weeks",
    cta: "Start a workflow sprint",
  },
  {
    id: "ai-assistant-build",
    title: "AI Assistant Build",
    oneLiner:
      "Design and build a custom assistant for support, sales, internal knowledge or document workflows.",
    bestFor: "Teams that want AI embedded in real operations, not just a chatbot demo.",
    deliverables: [
      "assistant scope",
      "prompt/workflow design",
      "knowledge base connection",
      "human handoff logic",
    ],
    timeline: "2–4 weeks",
    cta: "Build an assistant",
  },
  {
    id: "growth-system-audit",
    title: "Growth System Audit",
    oneLiner:
      "Review acquisition, tracking, funnel performance and attribution to find waste and quick wins.",
    bestFor: "Teams spending on paid acquisition without clear visibility.",
    deliverables: [
      "tracking review",
      "CAC/ROAS analysis",
      "experiment backlog",
      "dashboard recommendations",
    ],
    timeline: "5–10 working days",
    cta: "Request a growth audit",
  },
  {
    id: "product-mvp-build",
    title: "Product / MVP Build",
    oneLiner:
      "Turn a business process or product idea into a usable web app, dashboard or internal tool.",
    bestFor: "Founders, operators and teams that need a fast, practical product build.",
    deliverables: ["product scope", "UX flow", "MVP build", "deployment plan"],
    timeline: "3–6 weeks",
    cta: "Discuss a product build",
  },
];

export function getService(id?: string) {
  return services.find((service) => service.id === id) ?? services[0];
}
