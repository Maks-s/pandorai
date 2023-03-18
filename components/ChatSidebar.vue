<template>
  <nav class="h-full flex flex-col p-4">
    <div class="flex-grow pb-4">
      <n-button block type="primary" ghost class="!justify-start">
        <i class="i-ph-plus w-4 h-4" />
        <span class="pl-2 pb-[2px]">{{ $t('NEW_CHAT') }}</span>
      </n-button>
    </div>

    <SettingsModal />
  </nav>
</template>
