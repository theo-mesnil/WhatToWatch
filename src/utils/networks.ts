import {
  LogoAmazonPrime,
  LogoAppleTvPlus,
  LogoDisneyPlus,
  LogoFox,
  LogoHbo,
  LogoHulu,
  LogoNetflix,
  LogoShowtime
} from 'components/Icon';
import type { NetworkId } from 'types/content';

export function getNetworkLogo(id: NetworkId) {
  switch (id) {
    case 213:
      return LogoNetflix;
    case 1024:
      return LogoAmazonPrime;
    case 49:
      return LogoHbo;
    case 2739:
      return LogoDisneyPlus;
    case 2552:
      return LogoAppleTvPlus;
    case 453:
      return LogoHulu;
    case 67:
      return LogoFox;
    case 19:
      return LogoShowtime;
    default:
      return null;
  }
}

export function getNetworkName(id: NetworkId) {
  switch (id) {
    case 213:
      return 'Netflix';
    case 1024:
      return 'Prime Video';
    case 49:
      return 'HBO';
    case 2739:
      return 'Disney +';
    case 2552:
      return 'Apple Tv +';
    case 453:
      return 'Hulu';
    case 67:
      return 'Fox';
    case 19:
      return 'Showtime';
    default:
      return null;
  }
}

export function getNetworkColor(id?: NetworkId): [string, string] {
  switch (id) {
    case 213:
      return ['#E50914', '#72050a'];
    case 1024:
      return ['#1C97FE', '#014d8c'];
    case 49:
      return ['#7B2ABF', '#3d155f'];
    case 2739:
      return ['#049FAA', '#013945'];
    case 2552:
      return ['#323232', '#181818'];
    case 453:
      return ['#1EE783', '#0d7641'];
    case 67:
      return ['#0086BD', '#00435e'];
    case 19:
      return ['#FF1928', '#8c0009'];
    default:
      return ['#323232', '#181818'];
  }
}

export function getNetworkFromUrl(url: string) {
  let network;

  if (url.includes('netflix.com')) {
    network = 213;
  }
  if (url.includes('amazon.com')) {
    network = 1024;
  }
  if (url.includes('hbomax.com') || url.includes('hbo.com')) {
    network = 49;
  }
  if (url.includes('disney.com') || url.includes('disneyplus')) {
    network = 2739;
  }
  if (url.includes('apple.com')) {
    network = 2552;
  }
  if (url.includes('hulu.com')) {
    network = 453;
  }
  if (url.includes('fox.com')) {
    network = 67;
  }
  if (url.includes('showtime.com')) {
    network = 19;
  }

  return network;
}
