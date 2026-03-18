<script setup lang="ts">
import Textarea from "primevue/textarea";
import { useSettings } from "../../composables/useSettings";
import { useCustomCss } from "../../composables/useCustomCss";

const { settings, updateSetting } = useSettings();
useCustomCss();
</script>

<template>
  <section class="settings-section">
    <h3 class="section-title">Custom CSS</h3>
    <details class="css-selectors">
      <summary>Available selectors</summary>
      <code>[data-ansi-snap="preview"]</code>
      <code>[data-ansi-snap="title-row"]</code>
      <code>[data-ansi-snap="title"]</code>
      <code>[data-ansi-snap="content"]</code>
      <code>[data-ansi-snap="content-text"]</code>
      <span class="css-vars-hint"
        >Title vars: --title-color, --title-opacity, --title-font, --title-size, --title-weight,
        --title-align, --title-padding</span
      >
    </details>
    <div class="p-fluid">
      <Textarea
        :model-value="settings.customCss"
        placeholder='[data-ansi-snap="preview"] { }'
        spellcheck="false"
        rows="6"
        class="css-editor"
        @update:model-value="updateSetting('customCss', $event)"
      />
    </div>
  </section>
</template>

<style scoped>
@import "./settings-shared.css";

.css-editor {
  font-family: monospace;
  font-size: 12px;
  line-height: 1.5;
  resize: vertical;
}

.css-selectors {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.4);
}

.css-selectors summary {
  cursor: pointer;
  user-select: none;
}

.css-selectors code {
  display: block;
  padding: 2px 0;
  font-family: monospace;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.5);
}

.css-vars-hint {
  display: block;
  padding: 4px 0 0;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.3);
  line-height: 1.5;
}
</style>
