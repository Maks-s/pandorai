import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  const apiKey = ref('sk-...');

  return { apiKey };
});
