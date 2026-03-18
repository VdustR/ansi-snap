<script setup lang="ts">
import { useSettings } from "../../composables/useSettings";
import type { Theme } from "../../constants/themes";
import ThemeCombobox from "../ui/ThemeCombobox.vue";
import ColorPicker from "../ui/ColorPicker.vue";

const { settings, applyTheme, updateSetting } = useSettings();

function onThemeSelect(theme: Theme) {
  applyTheme(theme.name, theme);
}
</script>

<template>
  <section class="settings-section">
    <h3 class="section-title">Theme</h3>
    <p class="section-hint">
      Theme sets the background and default text color. Text with explicit terminal colors (ANSI)
      keeps its original color.
    </p>
    <ThemeCombobox :model-value="settings.themeName" @select="onThemeSelect" />
    <div class="color-pickers">
      <ColorPicker
        label="Background"
        :model-value="settings.backgroundColor"
        @update:model-value="updateSetting('backgroundColor', $event)"
      />
      <ColorPicker
        label="Foreground"
        :model-value="settings.foregroundColor"
        @update:model-value="updateSetting('foregroundColor', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
@import "./settings-shared.css";

.section-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
  line-height: 1.4;
}

.color-pickers {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
