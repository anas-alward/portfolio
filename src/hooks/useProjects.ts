import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Project } from '../types';

/**
 * Hook to fetch projects from Supabase
 */
export function useProjects(params?: Record<string, any>) {
    return useSupabaseQuery<Project>(['projects'], 'projects', params);
}

/**
 * Hook to fetch projects from Supabase with pagination
 */
export function usePaginatedProjects(page: number = 1, pageSize: number = 4, params?: Record<string, any>) {
    return useSupabasePaginatedQuery<Project>(['projects', 'paginated'], 'projects', page, pageSize, params);
}
