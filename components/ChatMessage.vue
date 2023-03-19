<template>
  <div :class="getConfig().bgClass" class="content p-5">
    <div class="flex justify-end px-6">
      <n-avatar>
        <i :class="getConfig().icon" class="block w-5 h-5" />
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

type MessageConfig = {
  bgClass: string;
  icon: string;
};

const props = defineProps<{ msg: Message }>();
const themeVars = useThemeVars();

function getConfig(): MessageConfig {
  switch (props.msg.author) {
    case MessageAuthor.AI:
      return { bgClass: 'bg-ai', icon: 'i-custom-openai' };

    case MessageAuthor.SYSTEM:
      return { bgClass: 'bg-system', icon: 'i-ph-monitor' };

    case MessageAuthor.USER:
      return { bgClass: 'bg-user', icon: 'i-ph-user' };
  }
}
</script>

<style scoped lang="scss">
.bg-ai {
  background: v-bind('themeVars.modalColor');
}

.bg-system {
  background: v-bind('themeVars.modalColor');

  .n-avatar {
    --n-color: v-bind('themeVars.borderColor') !important;
  }
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
