import type { Account, FormAccount } from '@/main/account/types/account.interface'

export class AccountClass {
  private data: Account

  private constructor(data: Account) {
    this.data = data
  }

  static createNew(): AccountClass {
    return new AccountClass({
      id: Date.now(),
      label: [],
      type: 'Локальная',
      login: '',
      password: null,
    })
  }

  static fromJSON(raw: any): AccountClass {
    const labels = Array.isArray(raw.label)
      ? raw.label
      : raw.label
          .split(';')
          .map((t: string) => ({ text: t.trim() }))
          .filter((t: any) => t.text.length > 0)

    return new AccountClass({
      id: raw.id,
      label: labels,
      type: raw.type,
      login: raw.login,
      password: raw.password,
    })
  }

  toJSON(): Account {
    return { ...this.data }
  }

  toForm(): FormAccount {
    return {
      id: this.data.id,
      type: this.data.type,
      login: this.data.login,
      password: this.data.password,
      label: this.data.label.map(t => t.text).join(';'),
    }
  }

  applyForm(form: FormAccount) {
    this.data.label = form.label
      .split(';')
      .map(t => ({ text: t.trim() }))
      .filter(t => t.text.length > 0)
    this.data.type  = form.type
    this.data.login  = form.login
    this.data.password = form.password
  }

  get id() {
    return this.data.id;
  }

  getData(): Account {
    return this.data;
  }
}