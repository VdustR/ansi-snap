<script setup lang="ts">
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

function onTextInput(event: Event) {
  const target = event.target as HTMLInputElement;
  const value = target.value.trim();
  if (/^#[0-9a-f]{3,8}$/i.test(value) || /^rgb/i.test(value)) {
    emit("update:modelValue", value);
  }
}
</script>

<template>
  <label class="color-picker">
    <span class="color-picker-label">{{ props.label }}</span>
    <div class="color-picker-controls">
      <input type="color" :value="props.modelValue" class="color-input" @input="onInput" />
      <input
        type="text"
        :value="props.modelValue"
        class="color-text"
        spellcheck="false"
        @change="onTextInput"
      />
    </div>
  </label>
</template>

<style scoped>
.color-picker {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.color-picker-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
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
  height: 32px;
  padding: 0 8px;
  font-size: 13px;
  font-family: monospace;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  color: #e0e0e0;
  outline: none;
}

.color-text:focus {
  border-color: rgba(255, 255, 255, 0.4);
}
</style>
