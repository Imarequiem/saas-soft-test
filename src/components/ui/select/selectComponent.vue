<template>
  <v-select
    v-model="model"
    class="select"
    :items="props.items"
    :label="props.label"
    :hide-details="props.hideDetails"
    :color="props.color"
    :variant="props.variant"
    :density="props.density"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  hideDetails: {
    type: Boolean,
    default: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  variant: {
    type: String as () => 'outlined' | 'plain' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled',
    default: 'outlined'
  },
  height: {
    type: String,
    default: '40px'
  },
  density: {
    type: String as () => 'default' | 'comfortable' | 'compact',
    default: 'default'
  }
})

const model = defineModel()
</script>

<style scoped>
.select {
  width: 100%;
  min-width: 100px;
}
</style>