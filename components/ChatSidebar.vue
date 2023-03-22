<template>
  <nav class="h-full flex flex-col p-4">
    <div class="flex-grow pb-4">
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

      <h4 class="text-center mt-6 text-lg font-bold">
        {{ $t('CHAT_HISTORY') }}
      </h4>

      <div>
        <n-button
          v-for="chatSession in chatHistoryStore.history"
          :key="chatSession.title"
          block
          ghost
          class="!justify-start !my-3"
          @click="setCurrentChat(chatSession)"
        >
          <span>{{ chatSession.title }}</span>
        </n-button>
      </div>
    </div>

    <SettingsModal />
  </nav>
</template>

<script setup lang="ts">
import { ChatSession, useChatStore } from '~~/stores/chat';
import { useChatHistoryStore } from '~~/stores/chat-history';

const chatHistoryStore = useChatHistoryStore();
const chatStore = useChatStore();

function setCurrentChat(chatSession: ChatSession) {
  chatStore.chatSession = chatSession;
}
</script>
