import { FieldValidator } from "@/classes/fieldValidator.abstract"

export class LoginValidator extends FieldValidator<string> {
  validate(login: string): string {
    if (!login.trim()) return 'Логин обязателен'
    if (login.length > 100) return 'Макс. 100 символов'

    return ''
  }
}
