import { useSupabaseQuery, useSupabasePaginatedQuery } from '@/hooks/useSupabase';
import { Work } from '@/types';

/**
 * Hook to fetch work from Supabase
 */
export function useWork(params?: Record<string, any>) {
    return useSupabaseQuery<Work>(['work'], 'work', params);
}

/**
 * Hook to fetch work from Supabase (formerly paginated, now returns all)
 */
export function usePaginatedWork(params?: Record<string, any>) {
    const finalParams = {
        select: '*,companies(*)',
        ...params
    };

    return { ...useSupabasePaginatedQuery<Work>(['work', 'paginated'], 'work', 1, 10, finalParams), pageSize: 10 };
}
