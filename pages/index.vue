<template>
  <n-layout has-sider class="h-screen w-screen">
    <n-layout-sider>
      <ChatSidebar />
    </n-layout-sider>

    <n-layout-content>
      <div class="flex flex-col flex-grow h-full">
        <ChatEmpty v-if="chatStore.isEmpty" class="flex-grow" />
        <ChatConversation v-else class="flex-grow" />

        <ChatInput />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { useChatStore } from '~~/stores/chat';

const chatStore = useChatStore();
</script>
