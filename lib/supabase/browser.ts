type SupabaseConfig = {
  baseUrl: string;
  publishableKey: string;
};

function getSupabaseBaseUrl() {
  return process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
}

function getSupabasePublishableKey() {
  return process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY?.trim();
}

export function hasSupabasePublicConfig() {
  return Boolean(getSupabaseBaseUrl() && getSupabasePublishableKey());
}

export function getSupabasePublicConfig(): SupabaseConfig | null {
  const baseUrl = getSupabaseBaseUrl();
  const publishableKey = getSupabasePublishableKey();

  if (!baseUrl || !publishableKey) return null;
  return { baseUrl, publishableKey };
}

export async function readActivePublicCV<T>() {
  const config = getSupabasePublicConfig();
  if (!config) return null;

  const response = await fetch(
    `${config.baseUrl}/rest/v1/public_cv?select=data&is_active=eq.true&order=updated_at.desc&limit=1`,
    {
      headers: {
        apikey: config.publishableKey,
      },
      next: { revalidate: 300 },
    },
  ).catch(() => null);

  if (!response?.ok) return null;

  const rows = (await response.json().catch(() => [])) as Array<{ data?: T }>;
  return rows[0]?.data ?? null;
}
