import { useSupabaseQuery, useSupabasePaginatedQuery } from '@/hooks/useSupabase';
import { Education } from '@/types';

/**
 * Hook to fetch education from Supabase
 */
export function useEducations(params?: Record<string, any>) {
    return useSupabaseQuery<Education>(['educations'], 'educations', params);
}

/**
 * Hook to fetch education from Supabase (formerly paginated, now returns all)
 */
export function usePaginatedEducations(params?: Record<string, any>) {
    return { ...useSupabasePaginatedQuery<Education>(['educations', 'paginated'], 'educations', 1, 10, params), pageSize: 10 };
}
