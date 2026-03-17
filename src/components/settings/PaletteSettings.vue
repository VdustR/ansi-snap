<script setup lang="ts">
import { ref } from "vue";
import { useSettings } from "../../composables/useSettings";
import type { Palette } from "../../types";

const { settings } = useSettings();

// ANSI 16-color palette labels
// 4 = Blue — typically used for hyperlink/URL color in terminals
// 8-15 = Bright variants of 0-7
const labels = [
  "Black", // 0
  "Red", // 1 — errors
  "Green", // 2 — success, paths
  "Yellow", // 3 — warnings
  "Blue", // 4 — links/URLs
  "Magenta", // 5
  "Cyan", // 6 — info, flags
  "White", // 7
  "Bright Black", // 8 — comments, line numbers
  "Bright Red", // 9
  "Bright Green", // 10
  "Bright Yellow", // 11
  "Bright Blue", // 12 — links/URLs (bright)
  "Bright Magenta", // 13
  "Bright Cyan", // 14
  "Bright White", // 15
];

const editingIndex = ref<number | null>(null);

function onColorChange(index: number, event: Event) {
  const target = event.target as HTMLInputElement;
  settings.palette[index as keyof Palette] = target.value;
}
</script>

<template>
  <section class="settings-section">
    <h3 class="section-title">Palette</h3>
    <div class="palette-grid">
      <label
        v-for="i in 16"
        :key="i - 1"
        class="palette-cell"
        :title="`${String(i - 1)}: ${labels[i - 1]} (${settings.palette[(i - 1) as keyof Palette]})`"
      >
        <input
          type="color"
          class="palette-input"
          :value="settings.palette[(i - 1) as keyof Palette]"
          @input="onColorChange(i - 1, $event)"
          @focus="editingIndex = i - 1"
          @blur="editingIndex = null"
        />
        <span
          class="palette-swatch"
          :style="{ background: settings.palette[(i - 1) as keyof Palette] }"
        />
        <span class="palette-index">{{ i - 1 }}</span>
      </label>
    </div>
    <p v-if="editingIndex !== null" class="palette-editing">
      {{ editingIndex }}: {{ labels[editingIndex] }}
    </p>
    <div class="palette-legend">
      <span><b>4</b> Links/URLs</span>
      <span><b>1</b> Errors</span>
      <span><b>2</b> Success</span>
      <span><b>3</b> Warnings</span>
    </div>
  </section>
</template>

<style scoped>
@import "./settings-shared.css";

.palette-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 4px;
}

.palette-cell {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
}

.palette-input {
  position: absolute;
  inset: 0;
  opacity: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.palette-swatch {
  width: 100%;
  aspect-ratio: 1;
  border-radius: 4px;
  border: 1px solid rgba(255, 255, 255, 0.15);
}

.palette-index {
  font-size: 9px;
  color: rgba(255, 255, 255, 0.35);
  font-family: monospace;
}

.palette-editing {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.6);
}

.palette-legend {
  display: flex;
  flex-wrap: wrap;
  gap: 4px 12px;
  font-size: 10px;
  color: rgba(255, 255, 255, 0.35);
}

.palette-legend b {
  color: rgba(255, 255, 255, 0.5);
  font-weight: 600;
}
</style>
