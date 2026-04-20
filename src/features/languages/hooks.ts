import { useSupabaseQuery, useSupabasePaginatedQuery } from '@/hooks/useSupabase';
import { Language } from '@/types';

/**
 * Hook to fetch languages from Supabase
 */
export function useLanguages(params?: Record<string, any>) {
    return useSupabaseQuery<Language>(['languages'], 'languages', params);
}

/**
 * Hook to fetch languages from Supabase (formerly paginated, now returns all)
 */
export function usePaginatedLanguages(params?: Record<string, any>) {
    return { ...useSupabasePaginatedQuery<Language>(['languages', 'paginated'], 'languages', 1, 10, params), pageSize: 10 };
}
