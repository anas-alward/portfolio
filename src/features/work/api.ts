import { api } from '@/lib/api';
import { Work } from '@/types/work';


export const getWorkDetails = async (workId: string): Promise<Work | null> => {
    const { data } = await api.get<Work[]>('/work_details', {
        params: {
            id: `eq.${workId}`,
            limit: 1,
        },
    });

    return data?.[0] || null;
};