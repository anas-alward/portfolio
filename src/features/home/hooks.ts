import { useSupabaseQuery, useSupabaseSingleQuery } from '@/hooks/useSupabase';
import { Profile, Contact } from '@/types';

/**
 * Hook to fetch profile from Supabase
 */
export function useProfile(params?: Record<string, any>) {
    return useSupabaseSingleQuery<Profile>(['profile'], 'profile', params);
}

/**
 * Hook to fetch socials from Supabase
 */
export function useSocials(params?: Record<string, any>) {
    return useSupabaseQuery<Contact>(['socials'], 'socials', params);
}
