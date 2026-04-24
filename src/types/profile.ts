export interface Profile {
    id: number
    name: string
    is_available: boolean
    at?: string
    image: string
    primary_title: string
    secondary_title: string
    cta_link?: string
}