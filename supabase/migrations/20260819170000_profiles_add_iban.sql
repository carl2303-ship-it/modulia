-- Add IBAN field for commission payments
alter table public.profiles
  add column if not exists iban text;

