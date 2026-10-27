-- Key/value metadata rows used for dynamic page metadata and SEO

create table "public"."metadata" (
  "id" uuid not null default gen_random_uuid(),
  "user" uuid not null,
  "key" text,
  "value" text,
  "is_active" boolean default true,
  constraint "content_meta_pkey" primary key ("id")
);

alter table "public"."metadata" add constraint "content_meta_user_id_fkey" foreign key ("user") references auth.users (id) on delete cascade;

alter table "public"."metadata" enable row level security;
create policy "Enable read access for all users" on "public"."metadata" for select using (true);

grant all on "public"."metadata" to postgres, anon, authenticated, service_role;
