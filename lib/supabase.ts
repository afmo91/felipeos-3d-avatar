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

export function hasSupabaseServerConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.SUPABASE_SERVICE_ROLE_KEY?.trim(),
  );
}

export function hasSupabasePublicConfig() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL?.trim() &&
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim(),
  );
}

function getSupabaseBaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
}

async function insertRows<T>(
  table: string,
  rows: unknown[],
): Promise<SupabaseInsertResult<T>> {
  const baseUrl = getSupabaseBaseUrl();
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

  if (!baseUrl || !serviceRoleKey) {
    return {
      ok: false,
      reason: "missing-env",
      message: "Supabase server environment variables are not configured.",
    };
  }

  const response = await fetch(`${baseUrl}/rest/v1/${table}`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
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

export async function readActivePublicCV<T>() {
  const baseUrl = getSupabaseBaseUrl();
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  if (!baseUrl || !anonKey) return null;

  const response = await fetch(
    `${baseUrl}/rest/v1/public_cv?select=data&is_active=eq.true&order=updated_at.desc&limit=1`,
    {
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
      },
      next: { revalidate: 300 },
    },
  ).catch(() => null);

  if (!response?.ok) return null;

  const rows = (await response.json().catch(() => [])) as Array<{ data?: T }>;
  return rows[0]?.data ?? null;
}
