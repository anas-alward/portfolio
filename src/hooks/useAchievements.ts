import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Achievement } from '../types';
import { useSettings } from './useSettings';
import { SECTION, SETTINGS_TYPE } from '../types';

/**
 * Hook to fetch skills from Supabase
 */
export function useAchievements(params?: Record<string, any>) {
    return useSupabaseQuery<Achievement>(['achievements'], 'achievements', params);
}

/**
 * Hook to fetch achievements from Supabase with pagination
 */
export function usePaginatedAchievements(page: number = 1, params?: Record<string, any>) {
    const DEFAULT_PAGE_SIZE = 3;
    const { data: settings } = useSettings({ section: SECTION.ACHIEVEMENTS, type: SETTINGS_TYPE.PAGINATION })
    const pageSize = Number(settings?.PAGE_SIZE) || DEFAULT_PAGE_SIZE;
    return { ...useSupabasePaginatedQuery<Achievement>(['achievements', 'paginated'], 'achievements', page, pageSize, params), pageSize };
}
