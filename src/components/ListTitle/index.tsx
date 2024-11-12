import type { Href } from 'expo-router';
import { Link } from 'expo-router';
import { FormattedMessage } from 'react-intl';
import type { TextProps as RNTextProps } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { theme } from 'theme';

import { Icon } from 'components/Icon';
import { Text } from 'components/Text';
import { Touchable } from 'components/Touchable';

export type ListTitleProps = {
  children: React.ReactElement | string;
  style?: RNTextProps['style'];
  titleHref?: Href;
};

export function ListTitle({ children, style, titleHref }: ListTitleProps) {
  const element = (
    <Text variant="h2" style={[style, styles.title]}>
      {children}
    </Text>
  );

  if (titleHref) {
    return (
      <View
        style={[
          styles.title,
          styles.titleHref,
          { paddingRight: theme.space.marginList }
        ]}
      >
        {element}
        <Link href={titleHref} asChild>
          <Touchable>
            <View style={styles.moreWrapper}>
              <Text variant="lg" style={styles.moreText}>
                <FormattedMessage key="all-link" defaultMessage="More" />
              </Text>
              <Icon color="brand-100" size={20} name="ArrowRight" />
            </View>
          </Touchable>
        </Link>
      </View>
    );
  }

  return element;
}

const styles = StyleSheet.create({
  title: {
    marginBottom: theme.space.xs
  },
  titleHref: {
    flexDirection: 'row',
    gap: theme.space.xs,
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  moreWrapper: {
    gap: theme.space.xxs,
    flexDirection: 'row',
    alignItems: 'center'
  },
  moreText: {
    color: theme.colors['brand-100']
  }
});
