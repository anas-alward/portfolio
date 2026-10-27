-- Identity sequences (created by generated ... as identity columns) and
-- default privileges so future tables/sequences/functions created by the
-- postgres role are reachable by the Data API roles without extra grants

grant all on all sequences in schema "public" to postgres, anon, authenticated, service_role;

alter default privileges in schema "public" grant all on tables to postgres, anon, authenticated, service_role;
alter default privileges in schema "public" grant all on sequences to postgres, anon, authenticated, service_role;
alter default privileges in schema "public" grant execute on functions to postgres, anon, authenticated, service_role;
