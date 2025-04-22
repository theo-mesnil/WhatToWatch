import * as React from 'react'
import type { DimensionValue } from 'react-native'
import type { SvgProps } from 'react-native-svg'

import { theme } from '~/theme'
import type { Color } from '~/theme'

import ArrowBackIcon from './icons/ArrowBack'
import ArrowNextIcon from './icons/ArrowNext'
import BulbIcon from './icons/Bulb'
import BulbFillIcon from './icons/BulbFill'
import CheckFillIcon from './icons/CheckFill'
import ClockFillIcon from './icons/ClockFill'
import CrossIcon from './icons/Cross'
import EmailIcon from './icons/Email'
import ExternalLinkIcon from './icons/ExternalLink'
import EyeIcon from './icons/Eye'
import EyeFillIcon from './icons/EyeFill'
import FlashIcon from './icons/Flash'
import FlashFillIcon from './icons/FlashFill'
import GlobeIcon from './icons/Globe'
import GlobeFillIcon from './icons/GlobeFill'
import GridFillIcon from './icons/GridFill'
import MoreIcon from './icons/More'
import MoreFillIcon from './icons/MoreFill'
import MovieFillIcon from './icons/MovieFill'
import PauseCircleIcon from './icons/PauseCircle'
import PersonFillIcon from './icons/PersonFill'
import PlayIcon from './icons/Play'
import PlayCircleIcon from './icons/PlayCircle'
import SearchIcon from './icons/Search'
import SearchFillIcon from './icons/SearchFill'
import SmileIcon from './icons/Smile'
import StarFillIcon from './icons/StarFill'
import TvFillIcon from './icons/TvFill'

export type IconElement = typeof ArrowBackIcon

export type IconProps = {
  color?: Color
  icon: IconElement
  size?: DimensionValue
}

const Icon: React.FC<IconProps> = ({ color = 'white', icon: IconComponent, size = 24 }) => {
  return (
    <IconComponent
      color={theme.colors[color]}
      height={size as SvgProps['width']}
      width={size as SvgProps['width']}
    />
  )
}

export {
  ArrowBackIcon,
  ArrowNextIcon,
  BulbFillIcon,
  BulbIcon,
  CheckFillIcon,
  ClockFillIcon,
  CrossIcon,
  EmailIcon,
  ExternalLinkIcon,
  EyeFillIcon,
  EyeIcon,
  FlashFillIcon,
  FlashIcon,
  GlobeFillIcon,
  GlobeIcon,
  GridFillIcon,
  Icon,
  MoreFillIcon,
  MoreIcon,
  MovieFillIcon,
  PauseCircleIcon,
  PersonFillIcon,
  PlayCircleIcon,
  PlayIcon,
  SearchFillIcon,
  SearchIcon,
  SmileIcon,
  StarFillIcon,
  TvFillIcon,
}
