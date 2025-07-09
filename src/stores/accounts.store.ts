import { defineStore } from 'pinia'

import { ref } from 'vue'

import type { Ref } from 'vue'
import type { Account } from '@/components/forms/accountForm/types/interfaces/account.interface'

export type FieldName = 'login' | 'password' | 'label'

export const useAccountStore = defineStore('account', () => {
  const accounts: Ref<Account[]> = ref<Account[]>(
    JSON.parse(localStorage.getItem('accounts') || '[]')
  )

  const addAccount = () => {
    accounts.value.push({
      id: Date.now(),
      label: [{text: ''}],
      type: 'Локальная',
      login: '',
      password: '',
    })
  }

  const redactingAccount = (updated: Account) => {
    const index = accounts.value.findIndex(a => a.id === updated.id)

    if (index !== -1) {
      accounts.value[index] = { ...accounts.value[index], ...updated }

      localStorage.setItem('accounts', JSON.stringify(accounts.value))
    }
  }

  const removeAccount = (id: number) => {
    const index = accounts.value.findIndex(a => a.id === id)

    if (index !== -1) {
      accounts.value.splice(index, 1)

      localStorage.setItem('accounts', JSON.stringify(accounts.value))
    }
  }

  return {
    accounts,
    addAccount,
    redactingAccount,
    removeAccount
  }
})