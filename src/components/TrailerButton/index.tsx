import { FormattedMessage } from 'react-intl';
import { theme } from 'theme';

import type { ButtonProps } from 'components/Button';
import { Button } from 'components/Button';
import { Icon, PlayCircleIcon } from 'components/Icon';
import { Text } from 'components/Text';
import { getVideo } from 'utils/videos';

export type TrailerButtonProps = Pick<ButtonProps, 'style'> & {
  id: string;
  platform: string;
};

export function TrailerButton({ id, platform, style }: TrailerButtonProps) {
  const { handlePress } = getVideo({ id, platform });

  return (
    <Button
      size="lg"
      gradientColors={[
        theme.colors['default-500'],
        theme.colors['default-700']
      ]}
      onPress={handlePress}
      style={style}
      isCustomChildren
    >
      <Text variant="h3">
        <FormattedMessage defaultMessage="Watch the trailer" key="title" />
      </Text>
      <Icon icon={PlayCircleIcon} size={28} color="default-100" />
    </Button>
  );
}
