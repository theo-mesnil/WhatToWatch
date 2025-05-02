import * as Haptics from 'expo-haptics'
import * as React from 'react'
import { StyleSheet, View } from 'react-native'
import type { ViewProps } from 'react-native'

import type { IconProps } from '~/components/Icon'
import { Icon } from '~/components/Icon'
import type { TouchableProps } from '~/components/Touchable'
import { Touchable } from '~/components/Touchable'
import { theme } from '~/theme'

export type IconButtonProps = ViewProps & {
  icon: IconProps['name']
  isActive?: boolean
  onPress: TouchableProps['onPress']
}

export const IconButton = React.forwardRef<never, IconButtonProps>(
  ({ children, icon, isActive, onPress, style = {}, testID, ...rest }, ref) => {
    function handleOnPress(event) {
      if (onPress) {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Soft)
        onPress(event)
      }
    }

    return (
      <Touchable onPress={handleOnPress} ref={ref} testID={testID}>
        <View style={[styles.wrapper, isActive && styles.active, style]} {...rest}>
          {icon && <Icon color="white" name={icon} size={26} />}
        </View>
      </Touchable>
    )
  }
)

IconButton.displayName = 'IconButton'

const styles = StyleSheet.create({
  active: {
    backgroundColor: theme.colors['brand-700'],
  },
  wrapper: {
    alignItems: 'center',
    backgroundColor: theme.colors['default-700'],
    borderRadius: 50,
    flexDirection: 'row',
    gap: theme.space.xs,
    height: 50,
    justifyContent: 'center',
    overflow: 'hidden',
    paddingHorizontal: theme.space.lg,
    width: 50,
  },
})
