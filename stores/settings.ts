import { defineStore } from 'pinia';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const apiKey = ref('');
    const defaultSystemMessage = ref('');

    return { apiKey, defaultSystemMessage };
  },
  {
    persist: true,
  }
);
