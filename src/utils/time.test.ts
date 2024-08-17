import { formatTime } from './time';

describe('Time utils', () => {
  test('formatTime', () => {
    expect(formatTime(10)).toBe('10min');
    expect(formatTime(60)).toBe('1h');
    expect(formatTime(78)).toBe('1h18m');
  });
});
