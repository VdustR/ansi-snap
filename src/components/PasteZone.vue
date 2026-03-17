<script setup lang="ts">
const isMac = window.navigator.userAgent.includes("Mac");
</script>

<template>
  <div class="paste-zone" aria-label="Paste terminal output here with keyboard shortcut">
    <div class="paste-icon">
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
      </svg>
    </div>
    <p class="paste-text">
      Press <kbd>{{ isMac ? "⌘" : "Ctrl" }}+V</kbd> to paste terminal output
    </p>
    <p class="paste-hint">Supports rich text with ANSI colors from Ghostty and other terminals</p>
  </div>
</template>

<style scoped>
.paste-zone {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 48px;
  border: 2px dashed currentcolor;
  border-radius: 12px;
  min-height: 200px;
  color: inherit;
  opacity: 0.4;
  transition: opacity 0.2s;
}

.paste-zone:hover {
  opacity: 0.6;
}

.paste-text {
  font-size: 16px;
}

.paste-hint {
  font-size: 13px;
  opacity: 0.7;
}

kbd {
  display: inline-block;
  padding: 2px 6px;
  font-family: inherit;
  font-size: 13px;
  border: 1px solid currentcolor;
  border-radius: 4px;
}

@media (max-width: 320px) {
  .paste-zone {
    padding: 24px 12px;
    min-height: 120px;
  }

  .paste-text {
    font-size: 14px;
    text-align: center;
  }

  .paste-hint {
    font-size: 11px;
    text-align: center;
  }
}
</style>
