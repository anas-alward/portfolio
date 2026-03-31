// src/api/metadata.ts
import { supabaseAxios } from '@/lib/axios'; // Adjust path to your axios file

export const fetchSiteMetadata = async () => {
    const USER_ID = import.meta.env.VITE_SUPABASE_USER_ID;
    const { data } = await supabaseAxios.get(`/metadata?select=*&user=eq.${USER_ID}`);
    return data; // Return all metadata rows
};