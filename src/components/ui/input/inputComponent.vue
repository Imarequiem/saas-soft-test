<template>
  <v-text-field
    v-model="model"
    class="input"
    :label="label"
    :type="type"
    :hide-details="hideDetails"
    :variant="variant"
    :color="color"
    :error="error"
    :error-messages="errorMessages"
  />
</template>

<script setup lang="ts">
import type InputProps from '@/components/ui/input/types/inputProps.interface.ts'

withDefaults(defineProps<InputProps>(), {
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

:deep(.v-messages) {
  position: absolute;
}

:deep(.v-input__details),
:deep(.v-messages) {
  padding: 0 !important;
  letter-spacing: 0 !important;
}
</style>