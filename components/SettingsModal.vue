<template>
  <div>
    <n-button block class="!justify-start" @click="show = true">
      <i class="i-ph-gear h-5 w-5" />
      <span class="pl-2 pb-[2px]">{{ $t('SETTINGS') }}</span>
    </n-button>

    <n-modal v-model:show="show">
      <n-card
        :bordered="false"
        role="dialog"
        aria-modal="true"
        class="max-w-md"
      >
        <h1 class="text-lg font-bold pb-3">
          {{ $t('SETTINGS') }}
        </h1>

        <n-form :model="settingsForm">
          <n-form-item :label="$t('OPENAI_API_KEY')" path="apiKey">
            <n-input
              v-model:value.trim="settingsForm.apiKey"
              type="text"
              placeholder="sk-..."
            />
          </n-form-item>

          <n-form-item :label="$t('DEFAULT_SYSTEM_MESSAGE')">
            <n-input
              v-model:value="settingsForm.defaultSystemMessage"
              type="text"
              :placeholder="$t('DEFAULT_SYSTEM_MESSAGE_PLACEHOLDER')"
            ></n-input>
          </n-form-item>
        </n-form>

        <div class="mt-5 flex justify-end">
          <n-button @click="cancel">
            {{ $t('CANCEL') }}
          </n-button>

          <n-button type="success" class="!ml-4" @click="save">
            {{ $t('SAVE') }}
          </n-button>
        </div>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { useSettingsStore } from '~~/stores/settings';

const show = ref(false);
const settingsStore = useSettingsStore();

const settingsForm = reactive({
  apiKey: settingsStore.apiKey.valueOf(),
  defaultSystemMessage: settingsStore.defaultSystemMessage.valueOf(),
});

function cancel() {
  show.value = false;
  settingsForm.apiKey = settingsStore.apiKey;
  settingsForm.defaultSystemMessage = settingsStore.defaultSystemMessage;
}

function save() {
  settingsStore.apiKey = settingsForm.apiKey;
  settingsStore.defaultSystemMessage = settingsForm.defaultSystemMessage;
  show.value = false;
}
</script>
