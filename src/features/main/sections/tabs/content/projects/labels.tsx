

import { ProjectType } from "@/types";




const projectTypeStyles: Record<ProjectType, string> = {
    [ProjectType.personal]: 'bg-neutral-100 text-neutral-500',
    [ProjectType.work]: 'bg-blue-50 text-blue-600',
};

type ProjectTypeLabelProps = {
    type: ProjectType;
}

export const ProjectTypeLabel = ({ type }: ProjectTypeLabelProps) => {
    return (

        <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-1 rounded-md ${projectTypeStyles[type]}`}>
            {type}
        </span>
    )

}