<script setup lang="ts">
import { ref, watch } from "vue";
import AutoComplete from "primevue/autocomplete";
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
const suggestions = ref<Theme[]>([]);

async function onComplete(event: { originalEvent: Event; query: string }) {
  await loadAllThemes();
  query.value = event.query;
  // Always spread a new array — the watcher below won't fire when query
  // is unchanged (e.g. re-focus after blur with query still ""), so we
  // must also push a fresh reference here to re-open the panel.
  suggestions.value = [...filtered.value];
}

function onItemSelect(event: { originalEvent: Event; value: Theme }) {
  query.value = "";
  emit("update:modelValue", event.value.name);
  emit("select", event.value);
}

// New array reference required — AutoComplete only re-opens the panel when
// it detects a changed suggestions reference. Without spreading, re-focus
// after blur would silently skip showing the dropdown.
watch(query, () => {
  suggestions.value = [...filtered.value];
});
</script>

<template>
  <div class="theme-combobox">
    <label class="field-label">Theme</label>
    <div class="p-fluid">
      <AutoComplete
        :model-value="query"
        :suggestions="suggestions"
        option-label="name"
        :placeholder="props.modelValue || 'Search themes...'"
        scroll-height="240px"
        :complete-on-focus="true"
        dropdown
        dropdown-mode="current"
        :delay="0"
        :loading="loading"
        @complete="onComplete"
        @item-select="onItemSelect"
        @update:model-value="
          (val: string | Theme) => {
            if (typeof val === 'string') query = val;
          }
        "
      >
        <template #option="{ option }">
          <div
            class="combobox-option"
            :style="{ background: option.background, color: option.foreground }"
          >
            <span class="option-name">{{ option.name }}</span>
            <span v-if="option.name === props.modelValue" class="option-active-mark">✓</span>
          </div>
        </template>
        <template #empty>
          <div class="combobox-empty">No themes found</div>
        </template>
        <template #header>
          <div v-if="loaded" class="combobox-count">{{ suggestions.length }} themes</div>
        </template>
      </AutoComplete>
    </div>
  </div>
</template>

<style scoped>
@import "../settings/settings-shared.css";

.theme-combobox {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

:deep(.p-autocomplete-option) {
  padding: 0 !important;
}

.combobox-option {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  padding: 4px 12px;
  width: 100%;
}

.option-name {
  overflow-wrap: break-word;
}

.option-active-mark {
  margin-left: auto;
  font-size: 11px;
  flex-shrink: 0;
}

.combobox-empty {
  padding: 8px;
  font-size: 12px;
  color: rgba(255, 255, 255, 0.3);
  text-align: center;
}

.combobox-count {
  padding: 4px 8px;
  font-size: 11px;
  color: rgba(255, 255, 255, 0.3);
}
</style>
