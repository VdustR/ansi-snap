<script setup lang="ts">
import InputText from "primevue/inputtext";
import Select from "primevue/select";
import { useSettings } from "../../composables/useSettings";
import ColorPicker from "../ui/ColorPicker.vue";
import LabeledSlider from "../ui/LabeledSlider.vue";

const { settings, updateSetting } = useSettings();

const alignOptions = [
  { value: "left", label: "Left" },
  { value: "center", label: "Center" },
  { value: "right", label: "Right" },
];

const fontWeightOptions = [
  { value: "100", label: "100 — Thin" },
  { value: "200", label: "200 — Extra Light" },
  { value: "300", label: "300 — Light" },
  { value: "normal", label: "400 — Normal" },
  { value: "500", label: "500 — Medium" },
  { value: "600", label: "600 — Semi Bold" },
  { value: "bold", label: "700 — Bold" },
  { value: "800", label: "800 — Extra Bold" },
  { value: "900", label: "900 — Black" },
];
</script>

<template>
  <section class="settings-section">
    <h3 class="section-title">Title</h3>
    <div class="field">
      <label class="field-label">Title Text</label>
      <div class="p-fluid">
        <InputText
          :model-value="settings.titleText"
          placeholder="Optional window title"
          @update:model-value="updateSetting('titleText', $event ?? '')"
        />
      </div>
    </div>
    <div class="field">
      <label class="field-label">Alignment</label>
      <div class="p-fluid">
        <Select
          :model-value="settings.titleAlign"
          :options="alignOptions"
          option-label="label"
          option-value="value"
          @update:model-value="updateSetting('titleAlign', $event as typeof settings.titleAlign)"
        />
      </div>
    </div>
    <ColorPicker
      label="Color"
      :model-value="settings.titleColor"
      @update:model-value="updateSetting('titleColor', $event)"
    />
    <div class="field">
      <label class="field-label">Font Family</label>
      <div class="p-fluid">
        <InputText
          :model-value="settings.titleFontFamily"
          @update:model-value="updateSetting('titleFontFamily', $event ?? '')"
        />
      </div>
    </div>
    <LabeledSlider
      label="Font Size"
      :model-value="settings.titleFontSize"
      :min="8"
      :max="24"
      :step="1"
      unit="px"
      @update:model-value="updateSetting('titleFontSize', $event)"
    />
    <div class="field">
      <label class="field-label">Font Weight</label>
      <div class="p-fluid">
        <Select
          :model-value="settings.titleFontWeight"
          :options="fontWeightOptions"
          option-label="label"
          option-value="value"
          @update:model-value="
            updateSetting('titleFontWeight', $event as typeof settings.titleFontWeight)
          "
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@import "./settings-shared.css";
</style>
