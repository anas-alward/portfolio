import { createFileRoute, notFound } from "@tanstack/react-router";
import { getStorageUrl } from "@/lib/storage";
import { getProjectDetails } from "@/features/projects/api";
import { Project, Skill } from "@/types";
import { z } from "zod";
import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import SkillDialog from "@/features/skills/components/dialog";
import { Lightbox } from "@/components/ui/lightbox";
import {
  ProjectHeaderActions,
  ProjectHeroSection,
  ProjectSkillsSection,
  ProjectGallery,
} from "@/features/projects";
import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";


const projectSearchSchema = z.object({
  tab: z.string().optional(),
});

export const Route = createFileRoute("/projects/$projectId")({
  validateSearch: (search) => projectSearchSchema.parse(search),
  loader: async ({ params }) => {
    const project = await getProjectDetails(params.projectId);
    if (!project) {
      throw notFound();
    }
    return { project };
  },
  head: ({ loaderData }) => {
    const project = loaderData?.project as Project;
    if (!project) return { title: "Project Not Found | Anas Alward" };

    const projectImage = project.image
      ? getStorageUrl(`projects/${project.slug}/${project.image}`)
      : "/preview.png";
    const title = `${project.name} | Anas Alward`;
    const description = project.description?.slice(0, 160) || "Project details";

    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:image", content: projectImage },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        { name: "twitter:image", content: projectImage },
      ],
    };
  },
    component: Page,
  notFoundComponent: NotFoundPage,
});

function Page() {
  const { project } = Route.useLoaderData();
  const { tab } = Route.useSearch();
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [isSkillDialogOpen, setIsSkillDialogOpen] = useState(false);
  const handleSkillClick = useCallback((skill: Skill) => {
    setSelectedSkill(skill);
    setIsSkillDialogOpen(true);
  }, []);

  
  const projectImage = project.image
    ? `projects/${project.slug}/${project.image}`
    : null;
  const additionalImages = (project.images || []).map(
    (image: string) => `projects/${project.slug}/${image}`,
  );

  const openLightbox = (image: string) => {
    setSelectedImage(image);
    setIsLightboxOpen(true);
  };

  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="w-[90%] tablet:max-w-200 py-12 tablet:py-20 flex flex-col gap-10"
      >
        <ProjectHeaderActions tab={tab} />

        <ProjectHeroSection
          project={project}
          projectImage={projectImage}
          onImageClick={openLightbox}
        />

        <ProjectSkillsSection
          skills={project.skills || []}
          onSkillClick={handleSkillClick}
        />

        <ProjectGallery
          images={additionalImages}
          projectName={project.name}
          onImageClick={openLightbox}
        />
      </motion.div>

      <Lightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        src={selectedImage}
        alt={project.name}
      />

      <SkillDialog
        skill={selectedSkill}
        isOpen={isSkillDialogOpen}
        onClose={() => setIsSkillDialogOpen(false)}
      />
    </div>
  );
}



function NotFoundPage() {
  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-center gap-4">
      <h1 className="text-xl font-bold text-foreground">Project not found</h1>
      <p className="text-sm text-muted-foreground">
        The project you're looking for doesn't exist.
      </p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:opacity-90 transition-opacity"
      >
        <ArrowLeft size={15} />
        Back to portfolio
      </Link>
    </div>
  );
}
