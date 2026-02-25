import { useState } from "react";
import { getStorageUrl } from "@/lib/storage";
import { Lightbox } from "@/components/ui/lightbox";
import type { Project } from "@/types/projects";

interface ProjectPhotoProps {
    project: Project;
}

const ProjectPhoto = ({ project }: ProjectPhotoProps) => {
    const [isLightboxOpen, setIsLightboxOpen] = useState(false);
    const projectImage = project.image ? getStorageUrl(project.image) : null;

    return (
        <>
            <div
                className={`w-full sm:w-36 h-48 sm:h-24 flex-shrink-0 rounded-lg overflow-hidden border border-neutral-100 bg-neutral-100 flex items-center justify-center ${projectImage ? 'cursor-zoom-in' : ''
                    }`}
                onClick={() => projectImage && setIsLightboxOpen(true)}
            >
                {projectImage ? (
                    <img
                        src={projectImage}
                        alt={project.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                ) : (
                    <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-2xl uppercase group-hover:scale-105 transition-transform duration-300">
                        {project.name.charAt(0)}
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
