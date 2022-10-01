import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { Box, BoxProps } from 'components/Box';
import { Button } from 'components/Button';
import { ButtonLoader } from 'components/ButtonLoader';
import { Icon } from 'components/Icon';
import { Text } from 'components/Text';
import { getNetworkColor, getNetworkLogo } from 'utils/networks';
import { useVideo } from 'utils/videos';

type PlayButtonProps = BoxProps & {
  id: NetworkId;
  link: string;
  name?: string;
  platform?: Platform;
  type: string;
};

export function PlayButton({
  id,
  link,
  name,
  platform,
  type,
  ...rest
}: PlayButtonProps) {
  const [loading, setLoading] = React.useState(true);
  const { handleVideoPress, isNetwork } = useVideo({
    id,
    name,
    link,
    platform,
    type
  });
  const color = isNetwork ? getNetworkColor(id) : undefined;
  const logo = isNetwork ? getNetworkLogo(id) : undefined;
  const isAppleTv = isNetwork && id === 2552;

  React.useEffect(() => {
    // avoid glitch
    setTimeout(() => setLoading(false), 0);
  }, []);

  return (
    <Box alignItems="center" {...rest}>
      {isNetwork && (
        <Text fontWeight="bold" mb="xxs" variant="subtitle2">
          <FormattedMessage id="playButton.availableOn" />
        </Text>
      )}
      {loading && <ButtonLoader />}
      {!loading && (
        <Button
          backgroundColor={color}
          isCustomChildren={isNetwork}
          onPress={handleVideoPress}
        >
          {isNetwork ? (
            <Icon
              size={60}
              color={isAppleTv ? 'dark900' : 'light900'}
              icon={logo}
            />
          ) : (
            <FormattedMessage id="playButton.watchTrailer" />
          )}
        </Button>
      )}
    </Box>
  );
}
