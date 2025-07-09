<template>
  <div class="home-page">
    <accountForm v-model="accounts" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useAccountStore } from '@/stores/accounts.store'

import accountForm from '@/components/forms/accountForm/accountForm.vue'

import type { ComputedRef } from 'vue'
import type { FormAccount } from '@/components/forms/accountForm/types/interfaces/account.interface'

const accountStore = useAccountStore()

const accounts: ComputedRef<FormAccount[]> = computed<FormAccount[]>(() =>
  accountStore.accounts.map(el => ({
    ...el,
    label: Array.isArray(el.label)
      ? el.label.map(t => t.text).join('; ')
      : el.label,
  }))
)
</script>