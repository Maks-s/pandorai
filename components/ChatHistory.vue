<template>
  <div>
    <n-input
      v-model:value="search"
      type="text"
      :placeholder="$t('SEARCH')"
    ></n-input>

    <n-space vertical class="mt-4">
      <ChatHistoryItem
        v-for="(item, index) of history"
        :key="index"
        :item="item"
        @change-title="item.title = $event"
        @remove="chatHistoryStore.removeFromHistory(item)"
      />
    </n-space>
  </div>
</template>

<script setup lang="ts">
import { useChatHistoryStore } from '~~/stores/chat-history';

const chatHistoryStore = useChatHistoryStore();
const props = defineProps<{ filter?: string }>();
const search = ref('');

const history = computed(() => {
  if (!props.filter) {
    return chatHistoryStore.history;
  }

  const lowSearch = props.filter.toLowerCase();
  return chatHistoryStore.history.filter((v) =>
    v.title.toLowerCase().includes(lowSearch)
  );
});
</script>
