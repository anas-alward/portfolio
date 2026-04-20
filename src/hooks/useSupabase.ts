import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabaseAxios } from '../lib/axios';

/**
 * Generic hook to fetch data from a Supabase table using Axios and React Query
 */
export function useSupabaseQuery<T, TData = T[]>(
    key: string[],
    table: string,
    params?: Record<string, any>,
    options?: Omit<UseQueryOptions<T[], Error, TData>, 'queryKey' | 'queryFn'>
) {
    const userId = import.meta.env.VITE_SUPABASE_USER_ID;
    const finalParams = {
        order: 'order.asc',
        is_active: 'eq.true',
        ...(userId ? { user: `eq.${userId}` } : {}),
        ...params,
    };

    return useQuery<T[], Error, TData>({
        queryKey: [...key, finalParams],
        queryFn: async () => {
            const { data } = await supabaseAxios.get<T[]>(`/${table}`, {
                params: finalParams,
            });
            return data;
        },
        ...options,
    });
}

/**
 * Specialized hook to fetch a single record from a Supabase table.
 * Automatically adds 'limit: 1' and returns the first item.
 */
export function useSupabaseSingleQuery<T>(
    key: string[],
    table: string,
    params?: Record<string, any>,
    options?: Omit<UseQueryOptions<T, Error>, 'queryKey' | 'queryFn'>
) {
    const userId = import.meta.env.VITE_SUPABASE_USER_ID;
    const finalParams = {
        is_active: 'eq.true',
        order: 'order.asc',
        ...(userId ? { user: `eq.${userId}` } : {}),
        ...params,
        limit: 1,
    };

    return useQuery<T, Error>({
        queryKey: [...key, finalParams],
        queryFn: async () => {
            const { data } = await supabaseAxios.get<T[]>(`/${table}`, {
                params: finalParams,
            });
            return data[0]; // Return the first item (single object)
        },
        ...options,
    });
}

/**
 * Hook for paginated Supabase queries.
 * Returns both the data and the total record count.
 */
export function useSupabasePaginatedQuery<T>(
    key: string[],
    table: string,
    _page: number = 1,
    _pageSize: number = 10,
    params?: Record<string, any>,
    options?: Omit<UseQueryOptions<{ data: T[], count: number | null, totalPages: number, pageSize: number }, Error>, 'queryKey' | 'queryFn'>
) {
    const userId = import.meta.env.VITE_SUPABASE_USER_ID;

    const finalParams = {
        ...(userId ? { user: `eq.${userId}` } : {}),
        is_active: 'eq.true',
        order: 'order.asc',
        ...params,
    };

    return useQuery<{ data: T[], count: number | null, totalPages: number, pageSize: number }, Error>({
        queryKey: [...key, finalParams],
        queryFn: async () => {
            const response = await supabaseAxios.get<T[]>(`/${table}`, {
                params: finalParams,
                headers: {
                    Prefer: 'count=exact',
                },
            });

            // PostgREST returns count in content-range header: e.g., "0-9/100"
            const contentRange = response.headers['content-range'];
            const count = contentRange ? parseInt(contentRange.split('/')[1], 10) : null;
            const totalPages = 1;

            return {
                data: response.data,
                count,
                totalPages,
                pageSize: _pageSize,
            };
        },
        ...options,
    });
}
