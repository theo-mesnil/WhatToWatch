import { StyleSheet, View } from 'react-native'

import { globalStyles } from '~/styles'
import { theme } from '~/theme'

import { FavoriteButton } from '../FavoriteButton'
import { WatchlistButton } from '../WatchlistButton'

type ActionsProps = {
  id: number
  type: 'movie' | 'tv'
}

export function Actions({ id, type }: ActionsProps) {
  return (
    <View style={[styles.actionButton, globalStyles.centered]}>
      <WatchlistButton id={id} type={type} />
      <FavoriteButton id={id} type={type} />
    </View>
  )
}

const styles = StyleSheet.create({
  actionButton: {
    flexDirection: 'row',
    gap: theme.space.md,
    justifyContent: 'center',
    marginBottom: theme.space.xl,
  },
})
