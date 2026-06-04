export type CaseStudyId =
  | "growth-audit-experimentation-system"
  | "paid-media-operating-layer"
  | "b2b-lead-crm-automation"
  | "ai-support-assistant";

export type CaseStudy = {
  id: CaseStudyId;
  title: string;
  // Anonymized client descriptor, e.g. "B2B SaaS, ~40 staff". Keeps proof concrete without exposing data.
  client: string;
  problem: string;
  systemBuilt: string;
  // Concrete before -> after outcome.
  result: string;
  commercialValue: string;
  capabilities: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    id: "growth-audit-experimentation-system",
    title: "AI-Assisted Acquisition Optimization",
    client: "Telecom operator, Spain",
    problem:
      "High acquisition volume and complex paid-media spend, with pressure to cut wasted budget while improving digital sales performance.",
    systemBuilt:
      "A data-driven acquisition system combining cross-channel performance analysis, automated reporting, budget monitoring, conversion optimization and structured decision workflows.",
    result:
      "Managed €3M+ annual media budget · CAC down ~30% · conversion up ~25% · ~€200K recovered from inefficient spend · digital sales grew from 0% to ~30% of total.",
    commercialValue:
      "Less wasted ad spend and a measurable shift of revenue into digital channels.",
    capabilities: [
      "Paid media analysis",
      "Automated reporting",
      "Budget monitoring",
      "Conversion optimization",
      "Decision workflows",
    ],
  },
  {
    id: "paid-media-operating-layer",
    title: "AI Recommendation System for Paid Ads",
    client: "Paid-ads SaaS (0→1 product)",
    problem:
      "Ads managers spend hours in dashboards to spot performance issues, compare campaigns across platforms and decide what to do next.",
    systemBuilt:
      "An AI-powered SaaS built from zero: Google Ads + Meta Ads integrations, a cross-platform campaign dashboard, an AI recommendation layer, a campaign editor and scalable data storage (S3, Glue, Athena).",
    result:
      "Shipped from 0 to working product — Google + Meta data unified, cross-platform dashboard, AI recommendation layer and pricing tiers from free to enterprise.",
    commercialValue:
      "Marketers find optimization opportunities in minutes instead of hours across platforms.",
    capabilities: [
      "Google/Meta Ads integrations",
      "Cross-platform dashboard",
      "AI recommendations",
      "Campaign editor",
      "S3 / Glue / Athena storage",
    ],
  },
  {
    id: "b2b-lead-crm-automation",
    title: "AI-Powered Sales CRM Foundation",
    client: "B2B industrial manufacturer",
    problem:
      "Sales activity was fragmented across website requests, WhatsApp conversations, manual follow-ups and offline commercial processes.",
    systemBuilt:
      "A structured CRM for companies, contacts, activities, tasks and campaigns — connecting website leads and WhatsApp-first flows, with AI recommendation, lead-scoring, message-draft and approval-queue foundations.",
    result:
      "Website leads connected to CRM records, AI draft-approval queue in place, and the offer reorganized into 8 product lines, 3 industries and 6 solution categories — a scalable base for AI-assisted B2B prospecting.",
    commercialValue:
      "One scalable workspace for prospecting and follow-up instead of scattered tools.",
    capabilities: [
      "CRM structure",
      "Lead capture",
      "AI message drafts",
      "Lead prioritization",
      "Prospecting workspace",
    ],
  },
  {
    id: "ai-support-assistant",
    title: "AI Automation Roadmap for Customer Support",
    client: "Consumer / retail brand",
    problem:
      "Support volume spikes before peak season, creating repetitive manual work and slower response times.",
    systemBuilt:
      "A first-phase AI and automation roadmap: support-workflow mapping, repetitive-request classification, escalation rules, response templates, self-service flows and a clear automatable-vs-human boundary.",
    result:
      "Workflow mapped and repetitive categories identified, first-phase automation scoped before high season, and AI-assisted classification/response logic prepared — with support, sales and ops aligned.",
    commercialValue:
      "A clear, staged plan to absorb peak-season volume without adding headcount.",
    capabilities: [
      "Workflow mapping",
      "Request classification",
      "Escalation rules",
      "Response templates",
      "Self-service flows",
    ],
  },
];

export function getCaseStudy(id?: string) {
  return caseStudies.find((caseStudy) => caseStudy.id === id) ?? caseStudies[0];
}
