-- Modulia CRM / Backoffice
-- profiles, customers, leads, orders, commissions, mailing + RLS

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Profiles (1:1 auth.users)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null default 'agent'
    check (role in ('owner', 'showroom', 'agent')),
  full_name text not null default '',
  email text not null default '',
  phone text,
  agency text,
  commission_rate_pct numeric(5,2) not null default 0
    check (commission_rate_pct >= 0 and commission_rate_pct <= 100),
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_role_idx on public.profiles (role);
create index if not exists profiles_email_idx on public.profiles (email);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, role)
  values (
    new.id,
    coalesce(new.email, ''),
    coalesce(new.raw_user_meta_data->>'full_name', split_part(coalesce(new.email, ''), '@', 1), ''),
    coalesce(new.raw_app_meta_data->>'role', 'agent')
  )
  on conflict (id) do update set
    email = excluded.email,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create or replace function public.current_profile_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role from public.profiles where id = auth.uid();
$$;

create or replace function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles
    where id = auth.uid() and role = 'owner' and active = true
  );
$$;

-- Customers
create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  address text,
  notes text,
  marketing_opt_in boolean not null default false,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index if not exists customers_email_lower_idx
  on public.customers (lower(email));

drop trigger if exists customers_set_updated_at on public.customers;
create trigger customers_set_updated_at
  before update on public.customers
  for each row execute function public.set_updated_at();

-- Leads
create table if not exists public.leads (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers (id) on delete set null,
  assigned_to uuid references public.profiles (id) on delete set null,
  source text not null default 'website'
    check (source in ('website', 'showroom', 'owner', 'iad')),
  status text not null default 'new'
    check (status in ('new', 'contacted', 'qualified', 'converted', 'lost')),
  name text not null,
  email text not null,
  phone text,
  model text,
  message text,
  configuration text,
  total_price_ttc numeric(12,2),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists leads_assigned_to_idx on public.leads (assigned_to);
create index if not exists leads_source_idx on public.leads (source);
create index if not exists leads_status_idx on public.leads (status);
create index if not exists leads_created_at_idx on public.leads (created_at desc);

drop trigger if exists leads_set_updated_at on public.leads;
create trigger leads_set_updated_at
  before update on public.leads
  for each row execute function public.set_updated_at();

insert into public.leads (name, email, phone, model, message, source, status, created_at)
select
  cr.name,
  cr.email,
  cr.phone,
  cr.model,
  cr.message,
  'website',
  'new',
  cr.created_at
from public.contact_requests cr
where not exists (
  select 1 from public.leads l
  where l.email = cr.email
    and l.created_at = cr.created_at
    and coalesce(l.message, '') = coalesce(cr.message, '')
);

-- Orders
create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers (id) on delete set null,
  assigned_to uuid references public.profiles (id) on delete set null,
  lead_id uuid unique references public.leads (id) on delete set null,
  source text not null default 'website'
    check (source in ('website', 'showroom', 'owner', 'iad')),
  pipeline_status text not null default 'pending'
    check (pipeline_status in ('pending', 'ordered', 'in_production', 'installed')),
  payment_status text not null default 'unpaid'
    check (payment_status in ('unpaid', 'partial', 'paid')),
  model text,
  configuration text,
  price_ttc numeric(12,2) not null default 0,
  amount_paid numeric(12,2) not null default 0,
  amount_due numeric(12,2) generated always as (greatest(price_ttc - amount_paid, 0)) stored,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_assigned_to_idx on public.orders (assigned_to);
create index if not exists orders_pipeline_idx on public.orders (pipeline_status);
create index if not exists orders_payment_idx on public.orders (payment_status);

drop trigger if exists orders_set_updated_at on public.orders;
create trigger orders_set_updated_at
  before update on public.orders
  for each row execute function public.set_updated_at();

-- Commission entries
create table if not exists public.commission_entries (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders (id) on delete cascade,
  agent_id uuid not null references public.profiles (id) on delete cascade,
  rate_pct numeric(5,2) not null default 0,
  base_ttc numeric(12,2) not null default 0,
  amount numeric(12,2) not null default 0,
  payment_status text not null default 'a_pagar'
    check (payment_status in ('a_pagar', 'pago')),
  paid_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (order_id, agent_id)
);

create index if not exists commission_entries_agent_idx on public.commission_entries (agent_id);

drop trigger if exists commission_entries_set_updated_at on public.commission_entries;
create trigger commission_entries_set_updated_at
  before update on public.commission_entries
  for each row execute function public.set_updated_at();

-- Mailing
create table if not exists public.mailing_lists (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

drop trigger if exists mailing_lists_set_updated_at on public.mailing_lists;
create trigger mailing_lists_set_updated_at
  before update on public.mailing_lists
  for each row execute function public.set_updated_at();

create table if not exists public.mailing_list_members (
  id uuid primary key default gen_random_uuid(),
  list_id uuid not null references public.mailing_lists (id) on delete cascade,
  customer_id uuid not null references public.customers (id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (list_id, customer_id)
);

create index if not exists mailing_list_members_list_idx on public.mailing_list_members (list_id);

-- RLS
alter table public.profiles enable row level security;
alter table public.customers enable row level security;
alter table public.leads enable row level security;
alter table public.orders enable row level security;
alter table public.commission_entries enable row level security;
alter table public.mailing_lists enable row level security;
alter table public.mailing_list_members enable row level security;

drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select to authenticated
  using (public.is_owner() or id = auth.uid());

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self" on public.profiles
  for update to authenticated
  using (id = auth.uid() or public.is_owner())
  with check (id = auth.uid() or public.is_owner());

drop policy if exists "profiles_owner_insert" on public.profiles;
create policy "profiles_owner_insert" on public.profiles
  for insert to authenticated
  with check (public.is_owner() or id = auth.uid());

drop policy if exists "customers_select" on public.customers;
create policy "customers_select" on public.customers
  for select to authenticated
  using (
    public.is_owner()
    or public.current_profile_role() = 'showroom'
    or exists (
      select 1 from public.leads l
      where l.customer_id = customers.id and l.assigned_to = auth.uid()
    )
    or exists (
      select 1 from public.orders o
      where o.customer_id = customers.id and o.assigned_to = auth.uid()
    )
    or created_by = auth.uid()
  );

drop policy if exists "customers_insert" on public.customers;
create policy "customers_insert" on public.customers
  for insert to authenticated
  with check (true);

drop policy if exists "customers_insert_anon" on public.customers;
create policy "customers_insert_anon" on public.customers
  for insert to anon
  with check (true);

drop policy if exists "customers_update" on public.customers;
create policy "customers_update" on public.customers
  for update to authenticated
  using (
    public.is_owner()
    or public.current_profile_role() = 'showroom'
    or created_by = auth.uid()
    or exists (
      select 1 from public.leads l
      where l.customer_id = customers.id and l.assigned_to = auth.uid()
    )
  );

drop policy if exists "leads_select" on public.leads;
create policy "leads_select" on public.leads
  for select to authenticated
  using (
    public.is_owner()
    or (public.current_profile_role() = 'showroom' and source = 'showroom')
    or assigned_to = auth.uid()
  );

drop policy if exists "leads_insert_auth" on public.leads;
create policy "leads_insert_auth" on public.leads
  for insert to authenticated
  with check (
    public.is_owner()
    or assigned_to = auth.uid()
    or assigned_to is null
  );

drop policy if exists "leads_insert_anon" on public.leads;
create policy "leads_insert_anon" on public.leads
  for insert to anon
  with check (source = 'website' and assigned_to is null);

drop policy if exists "leads_update" on public.leads;
create policy "leads_update" on public.leads
  for update to authenticated
  using (
    public.is_owner()
    or (public.current_profile_role() = 'showroom' and source = 'showroom')
    or assigned_to = auth.uid()
  );

drop policy if exists "leads_delete" on public.leads;
create policy "leads_delete" on public.leads
  for delete to authenticated
  using (public.is_owner());

drop policy if exists "orders_select" on public.orders;
create policy "orders_select" on public.orders
  for select to authenticated
  using (
    public.is_owner()
    or (public.current_profile_role() = 'showroom' and source = 'showroom')
    or assigned_to = auth.uid()
  );

drop policy if exists "orders_insert" on public.orders;
create policy "orders_insert" on public.orders
  for insert to authenticated
  with check (
    public.is_owner()
    or public.current_profile_role() = 'showroom'
    or assigned_to = auth.uid()
  );

drop policy if exists "orders_update" on public.orders;
create policy "orders_update" on public.orders
  for update to authenticated
  using (
    public.is_owner()
    or (public.current_profile_role() = 'showroom' and source = 'showroom')
    or assigned_to = auth.uid()
  );

drop policy if exists "orders_delete" on public.orders;
create policy "orders_delete" on public.orders
  for delete to authenticated
  using (public.is_owner());

drop policy if exists "commissions_select" on public.commission_entries;
create policy "commissions_select" on public.commission_entries
  for select to authenticated
  using (public.is_owner() or agent_id = auth.uid());

drop policy if exists "commissions_insert" on public.commission_entries;
create policy "commissions_insert" on public.commission_entries
  for insert to authenticated
  with check (public.is_owner() or agent_id = auth.uid());

drop policy if exists "commissions_update" on public.commission_entries;
create policy "commissions_update" on public.commission_entries
  for update to authenticated
  using (public.is_owner());

drop policy if exists "mailing_lists_all" on public.mailing_lists;
create policy "mailing_lists_all" on public.mailing_lists
  for all to authenticated
  using (public.is_owner())
  with check (public.is_owner());

drop policy if exists "mailing_members_all" on public.mailing_list_members;
create policy "mailing_members_all" on public.mailing_list_members
  for all to authenticated
  using (public.is_owner())
  with check (public.is_owner());

insert into public.mailing_lists (name, description)
select 'Newsletter Modulia', 'Contacts ayant accepté les communications marketing'
where not exists (
  select 1 from public.mailing_lists where name = 'Newsletter Modulia'
);

grant usage on schema public to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant insert on public.leads to anon;
grant insert on public.customers to anon;
grant select on public.mailing_lists to authenticated;
