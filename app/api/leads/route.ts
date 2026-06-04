import { insertLead } from "@/lib/supabase/server";

export const runtime = "nodejs";

type LeadRequest = {
  name?: string;
  email?: string;
  company?: string;
  website?: string;
  useCase?: string;
  serviceInterest?: string;
  tools?: string[];
  timeline?: string;
  budgetRange?: string;
  problemSummary?: string;
  generatedPlan?: unknown;
  chatSummary?: string;
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function cleanText(value?: string, max = 240) {
  return value?.trim().slice(0, max) || undefined;
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as LeadRequest;
  const email = cleanText(body.email, 320)?.toLowerCase();

  if (!email || !isValidEmail(email)) {
    return Response.json({ ok: false, error: "invalid-email" }, { status: 400 });
  }

  const result = await insertLead({
    name: cleanText(body.name),
    email,
    company: cleanText(body.company),
    website: cleanText(body.website, 320),
    use_case: cleanText(body.useCase),
    service_interest: cleanText(body.serviceInterest),
    tools: Array.isArray(body.tools) ? body.tools.map((tool) => tool.trim()).filter(Boolean) : undefined,
    timeline: cleanText(body.timeline),
    budget_range: cleanText(body.budgetRange),
    problem_summary: cleanText(body.problemSummary, 800),
    generated_plan: body.generatedPlan,
    chat_summary: cleanText(body.chatSummary, 1200),
  });

  if (!result.ok) {
    return Response.json(
      { ok: false, error: result.reason, message: result.message },
      { status: result.reason === "missing-env" ? 503 : 502 },
    );
  }

  return Response.json({ ok: true, id: result.data[0]?.id });
}
