<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-theme-editor>
      <slot />
    </n-theme-editor>
  </n-config-provider>
</template>

<script setup lang="ts">
import { GlobalThemeOverrides, NThemeEditor } from 'naive-ui';

const themeColors = {
  primary: '#38bdf8',
  primaryFocus: '#08a5eb',
  primaryContent: '#002a3d',
  secondary: '#818cf8',
  secondaryFocus: '#3a4bf4',
  secondaryContent: '#00074b',
  accent: '#f471b5',
  accentFocus: '#ef2f92',
  accentContent: '#470025',
  neutral: '#1e293b',
  neutralFocus: '#273449',
  base100: '#0f172a',
  base200: '#0e1526',
  base300: '#0c1322',
  info: '#0ca5e9',
  success: '#2dd4bf',
  warning: '#f4bf50',
  error: '#fb7085',
  border: '#34466f',
  text: '#b4c6ef',
};

const themeOverrides: GlobalThemeOverrides = {
  common: {
    avatarColor: themeColors.secondary,
    baseColor: 'white',
    primaryColor: themeColors.primary,
    primaryColorHover: themeColors.primaryFocus,
    primaryColorPressed: themeColors.primaryFocus,
    primaryColorSuppl: themeColors.primaryFocus,
    infoColor: themeColors.info,
    infoColorHover: themeColors.info,
    infoColorPressed: themeColors.info,
    infoColorSuppl: themeColors.info,
    successColor: themeColors.success,
    successColorHover: themeColors.success,
    successColorPressed: themeColors.success,
    successColorSuppl: themeColors.success,
    warningColor: themeColors.warning,
    warningColorHover: themeColors.warning,
    warningColorPressed: themeColors.warning,
    warningColorSuppl: themeColors.warning,
    errorColor: themeColors.error,
    errorColorHover: themeColors.error,
    errorColorPressed: themeColors.error,
    errorColorSuppl: themeColors.error,
    textColorBase: themeColors.text,
    textColor1: themeColors.text,
    textColor2: themeColors.text,
    textColor3: themeColors.text,
    bodyColor: themeColors.neutral,
    modalColor: themeColors.base300,
    cardColor: themeColors.base100,
    tableColor: themeColors.neutral,
    popoverColor: themeColors.neutral,
    tagColor: themeColors.base300,
    inputColor: themeColors.base100,
    codeColor: themeColors.neutral,
    tabColor: themeColors.neutral,
    actionColor: themeColors.neutral,
    tableHeaderColor: themeColors.neutral,
    hoverColor: themeColors.text,
    borderColor: themeColors.border,
    dividerColor: themeColors.text,
  },
};
</script>
