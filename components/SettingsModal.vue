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
        <n-input type="text" placeholder="sk-..." />

        <n-button type="success">
          {{ $t('SAVE') }}
        </n-button>
      </n-card>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
const show = ref(false);
</script>
