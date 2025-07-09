<template>
  <v-btn
    v-bind="attrs"
    class="button"
    :variant="props.variant"
    :size="props.size"
    :color="props.color"
    :density="props.density"
    :rounded="props.rounded"
  >
    <template #prepend>
      <v-icon
        v-if="props.icon"
        :size="props.iconFz"
        :color="props.iconColor"
      >
        {{ props.icon }}
      </v-icon>
    </template>

    <span v-if="props.title" class="button-title">
      {{ props.title }}
    </span>
    <slot />
  </v-btn>
</template>

<script setup lang="ts">
import { useAttrs } from 'vue'

import type buttonProps from './interfaces/buttonProps.interface'

const props = withDefaults(defineProps<buttonProps>(), {
  variant: 'outlined',
  size: 'regular',
  color: 'primary',
  density: 'compact',
  rounded: false,
  elevation: 0,
  title: '',
  icon: '',
  iconColor: 'inherit',
  iconFz: 24,
})

const attrs = useAttrs()
</script>

<style scoped>
.button {
  padding: 5px 10px;
}
</style>