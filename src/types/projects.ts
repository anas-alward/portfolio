
export enum ProjectType {
    personal = 'personal',
    work = 'work',
}


export interface Project {
    id: number
    name: string
    description: string
    image: string
    link: string
    type: ProjectType
    company?: string
}