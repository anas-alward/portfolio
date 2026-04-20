import { supabaseAxios } from '@/lib/axios';
import { Work } from '@/types/work';

export type ListWorkResponse = {
    data: Work[];
    count: number;
    totalPages: number;
};

/**
 * Fetch all work items from Supabase
 */
export const listWork = async (): Promise<ListWorkResponse> => {

    const USER_ID = import.meta.env.VITE_SUPABASE_USER_ID;

    const { data, headers } = await supabaseAxios.get<Work[]>('/work', {
        params: {
            select: '*,companies(*)',
            user: `eq.${USER_ID}`,
            order: 'order.asc'
        },
        headers: { 'Prefer': 'count=exact' }
    });

    const contentRange = headers['content-range'];

    const count = contentRange ? parseInt(contentRange.split('/')[1], 10) : 0;
    return {
        data: data || [],
        count,
        totalPages: 1
    };
};

export const getWorkDetails = async (workId: string): Promise<Work | null> => {
    const USER_ID = import.meta.env.VITE_SUPABASE_USER_ID;

    const { data } = await supabaseAxios.get<Work[]>('/work_details', {
        params: {
            select: '*',
            id: `eq.${workId}`,
            ...(USER_ID ? { user: `eq.${USER_ID}` } : {}),
            limit: 1,
        },
    });

    return data?.[0] || null;
};