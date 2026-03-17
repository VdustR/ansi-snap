<script setup lang="ts">
const props = defineProps<{
  modelValue: string;
  label: string;
  placeholder?: string;
}>();

const emit = defineEmits<{
  "update:modelValue": [value: string];
}>();

function onInput(event: Event) {
  const target = event.target as HTMLInputElement;
  emit("update:modelValue", target.value);
}
</script>

<template>
  <label class="text-input">
    <span class="text-label">{{ props.label }}</span>
    <input
      type="text"
      :value="props.modelValue"
      :placeholder="props.placeholder"
      class="input"
      @input="onInput"
    />
  </label>
</template>

<style scoped>
.text-input {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.text-label {
  font-size: 12px;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.input {
  height: 32px;
  padding: 0 8px;
  font-size: 13px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 4px;
  color: #e0e0e0;
  outline: none;
}

.input:focus {
  border-color: rgba(255, 255, 255, 0.4);
}
</style>
