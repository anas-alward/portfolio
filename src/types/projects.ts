import { Skill } from "./skills"

export enum ProjectType {
    personal = 'personal',
    work = 'work',
}


export interface Project {
    id: number
    name: string
    slug: string
    description: string
    image: string
    images?: string[]
    link: string
    type: ProjectType
    company?: string
    skills?: Skill[]
}

