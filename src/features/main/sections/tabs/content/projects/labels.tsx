

import { ProjectType } from "@/types";




const projectTypeStyles: Record<ProjectType, string> = {
    [ProjectType.personal]: 'text-neutral-500',
    [ProjectType.work]: 'text-blue-600',
};

type ProjectTypeLabelProps = {
    type: ProjectType;
}

export const ProjectTypeLabel = ({ type }: ProjectTypeLabelProps) => {
    return (

        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md bg-muted ${projectTypeStyles[type]}`}>
            {type}
        </span>
    )

}