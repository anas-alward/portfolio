import ProjectPhoto from "./photo";
import type { Project } from "@/types/projects";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import ExpandableText from "@/components/ui/expandable-text";
import { ProjectTypeLabel } from "./labels";
import { Link } from "@tanstack/react-router";

const ProjectItem = ({ project, tab }: { project: Project; tab?: string }) => {
    return (
        <div className="group relative flex flex-col sm:flex-row gap-4 sm:gap-5 p-4 rounded-xl transition-colors bg-card hover:bg-muted/60 border bg-border">

            {/* Label */}
            <div className="absolute top-3 right-3 z-10">
                <ProjectTypeLabel type={project.type} />
            </div>

            {/* Image */}
            <div className="shrink-0">
                <ProjectPhoto project={project} />
            </div>

            {/* Content */}
            <div className="flex-1 flex flex-col gap-2 min-h-[100px]">

                {/* Title */}
                <h3 className="text-base font-bold text-foreground leading-tight">
                    {project.name}
                </h3>

                {/* Company */}
                {project.company && (
                    <p className="text-xs text-muted-foreground">
                        Developed at <span className="text-foreground font-medium">{project.company}</span>
                    </p>
                )}

                {/* Description */}
                <div className="text-sm text-muted-foreground leading-relaxed">
                    <ExpandableText text={project.description} wordLimit={30} />
                </div>

                {/* Bottom */}
                <div className="mt-auto flex items-center justify-end gap-3">
                    <Link
                        to="/projects/$projectId"
                        params={{ projectId: project.id.toString() }}
                        search={{ tab }}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                    >
                        View
                        <ArrowUpRight size={13} />
                    </Link>

                    {project.link && (
                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                        >
                            Visit
                            <ExternalLink size={13} />
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;