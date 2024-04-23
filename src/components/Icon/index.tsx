import * as React from 'react';
import type { DimensionValue } from 'react-native';
import { theme } from 'theme';
import type { Color } from 'theme/colors';

import ArrowBackIcon from './icons/ArrowBack';
import BulbIcon from './icons/Bulb';
import BulbFillIcon from './icons/BulbFill';
import CheckFillIcon from './icons/CheckFill';
import ClockFillIcon from './icons/ClockFill';
import CrossIcon from './icons/Cross';
import EmailIcon from './icons/Email';
import ExternalLinkIcon from './icons/ExternalLink';
import EyeIcon from './icons/Eye';
import EyeFillIcon from './icons/EyeFill';
import FlashIcon from './icons/Flash';
import FlashFillIcon from './icons/FlashFill';
import GlobeIcon from './icons/Globe';
import GlobeFillIcon from './icons/GlobeFill';
import GridFillIcon from './icons/GridFill';
import LogoAmazonPrime from './icons/LogoAmazonPrime';
import LogoAppleTvPlus from './icons/LogoAppleTvPlus';
import LogoDisneyPlus from './icons/LogoDisneyPlus';
import LogoFox from './icons/LogoFox';
import LogoHbo from './icons/LogoHbo';
import LogoHulu from './icons/LogoHulu';
import LogoNetflix from './icons/LogoNetflix';
import LogoShowtime from './icons/LogoShowtime';
import MoreIcon from './icons/More';
import MoreFillIcon from './icons/MoreFill';
import MovieFillIcon from './icons/MovieFill';
import PauseCircleIcon from './icons/PauseCircle';
import PeopleFillIcon from './icons/PeopleFill';
import PlayIcon from './icons/Play';
import PlayCircleIcon from './icons/PlayCircle';
import SearchIcon from './icons/Search';
import SearchFillIcon from './icons/SearchFill';
import SmileIcon from './icons/Smile';
import StarFillIcon from './icons/StarFill';
import TvFillIcon from './icons/TvFill';

export type IconElement =
  | typeof StarFillIcon
  | typeof TvFillIcon
  | typeof ArrowBackIcon
  | typeof BulbFillIcon
  | typeof BulbIcon
  | typeof CheckFillIcon
  | typeof ClockFillIcon
  | typeof CrossIcon
  | typeof EmailIcon
  | typeof ExternalLinkIcon
  | typeof FlashFillIcon
  | typeof FlashIcon
  | typeof GlobeFillIcon
  | typeof GlobeIcon
  | typeof GridFillIcon
  | typeof LogoAmazonPrime
  | typeof LogoAppleTvPlus
  | typeof LogoDisneyPlus
  | typeof LogoFox
  | typeof LogoHbo
  | typeof LogoHulu
  | typeof LogoNetflix
  | typeof LogoShowtime
  | typeof MoreFillIcon
  | typeof MoreIcon
  | typeof MovieFillIcon
  | typeof PauseCircleIcon
  | typeof PeopleFillIcon
  | typeof PlayCircleIcon
  | typeof PlayIcon
  | typeof SearchFillIcon
  | typeof SearchIcon
  | typeof SmileIcon
  | typeof StarFillIcon
  | typeof TvFillIcon;

export type IconProps = {
  color?: Color;
  icon: IconElement;
  size?: DimensionValue;
};

const Icon: React.FC<IconProps> = ({
  color = 'white',
  icon: IconComponent,
  size = 24
}) => {
  return (
    <IconComponent
      color={theme.colors[color]}
      style={{
        width: size,
        height: size
      }}
    />
  );
};

export {
  ArrowBackIcon,
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
  LogoAmazonPrime,
  LogoAppleTvPlus,
  LogoDisneyPlus,
  LogoFox,
  LogoHbo,
  LogoHulu,
  LogoNetflix,
  LogoShowtime,
  MoreFillIcon,
  MoreIcon,
  MovieFillIcon,
  PauseCircleIcon,
  PeopleFillIcon,
  PlayCircleIcon,
  PlayIcon,
  SearchFillIcon,
  SearchIcon,
  SmileIcon,
  StarFillIcon,
  TvFillIcon
};
