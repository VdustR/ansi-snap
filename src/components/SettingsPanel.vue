<script setup lang="ts">
import { useSettings } from "../composables/useSettings";
import ThemeSettings from "./settings/ThemeSettings.vue";
import PaletteSettings from "./settings/PaletteSettings.vue";
import ChromeSettings from "./settings/ChromeSettings.vue";
import TitleSettings from "./settings/TitleSettings.vue";
import ContentSettings from "./settings/ContentSettings.vue";
import CustomCssSettings from "./settings/CustomCssSettings.vue";
import ExportSettings from "./settings/ExportSettings.vue";

const props = defineProps<{
  getExportElement: () => HTMLElement | null;
}>();

const { resetToDefaults } = useSettings();
</script>

<template>
  <aside class="settings-panel">
    <div class="settings-header">
      <h1 class="settings-title">
        <img src="/favicon.svg" alt="" width="24" height="24" class="settings-logo" />
        ansi-snap
      </h1>
      <div class="header-actions">
        <a
          href="https://github.com/VdustR/ansi-snap#readme"
          target="_blank"
          rel="noopener"
          class="icon-btn"
          title="Documentation"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4" />
            <path d="M12 8h.01" />
          </svg>
        </a>
        <button class="icon-btn" title="Reset to defaults" @click="resetToDefaults">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="M3 12a9 9 0 1 1 3 6.36" />
            <polyline points="3 22 3 16 9 16" />
          </svg>
        </button>
      </div>
    </div>
    <div class="settings-body">
      <ThemeSettings />
      <div class="settings-divider" />
      <PaletteSettings />
      <div class="settings-divider" />
      <ChromeSettings />
      <div class="settings-divider" />
      <TitleSettings />
      <div class="settings-divider" />
      <ContentSettings />
      <div class="settings-divider" />
      <CustomCssSettings />
      <div class="settings-divider" />
      <ExportSettings :get-export-element="props.getExportElement" />
    </div>
    <footer class="settings-footer">
      <span>MIT License</span>
      <a href="https://github.com/VdustR" target="_blank" rel="noopener" class="footer-author"
        >VdustR</a
      >
      <a
        href="https://github.com/VdustR/ansi-snap"
        target="_blank"
        rel="noopener"
        class="footer-repo"
        title="GitHub repo"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path
            d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
          />
        </svg>
      </a>
    </footer>
  </aside>
</template>

<style scoped>
.settings-panel {
  width: 320px;
  min-width: 320px;
  height: 100%;
  overflow-y: auto;
  background: #1e293b;
  border-right: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  flex-direction: column;
}

.settings-header {
  padding: 16px 20px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.settings-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
}

.settings-logo {
  flex-shrink: 0;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 4px;
}

.icon-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid transparent;
  border-radius: 6px;
  background: transparent;
  color: rgba(255, 255, 255, 0.35);
  cursor: pointer;
  transition: all 0.15s ease-out;
  text-decoration: none;
}

.icon-btn:hover {
  color: rgba(255, 255, 255, 0.8);
  background: rgba(255, 255, 255, 0.06);
  border-color: rgba(255, 255, 255, 0.1);
}

.settings-body {
  padding: 16px 20px;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0;
}

.settings-divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 16px 0;
}

.settings-footer {
  padding: 12px 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
}

.footer-author {
  color: rgba(255, 255, 255, 0.45);
  text-decoration: none;
}

.footer-author:hover {
  color: rgba(255, 255, 255, 0.8);
}

.footer-repo {
  margin-left: auto;
  color: rgba(255, 255, 255, 0.3);
  display: flex;
  transition: color 0.15s;
}

.footer-repo:hover {
  color: rgba(255, 255, 255, 0.8);
}

@media (max-width: 768px) {
  .settings-panel {
    width: 100%;
    min-width: unset;
    height: auto;
    max-height: 40vh;
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }
}
</style>
