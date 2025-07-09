export default interface inputProps {
  modelValue?: string | number | null
  label?: string
  type?: string
  hideDetails?: boolean
  density?: 'default' | 'comfortable' | 'compact'
  variant?: 'outlined' | 'plain' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'
  color?: string
  error?: boolean
  errorMessages?: string
}
