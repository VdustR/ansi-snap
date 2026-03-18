<script setup lang="ts">
import InputText from "primevue/inputtext";

const props = defineProps<{
  modelValue: string;
  label: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}

function onTextInput(value: string) {
  const trimmed = value.trim();
  if (/^#[0-9a-f]{3,8}$/i.test(trimmed) || /^rgb/i.test(trimmed)) {
    emit("update:modelValue", trimmed);
  }
}
</script>

<template>
  <label class="color-picker">
    <span class="field-label">{{ props.label }}</span>
    <div class="color-picker-controls">
      <input type="color" :value="props.modelValue" class="color-input" @input="onInput" />
      <InputText
        :model-value="props.modelValue"
        spellcheck="false"
        class="color-text"
        @change="onTextInput(($event.target as HTMLInputElement).value)"
      />
    </div>
  </label>
</template>

<style scoped>
@import "../settings/settings-shared.css";

.color-picker {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.color-picker-controls {
  display: flex;
  gap: 8px;
  align-items: center;
}

.color-input {
  width: 32px;
  height: 32px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  cursor: pointer;
  padding: 2px;
  background: transparent;
}

.color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.color-input::-webkit-color-swatch {
  border: none;
  border-radius: 2px;
}

.color-text {
  flex: 1;
  font-family: monospace;
}
</style>
