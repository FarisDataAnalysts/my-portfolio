-- Run this whole file in Supabase Dashboard > SQL Editor > New query

-- 1. PROJECTS TABLE
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  tech_stack text[],
  image_url text,
  project_url text,
  github_url text,
  featured boolean default false,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 2. SKILLS TABLE
create table if not exists skills (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  category text,          -- e.g. 'Excel', 'SQL', 'Python', 'Power BI'
  proficiency int check (proficiency between 1 and 100) default 70,
  icon text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 3. CERTIFICATES TABLE
create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  issuer text,
  issue_date date,
  credential_url text,
  image_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- 4. ROW LEVEL SECURITY: public can READ, only logged-in admin can WRITE
alter table projects enable row level security;
alter table skills enable row level security;
alter table certificates enable row level security;

create policy "public read projects" on projects for select using (true);
create policy "public read skills" on skills for select using (true);
create policy "public read certificates" on certificates for select using (true);

create policy "admin write projects" on projects for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write skills" on skills for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
create policy "admin write certificates" on certificates for all
  using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');

-- 5. STORAGE BUCKET for images (run separately in Storage tab if this fails)
insert into storage.buckets (id, name, public)
values ('portfolio-images', 'portfolio-images', true)
on conflict (id) do nothing;

create policy "public read images" on storage.objects
  for select using (bucket_id = 'portfolio-images');

create policy "admin upload images" on storage.objects
  for insert with check (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');

create policy "admin delete images" on storage.objects
  for delete using (bucket_id = 'portfolio-images' and auth.role() = 'authenticated');
