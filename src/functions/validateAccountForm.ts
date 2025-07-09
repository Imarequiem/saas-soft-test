import type { Account, FormAccount } from '../components/forms/accountForm/types/interfaces/account.interface'

export type FieldName = 'login' | 'password' | 'label' | 'type'

function normalizeLabel(model: Account | FormAccount): string {
  if (typeof model.label === 'string') {
    return model.label
  }

  return model.label.map(tag => tag.text).join(';')
}

function validateLabel(value: string): string {
  const tags = value
    .split(';')
    .map(t => t.trim())
    .filter(Boolean)

  const tooLong = tags.find(tag => tag.length > 50)

  return tooLong
    ? 'Каждая метка не должна превышать 50 символов'
    : ''
}

function validateLogin(value: string): string {
  if (!value.trim()) return 'Логин обязателен'
  else if (value.length > 100) return 'Макс. 100 символов'

  return ''
}

const validatePassword = (type: Account['type'], value: string | null): string => {
  return type !== 'Локальная'
    ? ''
    : !value || value.length === 0
    ? 'Пароль обязателен'
    : value.length > 100
    ? 'Макс. 100 символов'
    : ''
}

export function validate(field: FieldName, model: Account | FormAccount, errors: Record<FieldName, string>) {
  errors[field] = ''

  switch (field) {
    case 'label': {
      const normalized = normalizeLabel(model)
      errors.label = validateLabel(normalized)
      break
    }
    case 'login': {
      errors.login = validateLogin(model.login)
      break
    }
    case 'password': {
      errors.password = validatePassword(model.type, model.password)
      break
    }
  }
}

export const validateType = (model: Account | FormAccount, errors: Record<FieldName, string>) => {
  errors.login = validateLogin(model.login)
  errors.password = validatePassword(model.type, model.password)
}

export function isFormValid(account: FormAccount, errors: Record<FieldName, string>): boolean {
  ;( ['label', 'login', 'password'] as FieldName[] )
    .forEach(field => validate(field, account, errors))

  const noErrors = Object.values(errors).every(msg => !msg)
  const requiredFilled =
    account.login.trim() !== '' &&
    (account.type === 'LDAP' || (account.password || '').length > 0)

  return noErrors && requiredFilled
}