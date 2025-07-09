import { FieldValidator } from "@/classes/fieldValidator.abstract"

export class LabelValidator extends FieldValidator<string> {
  validate(raw: string): string {
    const tags = raw.split(';').map(t => t.trim()).filter(Boolean)
    const tooLong = tags.find(t => t.length > 50)

    if (tooLong) return 'Каждая метка не должна превышать 50 символов'

    return ''
  }
}
