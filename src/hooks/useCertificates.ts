import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Certificate } from '../types';

/**
 * Hook to fetch certificates from Supabase
 */
export function useCertificates(params?: Record<string, any>) {
    return useSupabaseQuery<Certificate>(['certificates'], 'certificates', params);
}

/**
 * Hook to fetch certificates from Supabase with pagination
 */
export function usePaginatedCertificates(page: number = 1, pageSize: number = 6, params?: Record<string, any>) {
    return useSupabasePaginatedQuery<Certificate>(['certificates', 'paginated'], 'certificates', page, pageSize, params);
}
