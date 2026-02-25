import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Language } from '@/types';

/**
 * Hook to fetch skills from Supabase
 */
export function useLanguages(params?: Record<string, any>) {
    return useSupabaseQuery<Language>(['languages'], 'languages', params);
}

/**
 * Hook to fetch languages from Supabase with pagination
 */
export function usePaginatedLanguages(page: number = 1, pageSize: number = 5, params?: Record<string, any>) {
    return useSupabasePaginatedQuery<Language>(['languages', 'paginated'], 'languages', page, pageSize, params);
}
