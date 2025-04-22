import { FormattedMessage } from 'react-intl'

import type { ButtonProps } from '~/components/Button'
import { Button } from '~/components/Button'
import { Icon, PlayCircleIcon } from '~/components/Icon'
import { Text } from '~/components/Text'
import { theme } from '~/theme'
import { getVideo } from '~/utils/videos'

export type TrailerButtonProps = Pick<ButtonProps, 'style'> & {
  id: string
  platform: string
}

export function TrailerButton({ id, platform, style }: TrailerButtonProps) {
  const { handlePress } = getVideo({ id, platform })

  return (
    <Button
      gradientColors={[theme.colors['default-500'], theme.colors['default-700']]}
      isCustomChildren
      onPress={() => handlePress()}
      size="lg"
      style={style}
    >
      <Text variant="h3">
        <FormattedMessage defaultMessage="Watch the trailer" id="wLlKjy" />
      </Text>
      <Icon color="default-100" icon={PlayCircleIcon} size={28} />
    </Button>
  )
}
