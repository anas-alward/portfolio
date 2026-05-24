import { supabaseAxios } from '@/lib/axios';
import { Metadata } from '@/types/metadata';

export const fetchSiteMetadata = async () => {
    const { data } = await supabaseAxios.get<Metadata[]>(`/metadata`);
    return data;
};