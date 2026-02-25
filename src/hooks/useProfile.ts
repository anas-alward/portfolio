import { useSupabaseSingleQuery } from './useSupabase';
import { Profile } from '../types';

/**
 * Hook to fetch projects from Supabase
 */
export function useProfile(params?: Record<string, any>) {
    return useSupabaseSingleQuery<Profile>(['profile'], 'profile', params);
}
