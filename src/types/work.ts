// types/work.ts

export type Company = {
    id: string;
    name: string;
    logo: string ;
    link: string ;
}

export type Work = {
    id: string;
    order: number;
    title: string;
    position: string;
    companies: Company; // Supabase join result
    start: string;
    end: string;
    description: string;
};
