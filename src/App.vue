<script setup lang="ts">
import { ref } from "vue";
import SettingsPanel from "./components/SettingsPanel.vue";
import TerminalPreview from "./components/TerminalPreview.vue";
import ReloadPrompt from "./components/ReloadPrompt.vue";

const terminalPreview = ref<InstanceType<typeof TerminalPreview> | null>(null);

function getExportElement(): HTMLElement | null {
  return terminalPreview.value?.previewRef ?? null;
}
</script>

<template>
  <div class="app-layout">
    <SettingsPanel :get-export-element="getExportElement" />
    <main class="preview-area">
      <TerminalPreview ref="terminalPreview" />
    </main>
  </div>
  <ReloadPrompt />
</template>

<style scoped>
.app-layout {
  display: flex;
  height: 100%;
}

.preview-area {
  flex: 1;
  display: flex;
  align-items: safe center;
  justify-content: safe center;
  padding: 32px;
  overflow: auto;
}

@media (max-width: 768px) {
  .app-layout {
    flex-direction: column;
    height: auto;
    min-height: 100%;
  }

  .preview-area {
    padding: 12px;
    min-height: 50vh;
  }
}

@media (max-width: 320px) {
  .preview-area {
    padding: 8px;
  }
}
</style>
