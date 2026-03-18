<script setup lang="ts">
import Button from "primevue/button";
import Checkbox from "primevue/checkbox";
import { useExport } from "../../composables/useExport";
import { useSettings } from "../../composables/useSettings";
import LabeledSlider from "../ui/LabeledSlider.vue";

const props = defineProps<{
  getExportElement: () => HTMLElement | null;
}>();

const { settings, updateSetting } = useSettings();
const { exporting, fontReady, exportPng, copyToClipboard } = useExport();

function getExportOptions() {
  return { transparent: settings.transparentBackground, pixelRatio: settings.exportPixelRatio };
}

async function onExportPng() {
  const el = props.getExportElement();
  if (el) await exportPng(el, getExportOptions());
}

async function onCopy() {
  const el = props.getExportElement();
  if (el) await copyToClipboard(el, getExportOptions());
}
</script>

<template>
  <section class="settings-section">
    <h3 class="section-title">Export</h3>
    <LabeledSlider
      :model-value="settings.exportPixelRatio"
      label="Pixel Ratio"
      :min="1"
      :max="4"
      :step="1"
      unit="x"
      @update:model-value="updateSetting('exportPixelRatio', $event)"
    />
    <label class="checkbox-row">
      <Checkbox
        :binary="true"
        :model-value="settings.transparentBackground"
        @update:model-value="updateSetting('transparentBackground', $event as boolean)"
      />
      <span>Transparent background</span>
    </label>
    <div class="export-buttons">
      <Button
        severity="secondary"
        outlined
        :disabled="!fontReady || exporting"
        class="export-btn"
        @click="onExportPng"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <polyline points="7 10 12 15 17 10" />
          <line x1="12" y1="15" x2="12" y2="3" />
        </svg>
        PNG
      </Button>
      <Button
        severity="secondary"
        outlined
        :disabled="!fontReady || exporting"
        class="export-btn"
        @click="onCopy"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
        >
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
        </svg>
        Copy
      </Button>
    </div>
    <p v-if="!fontReady" class="loading-hint">Loading fonts...</p>
    <p v-if="exporting" class="loading-hint">Exporting...</p>
  </section>
</template>

<style scoped>
@import "./settings-shared.css";

.export-buttons {
  display: flex;
  gap: 8px;
}

.export-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
}

.loading-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}
</style>
