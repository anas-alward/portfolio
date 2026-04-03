import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Work } from '../types';
import { useSettings } from './useSettings'
import { SECTION, SETTINGS_TYPE } from '../types';

/**
 * Hook to fetch skills from Supabase
 */
export function useWork(params?: Record<string, any>) {
    return useSupabaseQuery<Work>(['work'], 'work', params);
}

/**
 * Hook to fetch work from Supabase with pagination
 */
export function usePaginatedWork(page: number = 1, params?: Record<string, any>) {
    const DEFAULT_PAGE_SIZE = 3;
    const { data: settings } = useSettings({ section: SECTION.WORK, type: SETTINGS_TYPE.PAGINATION })
    const pageSize = settings?.PAGE_SIZE ? Number(settings.PAGE_SIZE) : DEFAULT_PAGE_SIZE;

    const finalParams = {
        select: '*,companies(*)',
        ...params
    };

    return { ...useSupabasePaginatedQuery<Work>(['work', 'paginated'], 'work', page, pageSize, finalParams), pageSize };
}
