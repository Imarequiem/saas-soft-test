import { ref } from 'vue'
import { defineStore } from 'pinia'

import { AccountClass } from '@/main/account/classes/account.class'

import type { FormAccount } from '@/main/account/types/account.interface'

export const useAccountStore = defineStore('account', () => {
  const raw = JSON.parse(localStorage.getItem('accounts') || '[]') as any[]
  const accounts = ref<AccountClass[]>(raw.map(r => AccountClass.fromJSON(r)))

  function addAccount() {
    const acc = AccountClass.createNew()
    accounts.value.push(acc)

    saveAll()
  }

  function updateAccount(acc: AccountClass, form: FormAccount) {
    acc.applyForm(form)

    saveAll()
  }

  function removeAccount(id: number) {
    accounts.value = accounts.value.filter(a => a.id !== id)

    saveAll()
  }

  function saveAll() {
    localStorage.setItem(
      'accounts',
      JSON.stringify(accounts.value.map(a => a.toJSON()))
    )
  }

  return { accounts, addAccount, updateAccount, removeAccount }
})