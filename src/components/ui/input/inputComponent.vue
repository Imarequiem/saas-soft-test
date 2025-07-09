<template>
  <v-text-field
    v-model="model"
    class="input"
    :label="props.label"
    :type="props.type"
    :hide-details="props.hideDetails"
    :variant="props.variant"
    :color="props.color"
    :error="props.error"
    :error-messages="props.errorMessages"
  />
</template>

<script setup lang="ts">
import type inputProps from './interfaces/inputProps.interface'

const props = withDefaults(defineProps<inputProps>(), {
  modelValue: null,
  label: '',
  type: 'text',
  hideDetails: true,
  density: 'compact',
  variant: 'outlined',
  color: 'primary',
  error: false,
  errorMessages: '',
})

const model = defineModel<string | number | null>({ default: () => '' })
</script>

<style scoped>
.input {
  width: 100%;
  min-width: 100px;
}

:deep(.v-field) {
  min-height: 40px !important;
}
</style>