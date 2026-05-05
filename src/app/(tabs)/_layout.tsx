import Ionicons from '@expo/vector-icons/Ionicons'
import { NativeTabs } from 'expo-router/unstable-native-tabs'
import * as React from 'react'
import { useIntl } from 'react-intl'
import { useCSSVariable } from 'uniwind'

export default function Layout() {
  const intl = useIntl()

  const backgroundColor = useCSSVariable('--color-foreground')?.toString()
  const color = useCSSVariable('--native-tabs-color')?.toString()
  const iconColor = useCSSVariable('--native-tabs-icon-color')?.toString()
  const tintColor = useCSSVariable('--native-tabs-tint-color')?.toString()
  const rippleColor = useCSSVariable('--native-tabs-ripple-color')?.toString()
  const indicatorColor = useCSSVariable('--native-tabs-indicator-color')?.toString()

  return (
    <NativeTabs
      backgroundColor={backgroundColor}
      disableTransparentOnScrollEdge
      iconColor={iconColor}
      indicatorColor={indicatorColor}
      labelStyle={{ color, fontFamily: 'Poppins_400Regular' }}
      labelVisibilityMode="labeled"
      rippleColor={rippleColor}
      tintColor={tintColor}
    >
      <NativeTabs.Trigger name="index">
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={Ionicons} name="sparkles" />}
        />
        <NativeTabs.Trigger.Label>
          {intl.formatMessage({
            defaultMessage: 'Discover',
            id: 'cE4Hfw',
          })}
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="search">
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={Ionicons} name="search" />}
        />
        <NativeTabs.Trigger.Label>
          {intl.formatMessage({
            defaultMessage: 'Search',
            id: 'xmcVZ0',
          })}
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="streaming">
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={Ionicons} name="easel" />}
        />
        <NativeTabs.Trigger.Label>
          {intl.formatMessage({
            defaultMessage: 'Streaming',
            id: 'NCupKV',
          })}
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
      <NativeTabs.Trigger name="me">
        <NativeTabs.Trigger.Icon
          src={<NativeTabs.Trigger.VectorIcon family={Ionicons} name="file-tray-full" />}
        />
        <NativeTabs.Trigger.Label>
          {intl.formatMessage({
            defaultMessage: 'My lists',
            id: 'n82YXC',
          })}
        </NativeTabs.Trigger.Label>
      </NativeTabs.Trigger>
    </NativeTabs>
  )
}
