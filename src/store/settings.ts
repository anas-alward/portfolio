import { create } from 'zustand';
import { supabaseAxios } from '@/lib/axios';
import type { Settings } from '@/types';

interface SettingsStore {
  settings: Record<string, Record<string, Settings>> | null;
  loading: boolean;
  error: string | null;
  fetchSettings: () => Promise<void>;
  getSetting: (section: string, type: string) => Settings | undefined;
  initialize: () => Promise<void>;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: null,
  loading: false,
  error: null,

  fetchSettings: async () => {
    set({ loading: true, error: null });
    try {

      const { data } = await supabaseAxios.get<Settings[]>('/settings');
      const settingsMap: Record<string, Record<string, Settings>> = {};
      data?.forEach(setting => {
        if (!settingsMap[setting.section]) {
          settingsMap[setting.section] = {};
        }
        settingsMap[setting.section][setting.type] = setting;
      });

      set({ settings: settingsMap, loading: false });
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed to fetch settings', loading: false });
    }
  },

  getSetting: (section: string, type: string) => {
    return get().settings?.[section]?.[type];
  },

  initialize: async () => {
    if (get().settings === null && !get().loading) {
      await get().fetchSettings();
    }
  }
}));