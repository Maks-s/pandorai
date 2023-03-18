import { defineStore } from 'pinia';

export const useSettingsStore = defineStore(
  'settings',
  () => {
    const apiKey = ref('');

    return { apiKey };
  },
  {
    persist: {
      storage: persistedState.localStorage,
    },
  }
);
