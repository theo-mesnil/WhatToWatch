import { useLocalSearchParams } from 'expo-router'
import * as React from 'react'
import { FormattedMessage } from 'react-intl'
import { StyleSheet, View } from 'react-native'

import { useGetPerson, useGetPersonTvCredits } from '~/api/person'
import { ItemThumb } from '~/components/app/person/ItemThumb'
import { ThumbLink } from '~/components/ThumbLink'
import { BasicLayout } from '~/layouts/basic'
import { tvPath } from '~/routes'
import { globalStyles } from '~/styles'
import { theme } from '~/theme'

export default function PersonTv() {
  const params = useLocalSearchParams<{ id: string }>()
  const personID = Number(params?.id)

  const { data, isLoading } = useGetPerson({ id: personID })

  const isActing = data?.department === 'Acting'

  const { data: tv, isLoading: isLoadingTv } = useGetPersonTvCredits({
    id: personID,
    isActing,
  })

  const name = data?.name

  return (
    <BasicLayout
      title={
        <>
          {name}
          <FormattedMessage defaultMessage="'s series" id="NfdtQ8" />
        </>
      }
    >
      {!isLoadingTv && (
        <View style={styles.items}>
          {tv?.map((item, index) => (
            <ThumbLink
              href={tvPath({ id: item.id })}
              isLoading={isLoading}
              key={`tv-${index}-${item.id}`}
            >
              <ItemThumb
                date={item.first_air_date}
                overview={item.overview}
                posterUrl={item.poster_path}
                subtitle={
                  'character' in item ? item.character : 'job' in item ? item.job : undefined
                }
                title={item.name}
                type="tv"
              />
            </ThumbLink>
          ))}
        </View>
      )}
    </BasicLayout>
  )
}

const styles = StyleSheet.create({
  items: {
    gap: theme.space.md,
    ...globalStyles.centered,
  },
})
