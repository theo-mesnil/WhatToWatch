import { FormattedMessage } from 'react-intl'

import type { ButtonProps } from '~/components/button'
import { Button } from '~/components/button'
import { getVideo } from '~/utils/videos'

type TrailerButtonProps = Pick<ButtonProps, 'className' | 'size'> & {
  id: string
  platform: string
}

export function TrailerButton({ className = '', id, platform, size }: TrailerButtonProps) {
  const { handlePress } = getVideo({ id, platform })

  return (
    <Button
      className={className}
      icon="play-circle"
      onPress={() => handlePress()}
      size={size}
      withHaptic
    >
      <FormattedMessage defaultMessage="Watch the trailer" id="wLlKjy" />
    </Button>
  )
}
