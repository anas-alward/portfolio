-- Enum types shared across content tables

create type "public"."Data Types" as enum ('INT', 'STRING', 'BOOLEAN');
create type "public"."Page Section" as enum ('HERO', 'WORK', 'PROJECTS', 'SKILLS', 'CERTIFICATES', 'TESTIMONIALS', 'LANGUAGES', 'EDUCATION', 'ACHIEVEMENTS');
create type "public"."Project Types" as enum ('personal', 'work');
create type "public"."Settings Types" as enum ('PAGINATION', 'ANIMATION', 'FEATURE');
create type "public"."content_entity_type" as enum ('PROJECT', 'PAGE');
