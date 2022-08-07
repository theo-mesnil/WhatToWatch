import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { ButtonLoader } from 'components/ButtonLoader';
import { Box, BoxProps } from 'components/Box';
import { Button } from 'components/Button';
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
  const [loading, setLoading] = useState(true);
  const { handleVideoPress, isNetwork } = useVideo({
    id,
    name,
    link,
    platform,
    type
  });
  const color = isNetwork ? getNetworkColor(id) : undefined;
  const logo = isNetwork ? getNetworkLogo(id) : undefined;

  useEffect(() => {
    // avoid glitch
    setTimeout(() => setLoading(false), 0);
  }, []);

  return (
    <Box alignItems="center" my={isNetwork ? -7 : undefined} {...rest}>
      {isNetwork && (
        <Text fontWeight="bold" mb="xxs" variant="subtitle2">
          <FormattedMessage id="playButton.availableOn" />
        </Text>
      )}
      {loading && <ButtonLoader />}
      {!loading && (
        <Button
          alignItems="center"
          backgroundColor={color}
          isCustomChildren={isNetwork}
          onPress={handleVideoPress}
        >
          {isNetwork ? (
            <Icon size={60} icon={logo} />
          ) : (
            <FormattedMessage id="playButton.watchTrailer" />
          )}
        </Button>
      )}
    </Box>
  );
}
