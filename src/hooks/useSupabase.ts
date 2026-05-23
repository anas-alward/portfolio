import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { supabaseAxios } from '../lib/axios';

/**
 * Hook to fetch multiple records from a Supabase table.
 * @param options - Configuration object
 * @returns React Query result object with data: T[] | undefined
 */
export function useSupabaseQuery<TData>(
  options: Omit<UseQueryOptions<TData[], Error>, 'queryKey' | 'queryFn'> & {
    key: string[];
    table: string;
    params?: Record<string, unknown>;
  }
) {
  const { key, table, params = {}, ...queryOptions } = options;
  const userId = import.meta.env.VITE_SUPABASE_USER_ID;

  // Build final params with default filters
  const finalParams = {
    order: 'order.asc',
    is_active: 'eq.true',
    ...(userId ? { user: `eq.${userId}` } : {}),
    ...params,
  };

  return useQuery<TData[], Error>({
    queryKey: [...key, finalParams],
    queryFn: async () => {
      const { data } = await supabaseAxios.get<TData[]>(`/${table}`, {
        params: finalParams,
      });
      return data;
    },
    ...queryOptions,
  });
}

/**
 * Hook to fetch a single record from a Supabase table.
 * @param options - Configuration object
 * @returns React Query result object with data: T | null | undefined
 */
export function useSupabaseSingleQuery<TData>(
  options: Omit<UseQueryOptions<TData | null, Error>, 'queryKey' | 'queryFn'> & {
    key: string[];
    table: string;
    params?: Record<string, unknown>;
  }
) {
  const { key, table, params = {}, ...queryOptions } = options;
  const userId = import.meta.env.VITE_SUPABASE_USER_ID;

  // Build final params with default filters
  const finalParams = {
    order: 'order.asc',
    is_active: 'eq.true',
    ...(userId ? { user: `eq.${userId}` } : {}),
    ...params,
    limit: 1, // Always limit to 1 for single record
  };

  return useQuery<TData | null, Error>({
    queryKey: [...key, finalParams],
    queryFn: async () => {
      const { data } = await supabaseAxios.get<TData[]>(`/${table}`, {
        params: finalParams,
      });
      return data[0] ?? null; // Return first item or null if not found
    },
    ...queryOptions,
  });
}