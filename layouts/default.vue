<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-theme-editor>
      <slot />
    </n-theme-editor>
  </n-config-provider>
</template>

<script setup lang="ts">
import { GlobalThemeOverrides, NThemeEditor } from 'naive-ui';

const themeOverrides: GlobalThemeOverrides = {
  common: {
    baseColor: '#ffffffff',
    primaryColor: '#38bdf8FF',
    primaryColorHover: '#08a5ebFF',
    primaryColorPressed: '#08a5ebFF',
    primaryColorSuppl: '#002a3dFF',
    infoColor: '#0ca5e9FF',
    infoColorHover: '#0ca5e9ff',
    infoColorPressed: '#0ca5e9ff',
    infoColorSuppl: '#0ca5e9ff',
    successColor: '#2dd4bfFF',
    successColorHover: '#2dd4bfFF',
    successColorPressed: '#2dd4bfFF',
    successColorSuppl: '#2dd4bfFF',
    warningColor: '#f4bf50FF',
    warningColorHover: '#f4bf50FF',
    warningColorPressed: '#f4bf50FF',
    warningColorSuppl: '#f4bf50FF',
    errorColor: '#fb7085FF',
    errorColorHover: '#fb7085FF',
    errorColorPressed: '#fb7085FF',
    errorColorSuppl: '#fb7085FF',
    textColorBase: '#b4c6efFF',
    textColor1: '#b5cdf5FF',
    textColor2: '#b4c6efFF',
    textColor3: '#b5cdf5ff',
    bodyColor: '#0f172aFF',
    modalColor: '#0e1526FF',
    cardColor: '#1e293bFF',
    tableColor: '#1e293bFF',
    popoverColor: '#1e293bFF',
    tagColor: '#0c1322FF',
    inputColor: '#1e293bff',
    codeColor: '#1e293bff',
    tabColor: '#0f172aff',
    actionColor: '#1e293bff',
    tableHeaderColor: '#1e293bff',
    hoverColor: '#f3f3f5',
    borderColor: '#b5cdf5FF',
    dividerColor: '#b5cdf5FF',
  },
};
</script>
