import type { Href } from 'expo-router'
import { Link } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import type { ViewProps } from 'react-native'
import { StyleSheet, View } from 'react-native'

import type { IconProps } from '~/components/Icon'
import { Icon } from '~/components/Icon'
import { Text } from '~/components/Text'
import { Touchable } from '~/components/Touchable'
import { theme } from '~/theme'

export type ListTitleProps = {
  children: React.ReactElement | string
  icon?: IconProps['name']
  style?: ViewProps['style']
  titleHref?: Href
}

export function ListTitle({ children, icon, style, titleHref }: ListTitleProps) {
  return (
    <View style={[style, styles.title, titleHref && styles.titleHref]}>
      {icon && <Icon name={icon} size={20} />}
      <Text variant="h2">{children}</Text>
      {titleHref && (
        <Link asChild href={titleHref}>
          <Touchable>
            <View style={styles.moreWrapper}>
              <Text style={styles.moreText} variant="lg">
                <FormattedMessage defaultMessage="More" id="I5NMJ8" />
              </Text>
              <Icon color="brand-100" name="arrow-right" size={20} />
            </View>
          </Touchable>
        </Link>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  moreText: {
    color: theme.colors['brand-100'],
  },
  moreWrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.xxs,
  },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.xs,
    marginBottom: theme.space.xs,
  },
  titleHref: {
    justifyContent: 'space-between',
  },
})
