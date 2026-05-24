import { api } from '@/lib/api';
import { Metadata } from '@/types/metadata';

export const fetchSiteMetadata = async () => {
    const { data } = await api.get<Metadata[]>(`/metadata`);
    return data;
};