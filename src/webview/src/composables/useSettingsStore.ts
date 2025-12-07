import { useSignal } from '@gn8/alien-signals-vue';
import type { Ref } from 'vue';
import type { SettingsStore, SettingsState } from '../core/SettingsStore';

let storeInstance: SettingsStore | null = null;

export function initSettingsStore(store: SettingsStore) {
  storeInstance = store;
}

export interface UseSettingsStoreReturn {
  settings: Readonly<Ref<SettingsState>>;
  updateSetting: <K extends keyof SettingsState>(key: K, value: SettingsState[K]) => void;
}

export function useSettingsStore(): UseSettingsStoreReturn {
  if (!storeInstance) {
    throw new Error('SettingsStore not initialized');
  }

  const settings = useSignal(storeInstance.settings);

  const updateSetting = storeInstance.updateSetting.bind(storeInstance);

  return {
    settings,
    updateSetting,
  };
}
