import { FieldValidator } from '@/classes/fieldValidator.abstract';

export class PasswordValidator extends FieldValidator<{ type: string; password: string | null }> {
  validate({ type, password }: { type: string; password: string | null }): string {
    if (type !== 'Локальная') return ''
    if (!password) return 'Пароль обязателен'
    if (password.length > 100) return 'Макс. 100 символов'

    return ''
  }
}