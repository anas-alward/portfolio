import { create } from 'zustand';
import type { Settings } from '@/types';

interface SettingsStore {
  settings: Record<string, Settings> | null;
  setSettings: (settings: Settings[]) => void;
}

export const useSettingsStore = create<SettingsStore>((set) => ({
  settings: null,

  setSettings: (settings) =>
    set({
      settings: Object.fromEntries(settings.map((s) => [s.name, s])),
    }),
}));

export function useSettings(name: string): Settings | undefined {
  return useSettingsStore((state) => state.settings?.[name]);
}