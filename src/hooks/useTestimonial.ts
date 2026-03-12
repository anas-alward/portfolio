import { useSupabaseQuery, useSupabasePaginatedQuery } from './useSupabase';
import { Testimonial } from '../types';
import {useSettings} from './useSettings'
import { SECTION, SETTINGS_TYPE } from '../types';
/**
 * Hook to fetch skills from Supabase
 */
export function useTestimonials(params?: Record<string, any>) {
    return useSupabaseQuery<Testimonial>(['testimonials'], 'testimonials', params);
}

/**
 * Hook to fetch testimonials from Supabase with pagination
 */
export function usePaginatedTestimonials(page: number = 1, params?: Record<string, any>) {
    const DEFAULT_PAGE_SIZE = 3
    const { data: settings } = useSettings({ section: SECTION.TESTIMONIALS, type: SETTINGS_TYPE.PAGINATION })
    const pageSize = settings?.PAGE_SIZE ? Number(settings.PAGE_SIZE) : DEFAULT_PAGE_SIZE;
    return {...useSupabasePaginatedQuery<Testimonial>(['testimonials', 'paginated'], 'testimonials', page, pageSize, params), pageSize};
}
