<template>
  <n-layout has-sider class="h-screen w-screen">
    <n-layout-sider>
      <ChatSidebar />
    </n-layout-sider>

    <n-layout-content>
      <div class="flex flex-col flex-grow h-full">
        <ChatEmpty v-if="chatStore.isEmpty" class="flex-grow" />
        <ChatConversation v-else class="flex-grow" />

        <div class="p-4">
          <n-input
            v-model:value="textToSend"
            type="textarea"
            :resizable="false"
            rows="1"
            tabindex="0"
            class="textarea textarea-secondary"
            @keyup.enter="displayChat"
          />
        </div>
      </div>
    </n-layout-content>
  </n-layout>
</template>

<script setup lang="ts">
import { useChatStore } from '~~/stores/chat';

const textToSend = ref<string>('');
const chatStore = useChatStore();

function displayChat() {
  chatStore.sendMessage(textToSend.value);
}
</script>
