<template>
  <form class="account-form">
    <button-component
      class="mb-4"
      :icon="'mdi-plus'"
      :title="'Добавить запись'"
      @click="accountStore.addAccount()"
    />

    <div class="form-wrap">
      <account-form-row
        v-for="account in accountStore.accounts"
        :key="account.id"
        :account="account as AccountClass"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { useAccountStore } from '@/main/account/stores/accounts.store'

import accountFormRow from '@/main/account/components/form/accountFormRow.vue'
import buttonComponent from '@/components/ui/button/buttonComponent.vue'

import { AccountClass } from '@/main/account/classes/account.class'

const accountStore = useAccountStore()
</script>

<style scoped>
.account-form {
  padding: 1rem;
}

.form-wrap {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>