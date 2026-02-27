import ProjectPhoto from "./photo";
import type { Project } from "@/types/projects";
import { ArrowUpRight } from "lucide-react";
import ExpandableText from "@/components/ui/expandable-text";
import { ProjectTypeLabel } from "./labels";

const ProjectItem = ({ project }: { project: Project }) => {
    return (
        <div className="group flex flex-col sm:flex-row gap-4 sm:gap-6 py-5 px-3 -mx-3 rounded-xl hover:bg-neutral-50 transition-colors">
            {/* Image Section */}
            <div className="shrink-0">
                <ProjectPhoto project={project} />
            </div>

            {/* Content Section */}
            <div className="flex-1 flex flex-col min-h-[6rem]">

                {/* Top: Title */}
                <h3 className="text-base font-bold text-neutral-900 leading-tight">
                    {project.name}
                </h3>

                {/* Middle: Description */}
                <p className="text-sm text-neutral-600 mt-2 mb-4 leading-relaxed">
                    <ExpandableText text={project.description} wordLimit={30} />
                </p>

                {/* Bottom: Unified Metadata & Action */}
                <div className="mt-auto flex flex-wrap items-center justify-between gap-y-3">

                    {/* Left: Context (Type + Company) */}
                    <div className="flex flex-wrap items-center gap-3">
                        <ProjectTypeLabel type={project.type} />

                        {project.company && (
                            <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                                {/* Simple dot separator instead of border lines */}
                                <span className="w-1 h-1 rounded-full bg-neutral-300" />
                                <span>
                                    Developed at <span className="text-neutral-900 font-medium">{project.company}</span>
                                </span>
                            </div>
                        )}
                    </div>

                    {/* Right: Action */}
                    {
                        project.link &&
                        <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 hover:text-black transition-colors"
                        >
                        Visit
                        <ArrowUpRight size={13} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    }
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;