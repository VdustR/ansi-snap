<script setup lang="ts">
import { computed } from "vue";
import type { ChromeStyle } from "../types";

const props = defineProps<{
  style: ChromeStyle;
  backgroundColor: string;
}>();

// Determine if background is light to adapt button colors
const isLight = computed(() => {
  const hex = props.backgroundColor.replace("#", "");
  if (hex.length < 6) return false;
  const r = parseInt(hex.slice(0, 2), 16);
  const g = parseInt(hex.slice(2, 4), 16);
  const b = parseInt(hex.slice(4, 6), 16);
  // Relative luminance approximation
  return r * 0.299 + g * 0.587 + b * 0.114 > 150;
});
</script>

<template>
  <!-- macOS traffic lights -->
  <div v-if="style === 'macos'" class="chrome chrome-macos">
    <span class="dot dot-close" />
    <span class="dot dot-minimize" />
    <span class="dot dot-maximize" />
  </div>

  <!-- Windows title bar buttons -->
  <div v-else-if="style === 'windows'" class="chrome chrome-windows" :class="{ light: isLight }">
    <div class="win-buttons">
      <button class="win-btn" aria-label="Minimize">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M1 5h8" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </button>
      <button class="win-btn" aria-label="Maximize">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <rect
            x="1"
            y="1"
            width="8"
            height="8"
            stroke="currentColor"
            stroke-width="1.2"
            fill="none"
          />
        </svg>
      </button>
      <button class="win-btn win-btn-close" aria-label="Close">
        <svg width="10" height="10" viewBox="0 0 10 10">
          <path d="M1 1l8 8M9 1l-8 8" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </button>
    </div>
  </div>

  <!-- Linux (GNOME) close button -->
  <div v-else-if="style === 'linux'" class="chrome chrome-linux" :class="{ light: isLight }">
    <button class="linux-close" aria-label="Close">
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path d="M2 2l6 6M8 2l-6 6" stroke="currentColor" stroke-width="1.5" />
      </svg>
    </button>
  </div>
</template>

<style scoped>
.chrome {
  display: flex;
  align-items: center;
  padding: 12px 16px;
  user-select: none;
  flex-shrink: 0;
  position: relative;
  z-index: 1;
}

/* macOS */
.chrome-macos {
  gap: 8px;
}

.dot {
  width: 12px;
  height: 12px;
  border-radius: 50%;
}

.dot-close {
  background: #ff5f57;
}

.dot-minimize {
  background: #febc2e;
}

.dot-maximize {
  background: #28c840;
}

/* Windows */
.chrome-windows {
  justify-content: flex-end;
  padding: 0;
  margin-left: auto;
}

.win-buttons {
  display: flex;
}

.win-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 46px;
  height: 32px;
  background: transparent;
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.win-btn:hover {
  background: rgba(255, 255, 255, 0.1);
}

.win-btn-close:hover {
  background: #e81123;
  color: #fff;
}

/* Windows light mode */
.chrome-windows.light .win-btn {
  color: rgba(0, 0, 0, 0.6);
}

.chrome-windows.light .win-btn:hover {
  background: rgba(0, 0, 0, 0.06);
}

.chrome-windows.light .win-btn-close:hover {
  background: #e81123;
  color: #fff;
}

/* Linux (GNOME) */
.chrome-linux {
  padding: 8px 12px;
  margin-left: auto;
}

.linux-close {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
}

.linux-close:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* Linux light mode */
.chrome-linux.light .linux-close {
  background: rgba(0, 0, 0, 0.08);
  color: rgba(0, 0, 0, 0.6);
}

.chrome-linux.light .linux-close:hover {
  background: rgba(0, 0, 0, 0.15);
}
</style>
