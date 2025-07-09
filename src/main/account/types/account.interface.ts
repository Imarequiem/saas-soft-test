export interface FormAccount {
  label: string
  type: 'Локальная' | 'LDAP'
  login: string
  password: string | null
  id: number
}

export interface Account {
  label: { text: string }[]
  type: 'Локальная' | 'LDAP'
  login: string
  password: string | null
  id: number
}