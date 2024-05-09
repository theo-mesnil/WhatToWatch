export function formatTime(minutes: number) {
  if (minutes < 60) {
    return `${minutes}min`;
  }

  if (minutes === 60) {
    return '1h';
  }

  const hours = Math.floor(minutes / 60);

  return `${hours}h${minutes - 60 * hours}m`;
}
