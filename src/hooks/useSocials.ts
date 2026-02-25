import { useSupabaseQuery } from './useSupabase';
import { Contact } from '../types';

/**
 * Hook to fetch projects from Supabase
 */
export function useSocials(params?: Record<string, any>) {
    return useSupabaseQuery<Contact>(['socials'], 'socials', params);
}
