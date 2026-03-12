import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Language } from '@/types';
import { useSettings } from './useSettings';
import { SECTION, SETTINGS_TYPE } from '@/types';
/**
 * Hook to fetch skills from Supabase
 */
export function useLanguages(params?: Record<string, any>) {
    return useSupabaseQuery<Language>(['languages'], 'languages', params);
}

/**
 * Hook to fetch languages from Supabase with pagination
 */
export function usePaginatedLanguages(page: number = 1, params?: Record<string, any>) {
    const DEFAULT_PAGE_SIZE = 3;
    const {data:settings} = useSettings({section:SECTION.LANGUAGES, type:SETTINGS_TYPE.PAGINATION});
    const pageSize = settings?.PAGE_SIZE ? Number(settings.PAGE_SIZE) : DEFAULT_PAGE_SIZE;
    return{...useSupabasePaginatedQuery<Language>(['languages', 'paginated'], 'languages', page, pageSize, params), pageSize};
}
