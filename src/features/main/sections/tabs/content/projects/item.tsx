
import ProjectPhoto from "./photo";
import type { Project } from "@/types/projects";
import { ArrowUpRight } from "lucide-react";

const ProjectItem = ({ project }: { project: Project }) => {
    return (
        <div className="group flex flex-col sm:flex-row gap-4 sm:gap-6 py-5 px-3 -mx-3 rounded-xl hover:bg-neutral-50 transition-colors relative">
            <ProjectPhoto project={project} />

            {/* Content */}
            <div className="flex-1 flex flex-col min-h-[6rem]">
                {/* Top Row: Title & Type */}
                <div className="flex justify-between items-start gap-2">
                    <h3 className="text-base font-bold text-neutral-900 leading-tight pt-1">
                        {project.name}
                    </h3>

                    {project.type && (
                        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md ${project.type === 'Personal'
                            ? 'bg-neutral-100 text-neutral-500'
                            : 'bg-blue-50 text-blue-600'
                            }`}>
                            {project.type}
                        </span>
                    )}
                </div>

                {/* Middle: Description */}
                <p className="text-sm text-neutral-600 line-clamp-2 max-w-xl mt-2 mb-4 leading-relaxed">
                    {project.description}
                </p>

                {/* Bottom Row: Company & Action */}
                <div className="mt-auto flex items-end justify-between">
                    <div className="text-xs text-neutral-500 font-medium">
                        {project.company && (
                            <>
                                <span className="text-neutral-400">Developed at</span> <span className="text-neutral-900">{project.company}</span>
                            </>
                        )}
                    </div>

                    <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-900 border border-neutral-200 px-3 py-1.5 rounded-full hover:bg-black hover:text-white hover:border-black transition-all"
                    >
                        Visit
                        <ArrowUpRight size={13} />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProjectItem;
