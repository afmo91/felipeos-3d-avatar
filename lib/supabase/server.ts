type SupabaseInsertResult<T> =
  | { ok: true; data: T[] }
  | { ok: false; reason: "missing-env" | "request-failed"; message: string };

type LeadPayload = {
  name?: string;
  email: string;
  company?: string;
  website?: string;
  use_case?: string;
  service_interest?: string;
  tools?: string[];
  timeline?: string;
  budget_range?: string;
  problem_summary?: string;
  generated_plan?: unknown;
  chat_summary?: string;
  source?: string;
};

function assertServerOnly() {
  if (typeof window !== "undefined") {
    throw new Error("lib/supabase/server.ts must only be imported by server code.");
  }
}

function getSupabaseBaseUrl() {
  assertServerOnly();
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
}

function getSupabaseSecretKey() {
  assertServerOnly();
  return process.env.SUPABASE_SECRET_KEY?.trim();
}

export function hasSupabaseServerConfig() {
  return Boolean(getSupabaseBaseUrl() && getSupabaseSecretKey());
}

async function insertRows<T>(
  table: string,
  rows: unknown[],
): Promise<SupabaseInsertResult<T>> {
  const baseUrl = getSupabaseBaseUrl();
  const secretKey = getSupabaseSecretKey();

  if (!baseUrl || !secretKey) {
    return {
      ok: false,
      reason: "missing-env",
      message: "Supabase server environment variables are not configured.",
    };
  }

  const response = await fetch(`${baseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: secretKey,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify(rows),
  });

  if (!response.ok) {
    return {
      ok: false,
      reason: "request-failed",
      message: await response.text().catch(() => "Supabase insert failed."),
    };
  }

  return { ok: true, data: (await response.json()) as T[] };
}

export async function insertLead(payload: LeadPayload) {
  return insertRows<{ id: string }>("leads", [
    {
      source: "felipe-os-chat",
      ...payload,
    },
  ]);
}
