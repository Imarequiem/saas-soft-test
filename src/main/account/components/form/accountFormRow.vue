<template>
  <div class="account-row-grid">
    <input-component
      v-model="form.label"
      label="Метка"
      :hide-details="false"
      :error="!!errors.label"
      :error-messages="errors.label"
      @blur="validateAllFields"
    />

    <select-component
      v-model="form.type"
      label="Тип записи"
      :items="['Локальная', 'LDAP']"
      @update:modelValue="validateAllFields"
    />

    <input-component
      v-model="form.login"
      class="login-input"
      :class="{ 'span-two-columns': form.type === 'LDAP' }"
      label="Логин"
      :hide-details="false"
      :error="!!errors.login"
      :error-messages="errors.login"
      @blur="validateAllFields"
    />

    <input-component
      v-show="form.type === 'Локальная'"
      v-model="form.password"
      label="Пароль"
      :type="showPassword ? 'text' : 'password'"
      :hide-details="false"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :error="!!errors.password"
      :error-messages="errors.password"
      @click:append-inner="togglePassword"
      @blur="validateAllFields"
    />

    <button-component
      class="delete-button"
      icon="mdi-delete"
      variant="text"
      color="red"
      @click.prevent="removeAccount"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import { useAccountStore } from '@/main/account/stores/accounts.store'

import inputComponent from '@/components/ui/input/inputComponent.vue'
import selectComponent from '@/components/ui/select/selectComponent.vue'
import buttonComponent from '@/components/ui/button/buttonComponent.vue'

import { AccountClass } from '@/main/account/classes/account.class'
import { AccountValidator } from '@/main/account/classes/accountValidator.class'

import type { FormAccount } from '@/main/account/types/account.interface'
import type { FieldName } from '@/main/account/types/fieldName.type'

const emit = defineEmits(['remove'])

const props = defineProps<{
  account: AccountClass
}>()

const accountStore = useAccountStore()

const accountValidator = new AccountValidator()

const form = reactive<FormAccount>(props.account.toForm())

const errors = reactive<Record<FieldName, string>>({
  label: '',
  type: '',
  login: '',
  password: ''
})

const showPassword = ref(false)

const togglePassword = (): boolean => showPassword.value = !showPassword.value

const validateAllFields = (): void => {
  const validationErrors = accountValidator.validateAll(form)

  errors.label = validationErrors.label
  errors.login = validationErrors.login
  errors.password = validationErrors.password

  if (accountValidator.isValid(form)) {
    props.account.applyForm(form)

    accountStore.updateAccount(props.account, form)
  }
}

const removeAccount = (): void => accountStore.removeAccount(props.account.id)
</script>

<style scoped>
.account-row-grid {
  width: 100svw;
  display: grid;
  align-items: start;
  grid-template-columns: auto auto auto auto 100px;
  grid-gap: 1rem;
}

.span-two-columns {
  grid-column: span 2;
}

.delete-button {
  height: 50px;
  width: 50px;
}
</style>