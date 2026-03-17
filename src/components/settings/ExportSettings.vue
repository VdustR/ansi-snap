<script setup lang="ts">
import { useExport } from "../../composables/useExport";

const props = defineProps<{
  getExportElement: () => HTMLElement | null;
  transparent: boolean;
}>();

const { exporting, fontReady, exportPng, exportSvg, copyToClipboard } = useExport();

async function onExportPng() {
  const el = props.getExportElement();
  if (el) await exportPng(el, props.transparent);
}

async function onExportSvg() {
  const el = props.getExportElement();
  if (el) await exportSvg(el, props.transparent);
}

async function onCopy() {
  const el = props.getExportElement();
  if (el) await copyToClipboard(el, props.transparent);
}
</script>

<template>
  <section class="settings-section">
    <h3 class="section-title">Export</h3>
    <div class="export-buttons">
      <button class="export-btn" :disabled="!fontReady || exporting" @click="onExportPng">
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
      </button>
      <button class="export-btn" :disabled="!fontReady || exporting" @click="onExportSvg">
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
        SVG
      </button>
      <button class="export-btn" :disabled="!fontReady || exporting" @click="onCopy">
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
      </button>
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
  height: 36px;
  font-size: 13px;
  font-weight: 500;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  color: #e0e0e0;
  cursor: pointer;
  transition: all 0.15s;
}

.export-btn:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.export-btn:disabled {
  opacity: 0.4;
  cursor: not-allowed;
}

.loading-hint {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.4);
}
</style>
