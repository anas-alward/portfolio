import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Work } from '../types';

/**
 * Hook to fetch skills from Supabase
 */
export function useWork(params?: Record<string, any>) {
    return useSupabaseQuery<Work>(['work'], 'work', params);
}

/**
 * Hook to fetch work from Supabase with pagination
 */
export function usePaginatedWork(page: number = 1, pageSize: number = 5, params?: Record<string, any>) {
    return useSupabasePaginatedQuery<Work>(['work', 'paginated'], 'work', page, pageSize, params);
}
