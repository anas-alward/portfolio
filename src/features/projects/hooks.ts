import { useSupabaseQuery, useSupabasePaginatedQuery, useSupabaseSingleQuery } from '@/hooks/useSupabase';
import { Project } from '@/types';
import { useSettings } from '@/features/settings/hooks'
import { SECTION, SETTINGS_TYPE } from '@/types';

/**
 * Hook to fetch a single project by ID
 */
export function useProject(id: number) {
    return useSupabaseSingleQuery<Project>(
        ['project', String(id)],
        'projects',
        { id: `eq.${id}` },
    );
}
/**
 * Hook to fetch projects from Supabase
 */
export function useProjects(params?: Record<string, any>) {
    return useSupabaseQuery<Project>(['projects'], 'projects', params);
}

/**
 * Hook to fetch projects from Supabase with pagination
 */
export function usePaginatedProjects(page: number = 1, params?: Record<string, any>) {
    const DEFAULT_PAGE_SIZE = 3;
    const { data: settings } = useSettings({ section: SECTION.PROJECTS, type: SETTINGS_TYPE.PAGINATION });
    const pageSize = settings?.PAGE_SIZE ? Number(settings.PAGE_SIZE) : DEFAULT_PAGE_SIZE;

    return { ...useSupabasePaginatedQuery<Project>(['projects', 'paginated'], 'projects', page, pageSize, params), pageSize };
}
