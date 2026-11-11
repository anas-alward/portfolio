import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';

const userId = import.meta.env.VITE_SUPABASE_USER_ID;

/**
 * Builds the final query params: caller params win over defaults.
 */
function buildParams(params: Record<string, unknown> = {}) {
  return {
    order: 'order.asc',
    is_active: 'eq.true',
    ...(userId ? { user: `eq.${userId}` } : {}),
    ...params,
  };
}

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
  const finalParams = buildParams(params);

  return useQuery<TData[], Error>({
    queryKey: [...key, finalParams],
    queryFn: async () => {
      const { data } = await api.get<TData[]>(`/${table}`, {
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

  const finalParams = {
    ...buildParams(params),
    limit: 1, // Always limit to 1 for single record
  };

  return useQuery<TData | null, Error>({
    queryKey: [...key, finalParams],
    queryFn: async () => {
      const { data } = await api.get<TData[]>(`/${table}`, {
        params: finalParams,
      });
      return data[0] ?? null; // Return first item or null if not found
    },
    ...queryOptions,
  });
}