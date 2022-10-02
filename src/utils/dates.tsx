import {
  isPast as DFNSisPast,
  isToday as DFNSisToday,
  isTomorrow as DFNSisTomorrow,
  isYesterday as DFNSisYesterday,
  format
} from 'date-fns';
import { enGB as en, fr } from 'date-fns/locale';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';

import { useLocale } from 'contexts/locales';

const dateFnsLocales = { en, fr };

export function useDateFnsLocale() {
  const { locale } = useLocale();

  return dateFnsLocales[locale];
}

export function convertMinToHours(number: number): string {
  const hours = number / 60;
  const rHours = Math.floor(hours);
  const minutes = (hours - rHours) * 60;
  const rMinutes = Math.round(minutes);
  const formatMinutes = rMinutes < 10 ? `0${rMinutes}` : rMinutes;
  const formatHour = `${rHours}h`;

  if (rHours === 0 && rMinutes !== 0) {
    return `${formatMinutes}m`;
  } else if (rMinutes === 0 && rHours !== 0) {
    return formatHour;
  } else {
    return formatHour + formatMinutes;
  }
}

export function convertArrayToMinutes(numbers: number[]): string {
  const allNumber = numbers.reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );

  return `~${Math.round(allNumber / numbers?.length)}min`;
}

export function useFormatReleasedDate() {
  const dateFnsLocale = useDateFnsLocale();

  function formatReleasedDate(
    date: string,
    noReleasedPast?: boolean
  ): React.ReactNode {
    const newDate = new Date(date);
    const isToday = DFNSisToday(newDate);
    const isYesterday = DFNSisYesterday(newDate);
    const isPast = DFNSisPast(newDate);
    const isTomorrow = DFNSisTomorrow(newDate);
    const todayWords = format(newDate, 'PPP', { locale: dateFnsLocale });

    if (isPast) {
      if (isYesterday) {
        return <FormattedMessage id="dates.releasedYesterday" />;
      } else {
        return noReleasedPast ? (
          todayWords
        ) : (
          <FormattedMessage id="dates.released" values={{ date: todayWords }} />
        );
      }
    } else if (isToday) {
      return <FormattedMessage id="dates.releasedToday" />;
    } else if (isTomorrow) {
      return <FormattedMessage id="dates.releasedTomorrow" />;
    } else {
      return (
        <FormattedMessage id="dates.coming" values={{ date: todayWords }} />
      );
    }
  }

  return formatReleasedDate;
}
