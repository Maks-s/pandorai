<template>
  <main>
    <ChatMessage
      v-for="msg of chatStore.messages"
      :key="msg.content"
      :msg="msg"
    />
  </main>
</template>

<script setup lang="ts">
import { useChatStore } from '~~/stores/chat';

const chatStore = useChatStore();
</script>
