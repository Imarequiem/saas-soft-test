export default interface buttonProps {
  variant?: 'outlined' | 'plain' | 'flat' | 'text' | 'elevated' | 'tonal'
  size?: 'x-small' | 'small' | 'regular' | 'large' | 'x-large'
  color?: string
  density?: 'default' | 'comfortable' | 'compact'
  title?: string
  icon?: string
  rounded?: boolean
  iconColor?: string
  iconFz?: number
}