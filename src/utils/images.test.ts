import { getImageUrl } from './images';

describe('Images utils', () => {
  test('getImageUrl', () => {
    expect(getImageUrl('image-url.png')).toBe(
      'https://image.tmdb.org/t/p/w185image-url.png'
    );
    expect(getImageUrl('image-url.png', 'w1280')).toBe(
      'https://image.tmdb.org/t/p/w1280image-url.png'
    );
  });
});
