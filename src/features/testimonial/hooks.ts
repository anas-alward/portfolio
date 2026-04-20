import { useSupabaseQuery, useSupabasePaginatedQuery } from '@/hooks/useSupabase';
import { Testimonial } from '@/types';

/**
 * Hook to fetch testimonials from Supabase
 */
export function useTestimonials(params?: Record<string, any>) {
    return useSupabaseQuery<Testimonial>(['testimonials'], 'testimonials', params);
}

/**
 * Hook to fetch testimonials from Supabase (formerly paginated, now returns all)
 */
export function usePaginatedTestimonials(params?: Record<string, any>) {
    return { ...useSupabasePaginatedQuery<Testimonial>(['testimonials', 'paginated'], 'testimonials', 1, 10, params), pageSize: 10 };
}
