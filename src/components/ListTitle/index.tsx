import type { Href } from 'expo-router'
import { Link } from 'expo-router'
import { FormattedMessage } from 'react-intl'
import type { TextProps as RNTextProps } from 'react-native'
import { StyleSheet, View } from 'react-native'

import { ArrowNextIcon, Icon } from '~/components/Icon'
import { Text } from '~/components/Text'
import { Touchable } from '~/components/Touchable'
import { theme } from '~/theme'

export type ListTitleProps = {
  children: React.ReactElement | string
  style?: RNTextProps['style']
  titleHref?: Href
}

export function ListTitle({ children, style, titleHref }: ListTitleProps) {
  const element = (
    <Text style={[style, styles.title]} variant="h2">
      {children}
    </Text>
  )

  if (titleHref) {
    return (
      <View style={[styles.title, styles.titleHref, { paddingRight: theme.space.marginList }]}>
        {element}
        <Link asChild href={titleHref}>
          <Touchable>
            <View style={styles.moreWrapper}>
              <Text style={styles.moreText} variant="lg">
                <FormattedMessage defaultMessage="More" id="I5NMJ8" />
              </Text>
              <Icon color="brand-100" icon={ArrowNextIcon} size={20} />
            </View>
          </Touchable>
        </Link>
      </View>
    )
  }

  return element
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
    marginBottom: theme.space.xs,
  },
  titleHref: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.space.xs,
    justifyContent: 'space-between',
  },
})
