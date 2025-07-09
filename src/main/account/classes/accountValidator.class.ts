import { LabelValidator } from '@/main/account/validators/labelValidator.ts'
import { LoginValidator } from '@/main/account/validators/loginValidator.ts'
import { PasswordValidator } from '@/main/account/validators/passwordValidator.ts'

import type { FormAccount } from '@/main/account/types/account.interface.ts'
import type { ValidationErrors } from '@/main/account/types/validationErrors.type.ts'

export class AccountValidator {
  private labelV = new LabelValidator()
  private loginV = new LoginValidator()
  private passV  = new PasswordValidator()

  validateAll(data: FormAccount): ValidationErrors {
    return {
      label: this.labelV.validate(data.label),
      login: this.loginV.validate(data.login),
      password: this.passV.validate({
        type: data.type,
        password: data.password
      }),
    }
  }

  isValid(data: FormAccount): boolean {
    const errs = this.validateAll(data)

    return Object.values(errs).every(e => !e)
  }
}