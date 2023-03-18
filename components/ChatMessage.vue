<template>
  <div :class="isAI ? 'bg-ai' : 'bg-user'" class="content p-5">
    <div class="flex justify-end px-6">
      <n-avatar>
        <i
          :class="isAI ? 'i-custom-openai' : 'i-ph-user'"
          class="block w-5 h-5"
        />
      </n-avatar>
    </div>

    <ins class="whitespace-pre-wrap no-underline w-3xl">
      {{ msg.content }}
    </ins>
  </div>
</template>

<script setup lang="ts">
import { useThemeVars } from 'naive-ui';
import { Message, MessageAuthor } from '~~/stores/chat';

const props = defineProps<{ msg: Message }>();
const isAI = props.msg.author === MessageAuthor.AI;
const themeVars = useThemeVars();
</script>

<style scoped lang="scss">
.bg-ai {
  background: v-bind('themeVars.modalColor');
}

.bg-user {
  background: v-bind('themeVars.cardColor');

  .n-avatar {
    --n-color: v-bind('themeVars.primaryColor') !important;
  }
}

.content {
  display: grid;
  /* Allows center to be bigger than the sides */
  grid-template-columns: 1fr auto 1fr;
}
</style>
