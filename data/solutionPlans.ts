export type PlanCategory =
  | "B2B prospecting"
  | "Customer support / SAV"
  | "Admin/document workflow"
  | "Paid growth / CAC"
  | "Internal dashboard"
  | "Product/MVP"
  | "Other";

export type SolutionPlan = {
  title: string;
  goal: string;
  workflow: string[];
  integrations: string[];
  sprint: string[];
  humanControl: string;
  nextStep: string;
};

export type BuilderDraft = {
  useCase?: PlanCategory;
  tools?: string[];
  audience?: string;
  timeline?: string;
  email?: string;
  name?: string;
  company?: string;
  website?: string;
  serviceInterest?: string;
};

export const planCategories: PlanCategory[] = [
  "B2B prospecting",
  "Customer support / SAV",
  "Admin/document workflow",
  "Paid growth / CAC",
  "Internal dashboard",
  "Product/MVP",
  "Other",
];

export const toolOptions = [
  "CRM",
  "Google Workspace",
  "Notion",
  "WhatsApp",
  "Gmail",
  "Ads platforms",
  "Spreadsheets",
  "Other",
];

export const audienceOptions = [
  "Sales team",
  "Support team",
  "Founder/operator",
  "Marketing team",
  "Internal team",
  "Customers",
];

export const timelineOptions = ["ASAP", "This month", "This quarter", "Exploring"];

const templates: Record<PlanCategory, SolutionPlan> = {
  "B2B prospecting": {
    title: "B2B Prospecting Agent Plan",
    goal: "Generate qualified leads and prepare human-approved outreach.",
    workflow: [
      "Find companies",
      "enrich contacts",
      "score fit",
      "draft message",
      "create CRM deal",
      "schedule follow-up",
    ],
    integrations: ["CRM", "Gmail", "LinkedIn/Apollo or enrichment source", "Google Sheets", "Calendar"],
    sprint: [
      "Week 1: workflow map + enrichment prototype",
      "Week 2: CRM update + outreach approval loop",
    ],
    humanControl: "Human approval before any outbound message.",
    nextStep: "Book a 30-min call to scope the first sprint.",
  },
  "Customer support / SAV": {
    title: "AI Support Assistant Plan",
    goal: "Reduce repetitive support work while keeping humans in control.",
    workflow: [
      "Classify request",
      "retrieve policy/knowledge",
      "draft answer",
      "detect edge case",
      "handoff to human",
      "log insight",
    ],
    integrations: ["Helpdesk", "Knowledge base", "CRM", "Slack/Teams", "Analytics"],
    sprint: [
      "Week 1: request taxonomy + knowledge retrieval prototype",
      "Week 2: drafted replies + escalation rules",
    ],
    humanControl: "Human review for refunds, legal, angry customers and uncertain answers.",
    nextStep: "Book a 30-min call to choose the first support queue.",
  },
  "Admin/document workflow": {
    title: "AI Admin & Document Workflow Plan",
    goal: "Turn unclear admin requests into guided checklists and generated drafts.",
    workflow: [
      "Identify request",
      "collect missing info",
      "check requirements",
      "generate draft",
      "preview document",
      "route for approval",
    ],
    integrations: ["Google Workspace", "Document storage", "CRM/profile data", "Email", "PDF generation"],
    sprint: [
      "Week 1: checklist logic + data model",
      "Week 2: document preview + approval flow",
    ],
    humanControl: "Human approval before final submission or official communication.",
    nextStep: "Book a 30-min call to map the document flow.",
  },
  "Paid growth / CAC": {
    title: "Growth System Audit Plan",
    goal: "Find wasted spend, broken tracking and high-leverage growth experiments.",
    workflow: [
      "Audit tracking",
      "map funnel",
      "compare channel economics",
      "find CAC/ROAS issues",
      "prioritize experiments",
      "build dashboard",
    ],
    integrations: ["Google Ads", "Meta Ads", "GA4", "CRM", "Looker/Data Studio"],
    sprint: [
      "Week 1: tracking and attribution diagnostic",
      "Week 2: dashboard recommendations + experiment backlog",
    ],
    humanControl: "Budget changes stay human-approved, with clear evidence for each move.",
    nextStep: "Book a 30-min call to review spend, tracking and funnel visibility.",
  },
  "Internal dashboard": {
    title: "Internal Dashboard & Ops Layer Plan",
    goal: "Make operational work visible so teams can act on one version of the truth.",
    workflow: [
      "Define decisions",
      "connect sources",
      "normalize data",
      "build dashboard",
      "flag exceptions",
      "review weekly",
    ],
    integrations: ["CRM", "Spreadsheets", "SQL/API sources", "Looker/Data Studio", "Slack/Email"],
    sprint: [
      "Week 1: metric map + source connection",
      "Week 2: first dashboard + exception alerts",
    ],
    humanControl: "Teams keep decision rights; the system surfaces evidence and next actions.",
    nextStep: "Book a 30-min call to choose the first operating metric.",
  },
  "Product/MVP": {
    title: "Product / MVP Build Plan",
    goal: "Turn a workflow or product idea into a usable first version.",
    workflow: [
      "Define user",
      "map core flow",
      "scope MVP",
      "build interface",
      "connect data/APIs",
      "ship and learn",
    ],
    integrations: ["Next.js", "Supabase", "APIs", "Analytics", "Vercel"],
    sprint: [
      "Week 1: product scope + UX flow",
      "Weeks 2-4: MVP build + deployment",
    ],
    humanControl: "Scope stays tied to one user workflow and one measurable outcome.",
    nextStep: "Book a 30-min call to define the first shippable version.",
  },
  Other: {
    title: "Custom AI Systems Plan",
    goal: "Map the messy workflow and identify the smallest useful system to ship.",
    workflow: [
      "Clarify problem",
      "map inputs",
      "find repetitive decisions",
      "design workflow",
      "prototype",
      "measure impact",
    ],
    integrations: ["CRM", "Google Workspace", "APIs", "Spreadsheets", "Analytics"],
    sprint: [
      "Week 1: workflow map + prototype scope",
      "Week 2: working prototype + next integration plan",
    ],
    humanControl: "Humans stay in control of sensitive decisions and external actions.",
    nextStep: "Book a 30-min call to turn the context into a first sprint.",
  },
};

export function buildSolutionPlan(draft: BuilderDraft): SolutionPlan {
  const useCase = draft.useCase && templates[draft.useCase] ? draft.useCase : "Other";
  const base = templates[useCase];
  const tools = draft.tools?.filter(Boolean) ?? [];
  const integrations = tools.length ? Array.from(new Set([...tools, ...base.integrations])) : base.integrations;
  const timeline = draft.timeline ? `Target timing: ${draft.timeline}.` : "";
  const audience = draft.audience ? `Built for: ${draft.audience}.` : "";

  return {
    ...base,
    goal: [base.goal, audience, timeline].filter(Boolean).join(" "),
    integrations,
  };
}
