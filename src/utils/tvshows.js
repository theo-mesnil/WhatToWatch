export function formatTvShowSubtitle(airDate, status) {
  const { first, last } = airDate;
  const isFinished = status === 'Canceled' || status === 'Ended';
  const firstDateYear = first ? new Date(first).getFullYear() : undefined;
  const lastDateYear =
    last && isFinished ? new Date(last).getFullYear() : undefined;

  return `${status} ${(!!firstDateYear || !!lastDateYear) && '-'} ${
    firstDateYear ?? ''
  }${lastDateYear ? ' > ' : ''}${lastDateYear ?? ''}`;
}
