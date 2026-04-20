import { useSupabaseQuery, useSupabasePaginatedQuery } from '@/hooks/useSupabase';
import { Skill } from '@/types';

/**
 * Hook to fetch skills from Supabase
 */
export function useSkills(params?: Record<string, any>) {
    return useSupabaseQuery<Skill>(['skills'], 'skills', params);
}

/**
 * Hook to fetch skills from Supabase (formerly paginated, now returns all)
 */
export function usePaginatedSkills(params?: Record<string, any>) {
    return { ...useSupabasePaginatedQuery<Skill>(['skills', 'paginated'], 'skills', 1, 10, params), pageSize: 10 };
}
