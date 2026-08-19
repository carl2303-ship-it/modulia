-- Snapshot client delivery data directly on orders
alter table public.orders
  add column if not exists delivery_name text,
  add column if not exists delivery_email text,
  add column if not exists delivery_phone text,
  add column if not exists delivery_street text,
  add column if not exists delivery_postal_code text,
  add column if not exists delivery_city text;

-- Backfill from linked customer when available
update public.orders o
set
  delivery_name = coalesce(o.delivery_name, c.name),
  delivery_email = coalesce(o.delivery_email, c.email),
  delivery_phone = coalesce(o.delivery_phone, c.phone),
  delivery_street = coalesce(o.delivery_street, c.address)
from public.customers c
where o.customer_id = c.id;
