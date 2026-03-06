import { useSupabaseQuery } from './useSupabase';
import { Settings } from '../types';

/**
 * Hook to fetch all global settings from the 'settings' table.
 * Caches the results indefinitely (staleTime: Infinity) so they are
 * downloaded only once per page reload.
 */
export function useSettings(filters?: Partial<Settings>) {
    return useSupabaseQuery<Settings, Record<string, string>>(
        ['settings'],
        'settings',
        {
            order: undefined,
        },
        {
            staleTime: Infinity,
            select: (data) => {
                const filtered = !filters
                    ? data
                    : data.filter((item) => {
                        return Object.entries(filters).every(([key, value]) => {
                            if (value === undefined) return true;
                            return item[key as keyof Settings] === value;
                        });
                    });

                return filtered.reduce((acc, item) => {
                    acc[item.name] = item.value;
                    return acc;
                }, {} as Record<string, string>);
            },
        }
    );
}
