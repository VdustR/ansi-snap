<script setup lang="ts">
import Select from "primevue/select";
import { useSettings } from "../../composables/useSettings";
import { chromeStyleOptions } from "../../constants/chromeStyles";

const { settings, updateSetting } = useSettings();
</script>

<template>
  <section class="settings-section">
    <h3 class="section-title">Window Chrome</h3>
    <div class="field">
      <label class="field-label">Style</label>
      <div class="p-fluid">
        <Select
          :model-value="settings.chromeStyle"
          :options="chromeStyleOptions"
          option-label="label"
          option-value="value"
          @update:model-value="updateSetting('chromeStyle', $event as typeof settings.chromeStyle)"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
@import "./settings-shared.css";
</style>
