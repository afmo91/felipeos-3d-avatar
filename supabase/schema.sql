create extension if not exists pgcrypto;

create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  name text,
  email text not null,
  company text,
  website text,
  use_case text,
  service_interest text,
  tools text[],
  timeline text,
  budget_range text,
  problem_summary text,
  generated_plan jsonb,
  chat_summary text,
  source text default 'felipe-os-chat'
);

create table if not exists public.public_cv (
  id uuid primary key default gen_random_uuid(),
  updated_at timestamptz default now(),
  data jsonb not null,
  is_active boolean default true
);

create table if not exists public.cv_versions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz default now(),
  updated_at timestamptz default now(),
  name text not null,
  target_role text,
  target_company text,
  data jsonb not null,
  is_public boolean default false
);

alter table public.leads enable row level security;
alter table public.public_cv enable row level security;
alter table public.cv_versions enable row level security;

drop policy if exists "Public can read active CV" on public.public_cv;
create policy "Public can read active CV"
  on public.public_cv
  for select
  using (is_active = true);

-- Lead inserts and CV administration should happen through server routes
-- using a Supabase secret API key (sb_secret_...), not directly from public clients.
