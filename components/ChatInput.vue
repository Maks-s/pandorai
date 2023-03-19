<template>
  <div class="p-4">
    <n-input
      v-if="showSystemMsg"
      v-model:value.trim="systemMsg"
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
      <n-input
        v-model:value.trim="msg"
        type="textarea"
        :placeholder="$t('MESSAGE')"
        :resizable="false"
        autofocus
        rows="1"
        @keyup.enter="sendChat"
      >
        <template #suffix>
          <i
            class="i-ph-paper-plane-tilt w-5 h-5 cursor-pointer"
            @click="sendChat"
          />
        </template>
      </n-input>

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

const chatStore = useChatStore();
const settingsStore = useSettingsStore();
const msg = ref('');
const showSystemMsg = ref(true);
const systemMsg = ref(settingsStore.defaultSystemMessage);

function sendChat() {
  if (!msg.value) {
    return;
  }

  if (chatStore.getSystemMessage?.content !== systemMsg.value) {
    setSystemMessage();
  }

  chatStore.sendMessage(msg.value);
  msg.value = '';
}

function setSystemMessage() {
  chatStore.setSystemMessage(systemMsg.value);
  showSystemMsg.value = false;
}

const moreOptions: DropdownOption[] = [
  {
    label: 'Show system message',
    props: {
      onClick: () => {
        showSystemMsg.value = !showSystemMsg.value;
      },
    },
  },
];
</script>
