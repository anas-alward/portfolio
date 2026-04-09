import { useSupabaseQuery, useSupabasePaginatedQuery } from '@/hooks/useSupabase';
import { Skill } from '@/types';
import { useSettings } from '@/features/settings/hooks';
import { SECTION, SETTINGS_TYPE } from '@/types';

/**
 * Hook to fetch skills from Supabase
 */
export function useSkills(params?: Record<string, any>) {
    return useSupabaseQuery<Skill>(['skills'], 'skills', params);
}

/**
 * Hook to fetch skills from Supabase with pagination
 */
export function usePaginatedSkills(page: number = 1, params?: Record<string, any>) {
    const DEFAULT_PAGE_SIZE = 5;

    const { data: settings } = useSettings({ section: SECTION.SKILLS, type: SETTINGS_TYPE.PAGINATION });

    const pageSize = settings?.PAGE_SIZE ? Number(settings.PAGE_SIZE) : DEFAULT_PAGE_SIZE;

    return { ...useSupabasePaginatedQuery<Skill>(['skills', 'paginated'], 'skills', page, pageSize, params), pageSize };
}
