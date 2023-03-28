<template>
  <n-input
    v-model:value.trim="msg"
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
        @click="sendChat"
      />
    </template>
  </n-input>
</template>

<script setup lang="ts">
import { useChatStore } from '~~/stores/chat';
import { useChatHistoryStore } from '~~/stores/chat-history';

const emit = defineEmits<{ (e: 'sendChat', content: string): void }>();
const chatStore = useChatStore();
const chatHistoryStore = useChatHistoryStore();
const msg = ref('');

function handleKeyDown(e: KeyboardEvent) {
  // Don't repeat when holding down a key
  if (e.repeat) {
    return;
  }

  // Send when pressing Enter, except if shift is pressed
  if (!e.shiftKey && e.key === 'Enter') {
    msg.value = msg.value.trim();
    sendChat();
  }
}

function sendChat() {
  if (!msg.value) {
    return;
  }

  if (chatStore.isEmpty) {
    chatHistoryStore.addToHistory(chatStore.chatSession);
  }

  emit('sendChat', msg.value);
  chatStore.sendMessage(msg.value);
  msg.value = '';
}
</script>
