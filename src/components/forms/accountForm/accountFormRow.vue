<template>
  <div class="account-row-grid">
    <input-component
      v-model="localModel.label"
      :label="'Метка'"
      :hide-details="false"
      :error="!!accountFormErrors.label"
      :error-messages="accountFormErrors.label"
      @blur="() => onBlur('label')"
    />

    <select-component
      v-model="localModel.type"
      :label="'Тип записи'"
      :items="['Локальная', 'LDAP']"
      @update:modelValue="() => onBlur('type')"
    />

    <input-component
      v-model="localModel.login"
      class="login-input"
      :class="{ 'span-two-columns': localModel.type === 'LDAP' }"
      :label="'Логин'"
      :hide-details="false"
      :error="!!accountFormErrors.login"
      :error-messages="accountFormErrors.login"
      @blur="() => onBlur('login')"
    />

    <input-component
      v-show="localModel.type === 'Локальная'"
      v-model="localModel.password"
      :label="'Пароль'"
      :type="showPassword ? 'text' : 'password'"
      :hide-details="false"
      :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :error="!!accountFormErrors.password"
      :error-messages="accountFormErrors.password"
      @click:append-inner="togglePassword"
      @blur="() => onBlur('password')"
    />

    <button-component
      class="delete-button"
      :icon="'mdi-delete'"
      :variant="'text'"
      :color="'red'"
      @click.prevent="emit('remove')"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAccountStore } from '@/stores/accounts.store'

import inputComponent from '@/components/ui/input/inputComponent.vue'
import selectComponent from '@/components/ui/select/selectComponent.vue'
import buttonComponent from '@/components/ui/button/buttonComponent.vue'

import { isFormValid } from '../../../functions/validateAccountForm'

import { validate, validateType, type FieldName } from '../../../functions/validateAccountForm'
import type { Account, FormAccount } from './types/interfaces/account.interface'

const emit = defineEmits(['remove'])

const model = defineModel<FormAccount>({ default: () => (
  {
    label: '',
    type: 'Локальная',
    login: '',
    password: '',
  }
)})
const localModel = ref<FormAccount>(structuredClone(model.value))

const accountStore = useAccountStore()

const accountFormErrors = reactive<Record<FieldName, string>>({
  login: '',
  password: '',
  label: '',
  type: ''
})

const showPassword = ref(false)

const togglePassword = () => showPassword.value = !showPassword.value

const onBlur = (field: FieldName) => {
  if(field === 'type') validateType(localModel.value, accountFormErrors)

  validate(field, localModel.value, accountFormErrors)

  if (localModel.value.type === 'LDAP') {
    localModel.value.password = null
    accountFormErrors.password = ''
  }

  if (isFormValid(localModel.value, accountFormErrors)) {
    const cleanedAccount: Account = {
      ...localModel.value,
      label: localModel.value.label
        .split(';')
        .map(tag => tag.trim())
        .filter(Boolean)
        .map(text => ({ text })),
      id: localModel.value.id ?? Date.now()
    }

    accountStore.redactingAccount(cleanedAccount)
  }
}
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