<template>
  <form class="account-form">
    <button-component
      class="mb-4"
      :icon="'mdi-plus'"
      :title="'Добавить запись'"
      color="primary"
      variant="outlined"
      @click="addAccount"
    />

    <div class="form-wrap">
      <account-form-row
        v-for="(account, index) in model"
        :key="account.id"
        v-model="model[index]"
        @remove="removeAccount(account.id)"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/stores/accounts.store'

import accountFormRow from './accountFormRow.vue'

import buttonComponent from '@/components/ui/button/buttonComponent.vue'

import type { FormAccount } from '@/components/forms/accountForm/types/interfaces/account.interface'

const model = defineModel<FormAccount[]>({ default: () => [] })

const accountStore = useAccountStore()

const addAccount = (): void => accountStore.addAccount()

const removeAccount = (index: number): void => accountStore.removeAccount(index)
</script>

<style scoped>
.account-form {
  padding: 1rem;
}

.form-wrap {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
</style>