<script setup lang="ts">
const props = defineProps<{
  modelValue: number;
  label: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: number];
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", Number(target.value));
}
</script>

<template>
  <label class="slider-input">
    <div class="slider-header">
      <span class="slider-label">{{ props.label }}</span>
      <span class="slider-value">{{ props.modelValue }}{{ props.unit ?? "" }}</span>
    </div>
    <input
      type="range"
      :value="props.modelValue"
      :min="props.min"
      :max="props.max"
      :step="props.step"
      class="slider"
      @input="onInput"
    />
  </label>
</template>

<style scoped>
.slider-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.slider-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.slider-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.slider-value {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.8);
  font-family: monospace;
}

.slider {
  width: 100%;
  height: 4px;
  appearance: none;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 2px;
  outline: none;
  cursor: pointer;
}

.slider::-webkit-slider-thumb {
  appearance: none;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #fff;
  cursor: pointer;
}
</style>
