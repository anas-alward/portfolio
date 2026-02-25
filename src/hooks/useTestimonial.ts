import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Testimonial } from '../types';

/**
 * Hook to fetch skills from Supabase
 */
export function useTestimonials(params?: Record<string, any>) {
    return useSupabaseQuery<Testimonial>(['testimonials'], 'testimonials', params);
}

/**
 * Hook to fetch testimonials from Supabase with pagination
 */
export function usePaginatedTestimonials(page: number = 1, pageSize: number = 3, params?: Record<string, any>) {
    return useSupabasePaginatedQuery<Testimonial>(['testimonials', 'paginated'], 'testimonials', page, pageSize, params);
}
