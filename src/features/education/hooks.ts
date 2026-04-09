import { useSupabaseQuery, useSupabasePaginatedQuery } from '@/hooks/useSupabase';
import { Education } from '@/types';
import { useSettings } from '@/features/settings/hooks';
import { SECTION, SETTINGS_TYPE } from '@/types';

/**
 * Hook to fetch education from Supabase
 */
export function useEducations(params?: Record<string, any>) {
    return useSupabaseQuery<Education>(['educations'], 'educations', params);
}

/**
 * Hook to fetch education from Supabase with pagination
 */
export function usePaginatedEducations(page: number = 1, params?: Record<string, any>) {
    const DEFAULT_PAGE_SIZE = 3
    const { data: settings } = useSettings({ section: SECTION.EDUCATION, type: SETTINGS_TYPE.PAGINATION })
    const pageSize = Number(settings?.PAGE_SIZE) || DEFAULT_PAGE_SIZE
    return { ...useSupabasePaginatedQuery<Education>(['educations', 'paginated'], 'educations', page, pageSize, params), pageSize };
}
