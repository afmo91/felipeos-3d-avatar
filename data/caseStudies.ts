export type CaseStudyId =
  | "paid-media-operating-layer"
  | "b2b-lead-crm-automation"
  | "ai-support-assistant"
  | "ai-admin-document-assistant"
  | "product-website-cms-conversion"
  | "growth-audit-experimentation-system";

export type CaseStudy = {
  id: CaseStudyId;
  title: string;
  problem: string;
  systemBuilt: string;
  commercialValue: string;
  capabilities: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "paid-media-operating-layer",
    title: "AI Paid Media Operating Layer",
    problem:
      "Paid teams work across disconnected platforms, inconsistent data and manual optimization routines.",
    systemBuilt:
      "A unified operating layer with cross-channel dashboards, workflow actions, AI recommendations and lifecycle metrics.",
    commercialValue:
      "Helps teams monitor performance, identify budget opportunities and reduce manual campaign work.",
    capabilities: [
      "Multi-channel API integrations",
      "Paid media strategy",
      "AI recommendations",
      "Dashboard design",
      "Lifecycle instrumentation",
    ],
  },
  {
    id: "b2b-lead-crm-automation",
    title: "B2B Lead Generation & CRM Automation",
    problem:
      "B2B teams lose leads between websites, WhatsApp, spreadsheets, CRM and manual follow-up.",
    systemBuilt:
      "A workflow connecting acquisition pages, qualification logic, CRM updates, follow-up sequences and pipeline tracking.",
    commercialValue: "Reduces manual coordination and improves pipeline visibility.",
    capabilities: [
      "Lead capture",
      "CRM automation",
      "Outreach workflows",
      "WhatsApp/email routing",
      "Pipeline tracking",
    ],
  },
  {
    id: "ai-support-assistant",
    title: "AI Support Assistant",
    problem: "Support teams spend too much time on repetitive questions and manual classification.",
    systemBuilt:
      "An AI assistant concept that classifies requests, drafts answers, retrieves knowledge and escalates edge cases.",
    commercialValue: "Reduces repetitive workload while keeping humans in control.",
    capabilities: [
      "Knowledge retrieval",
      "Ticket classification",
      "Drafted responses",
      "Human handoff",
      "Support analytics",
    ],
  },
  {
    id: "ai-admin-document-assistant",
    title: "AI Admin & Document Assistant",
    problem:
      "Users struggle to know which document is needed, what information is missing and how to format requests.",
    systemBuilt:
      "A guided assistant with checklists, profile context, document previews and generated drafts.",
    commercialValue: "Turns confusing admin processes into structured workflows.",
    capabilities: [
      "AI chat assistant",
      "Document generation",
      "Checklist logic",
      "User context",
      "Web/mobile concept",
    ],
  },
  {
    id: "product-website-cms-conversion",
    title: "Product Website + CMS + Conversion System",
    problem:
      "Many business websites fail to explain the offer, capture demand or route leads correctly.",
    systemBuilt:
      "A modern website with CMS structure, product/service taxonomy, conversion paths, tracking and lead capture.",
    commercialValue: "Improves clarity, lead quality and content autonomy.",
    capabilities: [
      "Next.js websites",
      "CMS/admin tools",
      "Product taxonomy",
      "Conversion UX",
      "Tracking and analytics",
    ],
  },
  {
    id: "growth-audit-experimentation-system",
    title: "Growth Audit & Experimentation System",
    problem:
      "Growth teams often spend without clear attribution, consistent tests or reliable funnel visibility.",
    systemBuilt:
      "A diagnostic framework for acquisition, landing pages, tracking, attribution and experiment prioritization.",
    commercialValue:
      "Helps teams reduce wasted spend and identify high-leverage growth opportunities.",
    capabilities: [
      "Paid ads audit",
      "Attribution modeling",
      "Funnel analytics",
      "Experiment design",
      "CAC/ROAS optimization",
    ],
  },
];

export function getCaseStudy(id?: string) {
  return caseStudies.find((caseStudy) => caseStudy.id === id) ?? caseStudies[0];
}
