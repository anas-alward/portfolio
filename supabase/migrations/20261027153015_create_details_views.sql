-- Denormalized read models for the projects and work sections
-- (security_invoker so the underlying table RLS policies apply to callers)

create or replace view "public"."project_details" with (security_invoker = on) as
 SELECT id,
    name,
    company,
    type,
    image,
    link,
    "user",
    "order",
    description,
    is_active,
    skill_ids,
    slug,
    images,
    ( SELECT json_agg(s.*) AS json_agg
           FROM skills s
          WHERE s.id = ANY (p.skill_ids)) AS skills
   FROM projects p;

create or replace view "public"."work_details" with (security_invoker = on) as
 SELECT id,
    "position",
    start,
    "end",
    description,
    "user",
    "order",
    is_active,
    company_id,
    project_ids,
    ( SELECT row_to_json(c.*) AS row_to_json
           FROM companies c
          WHERE c.id = w.company_id) AS company,
    ( SELECT json_agg(p.*) AS json_agg
           FROM projects p
          WHERE p.id = ANY (w.project_ids)) AS projects
   FROM work w;

grant all on "public"."project_details" to postgres, anon, authenticated, service_role;
grant all on "public"."work_details" to postgres, anon, authenticated, service_role;
