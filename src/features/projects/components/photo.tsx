import { useState } from "react";
import { Lightbox } from "@/components/ui/lightbox";
import type { Project } from "@/types/projects";
import Image from "@/components/ui/image";
import { mediaPath } from "../utils";

interface ProjectPhotoProps {
    project: Project;
}


const ProjectPhoto = ({ project }: ProjectPhotoProps) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const hasImage = project.slug && project.image;
    const projectImage = hasImage ? mediaPath(project.slug, project.image) : null;

    return (
        <>
            <div
                className={`w-full sm:w-36 h-48 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-neutral-100 bg-neutral-100 flex items-center justify-center ${projectImage ? 'cursor-zoom-in' : ''
                    }`}
                onClick={() => projectImage && setIsLightboxOpen(true)}
            >
                {projectImage ? (
                    <Image
                        src={projectImage}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-primary/5 flex items-center justify-center text-primary font-bold text-xs p-4 text-center uppercase group-hover:scale-105 transition-transform duration-300">
                        {project.name}
                    </div>
                )}
            </div>

            <Lightbox
                isOpen={isLightboxOpen}
                onClose={() => setIsLightboxOpen(false)}
                src={projectImage || ""}
                alt={project.name}
            />
        </>
    );
};

export default ProjectPhoto;
