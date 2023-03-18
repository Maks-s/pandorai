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

        <label class="label">
          <span class="label-text">{{ $t('OPENAI_API_KEY') }}</span>
        </label>
        <n-input
          v-model:value.trim="apiKeyInput"
          type="text"
          placeholder="sk-..."
          tabindex="0"
        />

        <div class="mt-5 flex justify-end">
          <n-button type="success" @click="save">
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
const apiKeyInput = ref('');

apiKeyInput.value = settingsStore.apiKey.valueOf();

function save() {
  settingsStore.apiKey = apiKeyInput.value;
}
</script>
