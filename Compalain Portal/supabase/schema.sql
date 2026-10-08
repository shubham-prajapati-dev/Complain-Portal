create extension if not exists pgcrypto;

create table if not exists public.complaints (
  id uuid primary key default gen_random_uuid(),
  complaint_id text unique not null,
  category text not null check (category in ('College Complaint', 'Hostel Complaint', 'Campus Complaint')),
  level text not null check (level in ('College Level Complaint', 'HOD Level Complaint', 'Administrator Level Complaint')),
  subject text not null,
  description text not null,
  contact text not null,
  status text not null default 'Submitted'
    check (status in ('Submitted', 'Under Review', 'In Progress', 'Resolved', 'Rejected')),
  created_at timestamptz not null default now(),
  resolved_at timestamptz
);

create index if not exists complaints_complaint_id_idx on public.complaints (complaint_id);
create index if not exists complaints_status_idx on public.complaints (status);
create index if not exists complaints_created_at_idx on public.complaints (created_at desc);

alter table public.complaints enable row level security;

-- The browser never receives the Supabase service-role key.
-- All inserts/lookups go through /api/complaints.js.
-- Do not add public INSERT/SELECT policies for this table.
