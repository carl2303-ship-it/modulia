-- Tabela para pedidos de contacto / orçamento
create table if not exists public.contact_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  phone text,
  model text,
  message text,
  created_at timestamptz not null default now()
);

alter table public.contact_requests enable row level security;

-- Permitir inserção anónima (formulário público)
create policy "Permitir inserção pública de contactos"
  on public.contact_requests
  for insert
  to anon, authenticated
  with check (true);

-- Apenas utilizadores autenticados (admin) podem ler
create policy "Apenas autenticados podem ler contactos"
  on public.contact_requests
  for select
  to authenticated
  using (true);
