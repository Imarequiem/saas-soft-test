export default interface SelectProps {
  items: Array<unknown>
  label: string
  hideDetails?: boolean
  color?: string
  variant?: 'outlined' | 'plain' | 'filled' | 'underlined' | 'solo' | 'solo-inverted' | 'solo-filled'
  density?: 'default' | 'comfortable' | 'compact'
  height?: string
}