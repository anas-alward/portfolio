import { supabaseAxios } from '@/lib/axios';

export const getProjectDetails = async (id: string) => {
    const USER_ID = import.meta.env.VITE_SUPABASE_USER_ID;

    const { data } = await supabaseAxios.get('/project_details', {
        params: {
            id: `eq.${id}`,
            user: `eq.${USER_ID}`,
            select: '*'
        }
    });

    return data && data.length > 0 ? data[0] : null;
};