-- Gallery portfolio: managed by owners in backoffice

create table if not exists public.gallery_items (
  id uuid primary key default gen_random_uuid(),
  title text not null default '',
  media_type text not null default 'image'
    check (media_type in ('image', 'video')),
  media_url text not null,
  poster_url text,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists gallery_items_published_sort_idx
  on public.gallery_items (published, sort_order, created_at desc);

drop trigger if exists gallery_items_set_updated_at on public.gallery_items;
create trigger gallery_items_set_updated_at
  before update on public.gallery_items
  for each row execute function public.set_updated_at();

alter table public.gallery_items enable row level security;

drop policy if exists "gallery_select_published" on public.gallery_items;
create policy "gallery_select_published" on public.gallery_items
  for select to anon, authenticated
  using (published = true or public.is_owner());

drop policy if exists "gallery_owner_insert" on public.gallery_items;
create policy "gallery_owner_insert" on public.gallery_items
  for insert to authenticated
  with check (public.is_owner());

drop policy if exists "gallery_owner_update" on public.gallery_items;
create policy "gallery_owner_update" on public.gallery_items
  for update to authenticated
  using (public.is_owner())
  with check (public.is_owner());

drop policy if exists "gallery_owner_delete" on public.gallery_items;
create policy "gallery_owner_delete" on public.gallery_items
  for delete to authenticated
  using (public.is_owner());

grant select on public.gallery_items to anon, authenticated;
grant insert, update, delete on public.gallery_items to authenticated;

-- Public storage bucket for gallery media
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'gallery',
  'gallery',
  true,
  104857600,
  array[
    'image/jpeg',
    'image/png',
    'image/webp',
    'image/gif',
    'video/mp4',
    'video/webm',
    'video/quicktime'
  ]
)
on conflict (id) do update set
  public = excluded.public,
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

drop policy if exists "gallery_storage_public_read" on storage.objects;
create policy "gallery_storage_public_read" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'gallery');

drop policy if exists "gallery_storage_owner_insert" on storage.objects;
create policy "gallery_storage_owner_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'gallery' and public.is_owner());

drop policy if exists "gallery_storage_owner_update" on storage.objects;
create policy "gallery_storage_owner_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'gallery' and public.is_owner())
  with check (bucket_id = 'gallery' and public.is_owner());

drop policy if exists "gallery_storage_owner_delete" on storage.objects;
create policy "gallery_storage_owner_delete" on storage.objects
  for delete to authenticated
  using (bucket_id = 'gallery' and public.is_owner());
