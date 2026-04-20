import { useSupabaseQuery, useSupabasePaginatedQuery } from '@/hooks/useSupabase';
import { Achievement } from '@/types';

/**
 * Hook to fetch achievements from Supabase
 */
export function useAchievements(params?: Record<string, any>) {
    return useSupabaseQuery<Achievement>(['achievements'], 'achievements', params);
}

/**
 * Hook to fetch achievements from Supabase (formerly paginated, now returns all)
 */
export function usePaginatedAchievements(params?: Record<string, any>) {
    return { ...useSupabasePaginatedQuery<Achievement>(['achievements', 'paginated'], 'achievements', 1, 10, params), pageSize: 10 };
}
