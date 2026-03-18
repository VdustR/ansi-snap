<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { useThemeSearch } from "../../composables/useThemeSearch";
import type { Theme } from "../../constants/themes";

const props = defineProps<{
  modelValue: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
  select: [theme: Theme];
}>();

const { filtered, query, loading, loaded, loadAllThemes } = useThemeSearch();

// Keep in sync with .combobox-option { height } and .combobox-list { max-height }
const ITEM_HEIGHT = 28;
const VIEWPORT_HEIGHT = 240;
const BUFFER = 5;

const open = ref(false);
const inputRef = ref<HTMLInputElement | null>(null);
const listRef = ref<HTMLDivElement | null>(null);
const highlightIndex = ref(0);
const scrollTop = ref(0);

const virtualState = computed(() => {
  const items = filtered.value;
  const totalHeight = items.length * ITEM_HEIGHT;

  const startIndex = Math.max(0, Math.floor(scrollTop.value / ITEM_HEIGHT) - BUFFER);
  const endIndex = Math.min(
    items.length,
    Math.ceil((scrollTop.value + VIEWPORT_HEIGHT) / ITEM_HEIGHT) + BUFFER,
  );

  return {
    totalHeight,
    startIndex,
    endIndex,
    offsetY: startIndex * ITEM_HEIGHT,
    visible: items.slice(startIndex, endIndex),
  };
});

function onScroll(event: Event) {
  scrollTop.value = (event.target as HTMLElement).scrollTop;
}

function onFocus() {
  void loadAllThemes();
  open.value = true;
}

function onBlur() {
  // Delay to allow click on option
  setTimeout(() => {
    open.value = false;
  }, 150);
}

function selectTheme(theme: Theme) {
  query.value = "";
  open.value = false;
  emit("update:modelValue", theme.name);
  emit("select", theme);
}

function onKeydown(event: KeyboardEvent) {
  const items = filtered.value;
  if (event.key === "ArrowDown") {
    event.preventDefault();
    highlightIndex.value = Math.min(highlightIndex.value + 1, items.length - 1);
    scrollToHighlighted();
  } else if (event.key === "ArrowUp") {
    event.preventDefault();
    highlightIndex.value = Math.max(highlightIndex.value - 1, 0);
    scrollToHighlighted();
  } else if (event.key === "Enter") {
    event.preventDefault();
    const item = items[highlightIndex.value];
    if (item) selectTheme(item);
  } else if (event.key === "Escape") {
    open.value = false;
    inputRef.value?.blur();
  }
}

function scrollToHighlighted() {
  void nextTick(() => {
    if (!listRef.value) return;
    const itemTop = highlightIndex.value * ITEM_HEIGHT;
    const itemBottom = itemTop + ITEM_HEIGHT;
    const viewTop = listRef.value.scrollTop;
    const viewBottom = viewTop + VIEWPORT_HEIGHT;

    if (itemTop < viewTop) {
      listRef.value.scrollTop = itemTop;
    } else if (itemBottom > viewBottom) {
      listRef.value.scrollTop = itemBottom - VIEWPORT_HEIGHT;
    }
  });
}

watch(query, () => {
  highlightIndex.value = 0;
  if (listRef.value) listRef.value.scrollTop = 0;
});
</script>

<template>
  <div class="theme-combobox">
    <label class="combobox-label">Theme</label>
    <div class="combobox-wrapper">
      <input
        ref="inputRef"
        type="text"
        class="combobox-input"
        :placeholder="props.modelValue || 'Search themes...'"
        :value="query"
        role="combobox"
        aria-autocomplete="list"
        :aria-expanded="open"
        @input="query = ($event.target as HTMLInputElement).value"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      />
      <span v-if="loading" class="combobox-spinner">...</span>
      <span v-else class="combobox-count">{{ loaded ? filtered.length : "" }}</span>
    </div>
    <div v-show="open" ref="listRef" class="combobox-list" role="listbox" @scroll="onScroll">
      <div class="virtual-spacer" :style="{ height: virtualState.totalHeight + 'px' }">
        <div
          class="virtual-window"
          :style="{ transform: `translateY(${String(virtualState.offsetY)}px)` }"
        >
          <div
            v-for="(theme, i) in virtualState.visible"
            :key="theme.name"
            class="combobox-option"
            :class="{
              highlighted: virtualState.startIndex + i === highlightIndex,
              active: theme.name === props.modelValue,
            }"
            role="option"
            :aria-selected="theme.name === props.modelValue"
            @mousedown.prevent="selectTheme(theme)"
            @mouseenter="highlightIndex = virtualState.startIndex + i"
          >
            <span class="option-swatch" :style="{ background: theme.background }" />
            <span class="option-fg-swatch" :style="{ background: theme.foreground }" />
            <span class="option-name">{{ theme.name }}</span>
          </div>
        </div>
      </div>
      <div v-if="filtered.length === 0" class="combobox-empty">No themes found</div>
    </div>
  </div>
</template>

<style scoped>
.theme-combobox {
  display: flex;
  flex-direction: column;
  gap: 4px;
  position: relative;
}

.combobox-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.combobox-wrapper {
  position: relative;
}

.combobox-input {
  width: 100%;
  height: 32px;
  padding: 0 40px 0 8px;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  color: #e0e0e0;
  outline: none;
}

.combobox-input:focus {
  border-color: rgba(255, 255, 255, 0.4);
}

.combobox-spinner,
.combobox-count {
  position: absolute;
  right: 8px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
  pointer-events: none;
}

.combobox-list {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  max-height: 240px; /* keep in sync with VIEWPORT_HEIGHT */
  overflow-y: auto;
  background: #1e293b;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 6px;
  margin-top: 4px;
  z-index: 100;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
}

.virtual-spacer {
  position: relative;
}

.virtual-window {
  position: absolute;
  left: 0;
  right: 0;
}

.combobox-option {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  height: 28px; /* keep in sync with ITEM_HEIGHT */
  box-sizing: border-box;
  cursor: pointer;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.combobox-option.highlighted {
  background: rgba(255, 255, 255, 0.08);
}

.combobox-option.active {
  color: #22c55e;
}

.option-swatch,
.option-fg-swatch {
  width: 12px;
  height: 12px;
  border-radius: 2px;
  border: 1px solid rgba(255, 255, 255, 0.15);
  flex-shrink: 0;
}

.option-name {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.combobox-empty {
  padding: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
}
</style>
