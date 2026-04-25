import { FormattedMessage } from 'react-intl'

import type { ButtonProps } from '~/components/new/button'
import { Button } from '~/components/new/button'
import { getVideo } from '~/utils/videos'

export type TrailerButtonProps = Pick<ButtonProps, 'className'> & {
  id: string
  platform: string
}

export function TrailerButton({ className, id, platform }: TrailerButtonProps) {
  const { handlePress } = getVideo({ id, platform })

  return (
    <Button
      className={className}
      icon="play-circle"
      onPress={() => handlePress()}
      size="lg"
      withHaptic
    >
      <FormattedMessage defaultMessage="Watch the trailer" id="wLlKjy" />
    </Button>
  )
}
