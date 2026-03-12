import { useSupabaseQuery } from './useSupabase';
import { Settings, DATA_TYPE } from '../types';

/**
 * Casts a string value to its appropriate data type.
 */
const castValue = (value: string, dataType: DATA_TYPE): unknown => {
    if (value === null || value === undefined) return value;

    switch (dataType) {
        case DATA_TYPE.INT:
            return parseInt(value, 10);
        case DATA_TYPE.FLOAT:
            return parseFloat(value);
        case DATA_TYPE.BOOLEAN:
            return value.toLowerCase() === 'true';
        case DATA_TYPE.ARRAY:
        case DATA_TYPE.OBJECT:
            try {
                return JSON.parse(value);
            } catch (e) {
                console.error(`Failed to parse setting value "${value}" as ${dataType}:`, e);
                return value;
            }
        default:
            return value;
    }
};

/**
 * Hook to fetch all global settings from the 'settings' table.
 * Caches the results indefinitely (staleTime: Infinity) so they are
 * downloaded only once per page reload.
 */
export function useSettings(filters?: Partial<Settings>) {
    return useSupabaseQuery<Settings, Record<string, unknown>>(
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
                    acc[item.name] = castValue(item.value, item.data_type);
                    return acc;
                }, {} as Record<string, unknown>);
            },
        }
    );
}
