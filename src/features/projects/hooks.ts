import { useSupabaseQuery, useSupabasePaginatedQuery, useSupabaseSingleQuery } from '@/hooks/useSupabase';
import { Project } from '@/types';

/**
 * Hook to fetch a single project by ID
 */
export function useProject(id: number) {
    return useSupabaseSingleQuery<Project>(
        ['project', String(id)],
        'projects',
        { id: `eq.${id}` },
    );
}
/**
 * Hook to fetch projects from Supabase
 */
export function useProjects(params?: Record<string, any>) {
    return useSupabaseQuery<Project>(['projects'], 'projects', params);
}

/**
 * Hook to fetch projects from Supabase (formerly paginated, now returns all)
 */
export function usePaginatedProjects(params?: Record<string, any>) {
    return { ...useSupabasePaginatedQuery<Project>(['projects', 'paginated'], 'projects', 1, 10, params), pageSize: 10 };
}
