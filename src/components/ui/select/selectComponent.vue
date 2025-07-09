<template>
  <v-select
    v-model="model"
    class="select"
    :items="items"
    :label="label"
    :hide-details="hideDetails"
    :color="color"
    :variant="variant"
    :density="density"
  />
</template>

<script setup lang="ts">
import type SelectProps from '@/components/ui/select/types/selectProps.interface'

withDefaults(defineProps<SelectProps>(), {
  hideDetails: true,
  color: 'primary',
  variant: 'outlined',
  height: '40px',
  density: 'default'
})

const model = defineModel()
</script>

<style scoped>
.select {
  width: 100%;
  min-width: 100px;
}
</style>