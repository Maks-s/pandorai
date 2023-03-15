<template>
  <n-layout has-sider class="h-screen w-screen">
    <n-layout-sider>
      <ChatSidebar />
    </n-layout-sider>

    <n-layout-content class="p-4">
      <div class="flex flex-col flex-grow h-full">
        <ChatEmpty class="flex-grow" />

        <n-input
          v-model:value="textToSend"
          type="textarea"
          tabindex="0"
          rows="1"
          class="textarea textarea-secondary resize-none"
          @keyup.enter="displayChat"
        />
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { useChatStore } from '~~/stores/chat';

const textToSend = ref<string>('');

function displayChat() {
  const settingsStore = useChatStore();
  settingsStore.sendMessage(textToSend.value);
}
</script>
