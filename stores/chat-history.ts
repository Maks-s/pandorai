import { defineStore } from 'pinia';
import { ChatSession, useChatStore } from './chat';

export const useChatHistoryStore = defineStore(
  'chat-history',
  () => {
    // Use ref because pinia-plugin-persistedstate has an issue with reactives
    // see https://github.com/prazdevs/pinia-plugin-persistedstate/issues/79
    const history = ref<ChatSession[]>([]);
    const chatStore = useChatStore();

    chatStore.$onAction(({ name }) => {
      if (name === 'sendMessage' && chatStore.isEmpty) {
        addToHistory(chatStore.chatSession);
      }
    });

    function addToHistory(chatSession: ChatSession) {
      history.value.push(chatSession);
    }

    function removeFromHistory(chatSession: ChatSession) {
      const i = history.value.indexOf(chatSession);
      if (i !== -1) {
        history.value.splice(i, 1);
      }
    }

    return { addToHistory, history, removeFromHistory };
  },
  {
    persist: true,
  }
);
