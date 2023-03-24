<template>
  <nav class="h-full flex flex-col p-4">
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

    <ChatHistory class="flex-grow mt-4" />

    <SettingsModal />
  </nav>
</template>

<script setup lang="ts">
import { useChatStore } from '~~/stores/chat';

const chatStore = useChatStore();
</script>
