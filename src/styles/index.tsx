import { StyleSheet } from 'react-native'

import { theme } from 'theme'

export const globalStyles = StyleSheet.create({
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  centered: {
    marginHorizontal: theme.space.marginList,
  },
})
