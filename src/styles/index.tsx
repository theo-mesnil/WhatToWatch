import { StyleSheet } from 'react-native'

import { theme } from '~/theme'

export const globalStyles = StyleSheet.create({
  absoluteFill: {
    bottom: 0,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
  },
  centered: {
    marginHorizontal: theme.space.marginList,
  },
})
