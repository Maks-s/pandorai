<template>
  <n-input
    v-model:value="chatStore.currentMessage"
    type="textarea"
    :placeholder="$t('MESSAGE')"
    :resizable="false"
    autofocus
    rows="1"
    @keydown="handleKeyDown"
  >
    <template #suffix>
      <i
        class="i-ph-paper-plane-tilt w-5 h-5 cursor-pointer"
        @click="chatStore.sendMessage"
      />
    </template>
  </n-input>
</template>

<script setup lang="ts">
import { useChatStore } from '~~/stores/chat';

const chatStore = useChatStore();

function handleKeyDown(e: KeyboardEvent) {
  // Don't repeat when holding down a key
  if (e.repeat) {
    return;
  }

  // Send when pressing Enter, except if shift is pressed
  if (!e.shiftKey && e.key === 'Enter') {
    chatStore.sendMessage();
  }
}
</script>
