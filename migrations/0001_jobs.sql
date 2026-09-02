create table if not exists saved_jobs (
  owner_key text not null,
  id text not null,
  saved_at timestamptz not null,
  snapshot jsonb not null,
  summary jsonb not null,
  primary key (owner_key, id)
);

create index if not exists saved_jobs_owner_saved
  on saved_jobs (owner_key, saved_at desc);

create table if not exists job_drafts (
  owner_key text primary key,
  draft jsonb not null,
  updated_at timestamptz not null default now()
);
