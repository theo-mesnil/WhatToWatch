import type { IconProps } from '~/components/icon'

export function getReviewRatingIcon(rating: number): IconProps['name'] {
  if (rating <= 3) return 'sad-outline'
  if (rating >= 7) return 'happy-outline'
  if (rating === 10) return 'heart-circle'
  return 'star'
}

export function getReviewRatingVariant(rating: number): 'vote' | 'vote-high' | 'vote-low' {
  if (rating <= 3) return 'vote-low'
  if (rating >= 7) return 'vote-high'
  return 'vote'
}
