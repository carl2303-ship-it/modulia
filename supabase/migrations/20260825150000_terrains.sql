-- Terrains: land listings shared by commercials (IAD links) for public catalogue

create table if not exists public.terrains (
  id uuid primary key default gen_random_uuid(),
  created_by uuid references public.profiles (id) on delete set null,
  listing_url text not null,
  external_ref text,
  title text not null,
  location text not null default '',
  area_m2 numeric(10,2),
  price_ttc numeric(12,2),
  image_url text,
  description text,
  status text not null default 'published'
    check (status in ('published', 'archived')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists terrains_status_idx on public.terrains (status);
create index if not exists terrains_created_by_idx on public.terrains (created_by);
create index if not exists terrains_created_at_idx on public.terrains (created_at desc);
create unique index if not exists terrains_external_ref_unique_idx
  on public.terrains (external_ref)
  where external_ref is not null;

drop trigger if exists terrains_set_updated_at on public.terrains;
create trigger terrains_set_updated_at
  before update on public.terrains
  for each row execute function public.set_updated_at();

alter table public.terrains enable row level security;

-- Public catalogue: anyone can read published terrains
drop policy if exists "terrains_select_published" on public.terrains;
create policy "terrains_select_published" on public.terrains
  for select to anon, authenticated
  using (status = 'published');

-- Authenticated backoffice users can also see archived (own or owner)
drop policy if exists "terrains_select_auth" on public.terrains;
create policy "terrains_select_auth" on public.terrains
  for select to authenticated
  using (
    public.is_owner()
    or created_by = auth.uid()
    or status = 'published'
  );

drop policy if exists "terrains_insert" on public.terrains;
create policy "terrains_insert" on public.terrains
  for insert to authenticated
  with check (
    public.is_owner()
    or public.current_profile_role() in ('agent', 'showroom')
  );

drop policy if exists "terrains_update" on public.terrains;
create policy "terrains_update" on public.terrains
  for update to authenticated
  using (
    public.is_owner()
    or created_by = auth.uid()
  );

drop policy if exists "terrains_delete" on public.terrains;
create policy "terrains_delete" on public.terrains
  for delete to authenticated
  using (public.is_owner());

grant select on public.terrains to anon, authenticated;
grant insert, update, delete on public.terrains to authenticated;
