import { useQuery, UseQueryOptions } from '@tanstack/react-query';
import { api } from '@/lib/api';

/**
 * Merges caller params over hook-level defaults, dropping undefined values.
 *
 * Default request filters (`is_active`, `user`) are applied by the api layer
 * (`src/lib/api.ts`), so they are not duplicated here. Passing `undefined`
 * for a param opts out of the corresponding default (e.g. a table without
 * an `order` column).
 */
function buildParams(params: Record<string, unknown> = {}) {
  const merged = { order: 'order.asc', ...params };
  return Object.fromEntries(
    Object.entries(merged).filter(([, value]) => value !== undefined)
  );
}

/** Fetches all rows matching params from a Supabase table. */
async function fetchTable<T>(table: string, params: Record<string, unknown>, signal?: AbortSignal) {
  const { data } = await api.get<T[]>(`/${table}`, { params, signal });
  return data;
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
    // React Query aborts this signal when the query is cancelled (e.g. the
    // last component using it unmounts), so in-flight requests don't linger.
    queryFn: ({ signal }) => fetchTable<TData>(table, finalParams, signal),
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
    queryFn: async ({ signal }) => {
      const data = await fetchTable<TData>(table, finalParams, signal);
      return data[0] ?? null; // Return first item or null if not found
    },
    ...queryOptions,
  });
}