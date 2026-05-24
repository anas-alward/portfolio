import { createFileRoute, notFound } from "@tanstack/react-router";
import { z } from "zod";
import { getWorkDetails } from "@/features/work/api";
import { Work } from "@/types/work";
import { getStorageUrl } from "@/lib/storage";
import { motion } from "framer-motion";
import { WorkHeaderActions } from "@/features/work/components/header-actions";
import { WorkHeroSection } from "@/features/work/components/hero-section";
import { WorkProjectsSection } from "@/features/work/components/projects-section";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import Preloader from "@/components/ui/preloader";
const workSearchSchema = z.object({
  tab: z.string().optional(),
});

export const Route = createFileRoute("/work/$workId")({
  validateSearch: (search) => workSearchSchema.parse(search),
  loader: async ({ params }) => {
    const work = await getWorkDetails(params.workId);
    return { work };
  },
  head: ({ loaderData }) => {
    const work = loaderData?.work as Work;
    if (!work) return { title: "Work Not Found | Anas Alward" };

    const title = `${work.position} | Anas Alward`;
    const description = work.description?.slice(0, 160) || "Work details";
    const companyImage = work.companies?.logo
      ? getStorageUrl(work.companies.logo)
      : "/preview.png";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: companyImage },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: companyImage },
      ],
    };
  },
  component: Page,
  notFoundComponent: NotFoundPage,
  pendingComponent: Preloader,
  pendingMs: 100,
  pendingMinMs: 500,
});

function Page() {
  const { tab } = Route.useSearch();
  const { work } = Route.useLoaderData();

  if (!work) {
    throw notFound();
  }
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-[90%] tablet:max-w-200 py-12 tablet:py-20 flex flex-col gap-10"
      >
        <WorkHeaderActions tab={tab} />

        <WorkHeroSection work={work} />

        {work.projects && work.projects.length > 0 && (
          <WorkProjectsSection projects={work.projects} />
        )}
      </motion.div>
    </div>
  );
}

function NotFoundPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-bold text-foreground">Work item not found</h1>
      <p className="text-sm text-muted-foreground">
        The work item you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        search={{ tab: "Work" }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        <ArrowLeft size={15} />
        Back to portfolio
      </Link>
    </div>
  );
}
