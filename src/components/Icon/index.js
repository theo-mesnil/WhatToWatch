import React from 'react';
import { useTheme } from 'styled-components/native';

import ArrowBackIcon from './icons/ArrowBack';
import BulbFillIcon from './icons/BulbFill';
import BulbIcon from './icons/Bulb';
import CheckFillIcon from './icons/CheckFill';
import ClockFillIcon from './icons/ClockFill';
import CrossIcon from './icons/Cross';
import EmailIcon from './icons/Email';
import ExternalLinkIcon from './icons/ExternalLink';
import FlashFillIcon from './icons/FlashFill';
import FlashIcon from './icons/Flash';
import GlobeFillIcon from './icons/GlobeFill';
import GlobeIcon from './icons/Globe';
import GridFillIcon from './icons/GridFill';
import LogoAmazonPrime from './icons/LogoAmazonPrime';
import LogoAppleTvPlus from './icons/LogoAppleTvPlus';
import LogoDisneyPlus from './icons/LogoDisneyPlus';
import LogoFox from './icons/LogoFox';
import LogoHbo from './icons/LogoHbo';
import LogoHulu from './icons/LogoHulu';
import LogoNetflix from './icons/LogoNetflix';
import LogoShowtime from './icons/LogoShowtime';
import MoreFillIcon from './icons/MoreFill';
import MoreIcon from './icons/More';
import MovieFillIcon from './icons/MovieFill';
import PauseCircleIcon from './icons/PauseCircle';
import PeopleFillIcon from './icons/PeopleFill';
import PlayCircleIcon from './icons/PlayCircle';
import PlayIcon from './icons/Play';
import SearchFillIcon from './icons/SearchFill';
import SearchIcon from './icons/Search';
import SmileIcon from './icons/Smile';
import StarFillIcon from './icons/StarFill';
import TvFillIcon from './icons/TvFill';
import * as S from './styles';

function Icon({ color = 'light800', icon: IconComponent, size = 24, ...rest }) {
  const theme = useTheme();

  return (
    <S.Icon
      as={IconComponent}
      color={theme.colors[color] || color}
      size={size}
      {...rest}
    />
  );
}

export {
  ArrowBackIcon,
  BulbFillIcon,
  BulbIcon,
  CheckFillIcon,
  ClockFillIcon,
  CrossIcon,
  EmailIcon,
  ExternalLinkIcon,
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
