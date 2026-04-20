import { useSupabaseQuery, useSupabasePaginatedQuery } from '@/hooks/useSupabase';
import { Certificate } from '@/types';

/**
 * Hook to fetch certificates from Supabase
 */
export function useCertificates(params?: Record<string, any>) {
    return useSupabaseQuery<Certificate>(['certificates'], 'certificates', params);
}

/**
 * Hook to fetch certificates from Supabase (formerly paginated, now returns all)
 */
export function usePaginatedCertificates(params?: Record<string, any>) {
    return { ...useSupabasePaginatedQuery<Certificate>(['certificates', 'paginated'], 'certificates', 1, 10, params), pageSize: 10 };
}
