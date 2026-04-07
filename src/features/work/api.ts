import { supabaseAxios } from '@/lib/axios';
import { Work } from '@/types/work';

export type ListWorkResponse = {
    data: Work[];
    count: number; 
    totalPages: number;
};

export const listWork = async (page = 1, pageSize = 3): Promise<ListWorkResponse> => {
    
    const USER_ID = import.meta.env.VITE_SUPABASE_USER_ID;
    const offset = (page - 1) * pageSize;

    const { data, headers } = await supabaseAxios.get<Work[]>('/work', {
        params: {
            select: '*,companies(*)',
            user: `eq.${USER_ID}`,
            limit: pageSize,
            offset: offset,
            order: 'order.asc'
        },
        headers: { 'Prefer': 'count=exact' }
    });

    const contentRange = headers['content-range'];
    
    const count = contentRange ? parseInt(contentRange.split('/')[1], 10) : 0;
    return {
        data: data || [],
        count,
        totalPages: Math.ceil(count / pageSize)
    };
};