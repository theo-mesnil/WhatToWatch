import { Text } from '~/components/new/text'

type TitleProps = {
  children: React.ReactNode
  className?: string
  variant?: 'lg' | 'md'
}

export const Title = ({ children, className = '', variant = 'md' }: TitleProps) => {
  const variants = {
    lg: 'text-3xl',
    md: 'text-lg',
  }

  return (
    <Text className={`${variants[variant]} font-bold ${className}`} numberOfLines={1}>
      {children}
    </Text>
  )
}
