import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Certificate } from '../types';
import { useSettings } from './useSettings';
import { SECTION, SETTINGS_TYPE } from '../types';

/**
 * Hook to fetch certificates from Supabase
 */
export function useCertificates(params?: Record<string, any>) {
    return useSupabaseQuery<Certificate>(['certificates'], 'certificates', params);
}

/**
 * Hook to fetch certificates from Supabase with pagination
 */
export function usePaginatedCertificates(page: number = 1, params?: Record<string, any>) {
    const DEFAULT_PAGE_SIZE = 5;
    const { data: settings } = useSettings({ section: SECTION.CERTIFICATES, type: SETTINGS_TYPE.PAGINATION });
    const pageSize = settings?.PAGE_SIZE ? Number(settings.PAGE_SIZE) : DEFAULT_PAGE_SIZE;
    return { ...useSupabasePaginatedQuery<Certificate>(['certificates', 'paginated'], 'certificates', page, pageSize, params), pageSize };
}
