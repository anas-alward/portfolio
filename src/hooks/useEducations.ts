import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Education } from '@/types';

/**
 * Hook to fetch skills from Supabase
 */
export function useEducations(params?: Record<string, any>) {
    return useSupabaseQuery<Education>(['educations'], 'educations', params);
}

/**
 * Hook to fetch education from Supabase with pagination
 */
export function usePaginatedEducations(page: number = 1, pageSize: number = 5, params?: Record<string, any>) {
    return useSupabasePaginatedQuery<Education>(['educations', 'paginated'], 'educations', page, pageSize, params);
}
