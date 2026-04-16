import { Project } from "./projects";

export type Company = {
    id: string;
    name: string;
    logo: string;
    link: string;
}

export type Work = {
    id: string;
    order: number;
    title: string;
    position: string;
    companies: Company; // Supabase join result
    company?: Company; // JSON results from view
    start: string;
    end: string;
    description: string;
    projects?: Project[];
};
