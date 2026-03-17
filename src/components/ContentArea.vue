<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { useClipboard } from "../composables/useClipboard";
import type { Palette } from "../types";
import PasteZone from "./PasteZone.vue";

const props = defineProps<{
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  letterSpacing: number;
  paddingX: number;
  paddingY: number;
  foregroundColor: string;
  palette: Palette;
}>();

const { pastedContent, handlePaste } = useClipboard();
const contentRef = ref<HTMLDivElement | null>(null);
const hasContent = ref(false);

// Merge: theme palette as base, pasted HTML palette vars override
const paletteStyle = computed(() => {
  const vars: Record<string, string> = {};
  // Theme palette as CSS variables
  for (let i = 0; i < 16; i++) {
    const key = i as keyof Palette;
    vars[`--vt-palette-${String(i)}`] = props.palette[key];
  }
  // Pasted HTML palette vars override theme
  if (pastedContent.value) {
    for (const [key, value] of Object.entries(pastedContent.value.paletteVars)) {
      vars[key] = value;
    }
  }
  return vars;
});

const contentStyle = computed(() => ({
  fontFamily: props.fontFamily,
  fontSize: `${String(props.fontSize)}px`,
  lineHeight: props.lineHeight,
  letterSpacing: `${String(props.letterSpacing)}px`,
  padding: `${String(props.paddingY)}px ${String(props.paddingX)}px`,
  color: props.foregroundColor,
  whiteSpace: "pre" as const,
  ...paletteStyle.value,
}));

// Content is pre-sanitized by useClipboard's sanitizeHtml which strips
// scripts, unsafe tags, and only allows a safe set of inline style properties.
watch(pastedContent, (content) => {
  if (content && contentRef.value) {
    contentRef.value.textContent = "";
    const template = document.createElement("template");
    template.innerHTML = content.html;
    contentRef.value.appendChild(template.content);
    hasContent.value = true;
  }
});

// Global paste listener so ⌘+V works anywhere on the page
function onGlobalPaste(event: ClipboardEvent) {
  // Skip if user is typing in an input/textarea (e.g. settings panel)
  const target = event.target as HTMLElement;
  if (
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    (target.isContentEditable && target === contentRef.value)
  ) {
    return;
  }
  handlePaste(event);
}

onMounted(() => {
  document.addEventListener("paste", onGlobalPaste);
});

onUnmounted(() => {
  document.removeEventListener("paste", onGlobalPaste);
});

function onPaste(event: ClipboardEvent) {
  handlePaste(event);
}

function onInput() {
  if (contentRef.value) {
    hasContent.value = contentRef.value.textContent !== "";
  }
}
</script>

<template>
  <div
    class="content-area-wrapper"
    data-ansi-snap="content"
    :style="{ color: props.foregroundColor }"
  >
    <PasteZone v-if="!hasContent" />
    <div
      v-show="hasContent"
      ref="contentRef"
      class="content-area"
      data-ansi-snap="content-text"
      contenteditable="true"
      spellcheck="false"
      :style="contentStyle"
      @paste="onPaste"
      @input="onInput"
    />
  </div>
</template>

<style scoped>
.content-area-wrapper {
  min-height: 100%;
  display: flex;
  flex-direction: column;
}

.content-area {
  outline: none;
  overflow: auto;
  min-height: 100%;
}

/* Override browser default link color with ANSI palette blue */
.content-area :deep(a) {
  color: var(--vt-palette-4);
}

.content-area :deep(a:visited) {
  color: var(--vt-palette-5);
}
</style>
