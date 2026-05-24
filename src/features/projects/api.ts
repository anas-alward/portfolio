import { supabaseAxios } from '@/lib/axios';
import { Project } from '@/types/projects';

export const getProjectDetails = async (id: string) => {
    const { data } = await supabaseAxios.get<Project[]>('/project_details', {
        params: {
            id: `eq.${id}`
        }
    });
    return data && data.length > 0 ? data[0] : null;
};