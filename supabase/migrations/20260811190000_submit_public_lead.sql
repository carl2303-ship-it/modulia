-- RPC sécurisée pour enregistrer un lead depuis le site (bypass RLS contrôlé)
create or replace function public.submit_public_lead(
  p_name text,
  p_email text,
  p_phone text default null,
  p_model text default null,
  p_message text default null,
  p_configuration text default null,
  p_total_price_ttc numeric default null,
  p_source text default 'website',
  p_assigned_to uuid default null,
  p_marketing_opt_in boolean default false,
  p_created_by uuid default null
)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  v_customer_id uuid;
  v_lead_id uuid;
  v_source text;
begin
  if p_name is null or length(trim(p_name)) = 0 then
    raise exception 'name required';
  end if;
  if p_email is null or length(trim(p_email)) = 0 then
    raise exception 'email required';
  end if;

  v_source := coalesce(nullif(trim(p_source), ''), 'website');
  if v_source not in ('website', 'showroom', 'owner', 'iad') then
    v_source := 'website';
  end if;

  if auth.uid() is null then
    v_source := 'website';
    p_assigned_to := null;
    p_created_by := null;
  end if;

  select id into v_customer_id
  from public.customers
  where lower(email) = lower(trim(p_email))
  limit 1;

  if v_customer_id is null then
    insert into public.customers (name, email, phone, marketing_opt_in, created_by)
    values (
      trim(p_name),
      trim(p_email),
      nullif(trim(coalesce(p_phone, '')), ''),
      coalesce(p_marketing_opt_in, false),
      p_created_by
    )
    returning id into v_customer_id;
  else
    if coalesce(p_marketing_opt_in, false) then
      update public.customers
      set marketing_opt_in = true,
          phone = coalesce(nullif(trim(coalesce(p_phone, '')), ''), phone),
          name = coalesce(nullif(trim(p_name), ''), name)
      where id = v_customer_id;
    end if;
  end if;

  insert into public.leads (
    customer_id,
    assigned_to,
    source,
    status,
    name,
    email,
    phone,
    model,
    message,
    configuration,
    total_price_ttc
  ) values (
    v_customer_id,
    p_assigned_to,
    v_source,
    'new',
    trim(p_name),
    trim(p_email),
    nullif(trim(coalesce(p_phone, '')), ''),
    nullif(trim(coalesce(p_model, '')), ''),
    nullif(p_message, ''),
    nullif(p_configuration, ''),
    p_total_price_ttc
  )
  returning id into v_lead_id;

  return v_lead_id;
end;
$$;

revoke all on function public.submit_public_lead from public;
grant execute on function public.submit_public_lead(text, text, text, text, text, text, numeric, text, uuid, boolean, uuid) to anon, authenticated;
