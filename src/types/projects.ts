

export interface Project {
    id: number
    name: string
    description: string
    image: string
    link: string
    type?: "Personal" | "Commercial"
    company?: string
}
