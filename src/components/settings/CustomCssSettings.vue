<script setup lang="ts">
import { useSettings } from "../../composables/useSettings";
import { useCustomCss } from "../../composables/useCustomCss";

const { settings, updateSetting } = useSettings();
useCustomCss();

function onInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  updateSetting("customCss", target.value);
}
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
    <textarea
      class="css-editor"
      :value="settings.customCss"
      placeholder='[data-ansi-snap="preview"] { }'
      spellcheck="false"
      rows="6"
      @input="onInput"
    />
  </section>
</template>

<style scoped>
@import "./settings-shared.css";

.css-editor {
  width: 100%;
  padding: 8px;
  font-family: monospace;
  font-size: 12px;
  line-height: 1.5;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #e0e0e0;
  resize: vertical;
  outline: none;
}

.css-editor:focus {
  border-color: rgba(255, 255, 255, 0.4);
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
