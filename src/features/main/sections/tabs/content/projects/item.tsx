import ProjectPhoto from "./photo";
import type { Project } from "@/types/projects";
import { ArrowUpRight } from "lucide-react";
import ExpandableText from "@/components/ui/expandable-text";
import { ProjectTypeLabel } from "./labels";

const ProjectItem = ({ project }: { project: Project }) => {
    return (
        <div className="group flex flex-col sm:flex-row gap-4 sm:gap-6 py-5 px-4 rounded-xl transition-colors bg-card hover:bg-muted/60 border bg-border">

            {/* Image */}
            <div className="shrink-0">
                <ProjectPhoto project={project} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col min-h-[6rem]">

                {/* Title */}
                <h3 className="text-base font-bold text-foreground leading-tight">
                    {project.name}
                </h3>

                {/* Description */}
                <p className="text-sm text-muted-foreground mt-2 mb-4 leading-relaxed">
                    <ExpandableText text={project.description} wordLimit={30} />
                </p>

                {/* Bottom */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-y-3">

                    {/* Left */}
                    <div className="flex flex-wrap items-center gap-3">
                        <ProjectTypeLabel type={project.type} />

                        {project.company && (
                            <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                                <span className="w-1 h-1 rounded-full bg-border" />
                                <span>
                                    Developed at <span className="text-foreground font-medium">{project.company}</span>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right */}
                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-foreground transition-colors"
                        >
                            Visit
                            <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;