<template>
  <div class="p-4">
    <n-input
      v-if="showSystemMsg"
      v-model:value="systemMsg"
      type="textarea"
      :placeholder="$t('SYSTEM_MESSAGE')"
      :resizable="false"
      rows="1"
      class="mb-3"
    >
      <template #suffix>
        <i
          class="i-ph-floppy-disk w-5 h-5 cursor-pointer"
          @click="setSystemMessage"
        />
      </template>
    </n-input>

    <div class="flex items-center">
      <ChatInputText @send-chat="setSystemMessage" />

      <n-dropdown trigger="click" :options="moreOptions">
        <n-button quaternary circle class="!ml-2">
          <template #icon>
            <n-icon size="1.5rem">
              <i class="block i-ph-dots-three-vertical" />
            </n-icon>
          </template>
        </n-button>
      </n-dropdown>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DropdownOption } from 'naive-ui';
import { useChatStore } from '~~/stores/chat';
import { useSettingsStore } from '~~/stores/settings';

const i18n = useI18n();
const chatStore = useChatStore();
const settingsStore = useSettingsStore();
const showSystemMsg = ref(true);
const systemMsg = ref(settingsStore.defaultSystemMessage);

function setSystemMessage() {
  if (
    !systemMsg.value ||
    chatStore.getSystemMessage?.content === systemMsg.value ||
    !chatStore.currentMessage
  ) {
    return;
  }

  chatStore.setSystemMessage(systemMsg.value.trim());
  showSystemMsg.value = false;
}

const moreOptions: DropdownOption[] = [
  {
    label: i18n.t('SHOW_SYSTEM_MESSAGE'),
    props: {
      onClick: () => {
        showSystemMsg.value = !showSystemMsg.value;
      },
    },
  },
  {
    label: i18n.t('SEND_WITHOUT_HISTORY'),
    props: {
      onClick: () => {
        chatStore.sendMessage(false);
      },
    },
  },
];

chatStore.$onAction(({ name }) => {
  if (name !== 'sendMessage') {
    return;
  }

  setSystemMessage();
});
</script>
