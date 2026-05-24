import { create } from 'zustand';
import type { Settings } from '@/types';

interface SettingsStore {
  settings: Record<string, Settings> | null;
  setSettings: (settings: Settings[]) => void;
  getSettings: (name: string) => Settings | undefined;
}

export const useSettingsStore = create<SettingsStore>((set, get) => ({
  settings: null,

  setSettings: (settings) => {
    const settingsMap: Record<string, Settings> = {};

    settings.forEach((setting) => {
      settingsMap[setting.name] = setting;
    });

    set({ settings: settingsMap });
  },

  getSettings: (name: string) => {
    return get().settings?.[name];
  },
}));