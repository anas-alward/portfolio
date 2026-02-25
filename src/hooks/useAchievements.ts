import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Achievement } from '../types';

/**
 * Hook to fetch skills from Supabase
 */
export function useAchievements(params?: Record<string, any>) {
    return useSupabaseQuery<Achievement>(['achievements'], 'achievements', params);
}

/**
 * Hook to fetch achievements from Supabase with pagination
 */
export function usePaginatedAchievements(page: number = 1, pageSize: number = 5, params?: Record<string, any>) {
    return useSupabasePaginatedQuery<Achievement>(['achievements', 'paginated'], 'achievements', page, pageSize, params);
}
