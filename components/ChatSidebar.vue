<template>
  <nav class="h-full flex flex-col p-4">
    <n-space vertical :size="20" class="flex-grow pb-4">
      <n-button
        block
        type="primary"
        ghost
        class="!justify-start"
        @click="chatStore.resetChatSession"
      >
        <i class="i-ph-plus w-4 h-4" />
        <span class="pl-2 pb-[2px]">{{ $t('NEW_CHAT') }}</span>
      </n-button>

      <n-input
        type="text"
        :placeholder="$t('SEARCH')"
        @input="doSearch"
      ></n-input>

      <n-space vertical>
        <n-button
          v-for="chatSession in history"
          :key="chatSession.title"
          block
          ghost
          class="!justify-start"
          @click="setCurrentChat(chatSession)"
        >
          <span>{{ chatSession.title }}</span>
        </n-button>
      </n-space>
    </n-space>

    <SettingsModal />
  </nav>
</template>

<script setup lang="ts">
import { ChatSession, useChatStore } from '~~/stores/chat';
import { useChatHistoryStore } from '~~/stores/chat-history';

const chatHistoryStore = useChatHistoryStore();
const chatStore = useChatStore();
const history = ref(chatHistoryStore.history);

function doSearch(search: string) {
  if (search) {
    const lowSearch = search;
    history.value = chatHistoryStore.history.filter((v) =>
      v.title.toLowerCase().includes(lowSearch)
    );
    return;
  }

  history.value = chatHistoryStore.history;
}

function setCurrentChat(chatSession: ChatSession) {
  chatStore.chatSession = chatSession;
}
</script>
