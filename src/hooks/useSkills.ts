import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Skill } from '../types';

/**
 * Hook to fetch skills from Supabase
 */
export function useSkills(params?: Record<string, any>) {
    return useSupabaseQuery<Skill>(['skills'], 'skills', params);
}

/**
 * Hook to fetch skills from Supabase with pagination
 */
export function usePaginatedSkills(page: number = 1, pageSize: number = 6, params?: Record<string, any>) {
    return useSupabasePaginatedQuery<Skill>(['skills', 'paginated'], 'skills', page, pageSize, params);
}
