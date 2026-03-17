<script setup lang="ts">
import { ref, computed } from "vue";
import { useSettings } from "../composables/useSettings";
import WindowChrome from "./WindowChrome.vue";
import TitleBar from "./TitleBar.vue";
import ContentArea from "./ContentArea.vue";

const { settings } = useSettings();

const previewStyle = computed(() => ({
  backgroundColor: settings.backgroundColor,
  borderRadius: settings.chromeStyle === "none" ? "0" : "12px",
  boxShadow:
    settings.chromeStyle === "none" || settings.chromeStyle === "minimal"
      ? settings.chromeStyle === "minimal"
        ? "0 12px 40px rgba(0, 0, 0, 0.4)"
        : "none"
      : "0 20px 60px rgba(0, 0, 0, 0.5)",
  overflow: "hidden" as const,
  maxWidth: "100%",
  minWidth: "280px",
}));

const showChrome = computed(
  () => settings.chromeStyle !== "none" && settings.chromeStyle !== "minimal",
);

// Title CSS vars on parent so Custom CSS can override on [data-ansi-snap="title"]
const titleRowStyle = computed(() => {
  const isCentered = settings.titleAlign === "center";
  let padding = "0 16px";
  if (showChrome.value) {
    switch (settings.chromeStyle) {
      case "macos":
        padding = isCentered ? "0 16px" : "0 16px 0 80px";
        break;
      case "windows":
        padding = isCentered ? "0 16px" : "0 146px 0 16px";
        break;
      case "linux":
        padding = isCentered ? "0 16px" : "0 48px 0 16px";
        break;
    }
  }
  return {
    "--title-color": settings.foregroundColor,
    "--title-opacity": "0.7",
    "--title-font": settings.titleFontFamily,
    "--title-size": `${String(settings.titleFontSize)}px`,
    "--title-weight": "normal",
    "--title-align": settings.titleAlign,
    "--title-padding": padding,
  };
});

const previewRef = ref<HTMLDivElement | null>(null);

defineExpose({ previewRef });
</script>

<template>
  <div ref="previewRef" class="terminal-preview" data-ansi-snap="preview" :style="previewStyle">
    <div
      v-if="showChrome || settings.titleText"
      class="title-row"
      data-ansi-snap="title-row"
      :style="titleRowStyle"
    >
      <WindowChrome
        v-if="showChrome"
        :style="settings.chromeStyle"
        :background-color="settings.backgroundColor"
      />
      <TitleBar :text="settings.titleText" />
    </div>
    <ContentArea
      :font-family="settings.contentFontFamily"
      :font-size="settings.contentFontSize"
      :line-height="settings.contentLineHeight"
      :letter-spacing="settings.contentLetterSpacing"
      :padding-x="settings.contentPaddingX"
      :padding-y="settings.contentPaddingY"
      :foreground-color="settings.foregroundColor"
      :palette="settings.palette"
    />
  </div>
</template>

<style scoped>
.terminal-preview {
  display: inline-block;
  position: relative;
}

/* macOS-style squircle corners (progressive enhancement) */
@supports (corner-shape: squircle) {
  .terminal-preview {
    corner-shape: squircle;
  }
}

.title-row {
  display: flex;
  align-items: center;
  position: relative;
}
</style>
