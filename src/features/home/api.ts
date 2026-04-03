import { supabaseAxios } from '@/lib/axios';

export const fetchSiteMetadata = async () => {
    const USER_ID = import.meta.env.VITE_SUPABASE_USER_ID;
    const { data } = await supabaseAxios.get(`/metadata?select=*&user=eq.${USER_ID}`);
    return data;
};