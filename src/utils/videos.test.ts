import { getVideo } from './videos';

describe('Videos utils', () => {
  test('getVideo for unknown platform', () => {
    const { imageUrl, isYoutube } = getVideo({ id: '1', platform: 'unknown' });
    expect(imageUrl).toBe('https://i.vimeocdn.com/video/1_640.jpg');
    expect(isYoutube).toBe(false);
  });

  test('getVideo for vimeo platform', () => {
    const { imageUrl, isYoutube } = getVideo({ id: '1', platform: 'vimeo' });
    expect(imageUrl).toBe('https://i.vimeocdn.com/video/1_640.jpg');
    expect(isYoutube).toBe(false);
  });

  test('getVideo for youtube platform', () => {
    const { imageUrl, isYoutube } = getVideo({ id: '1', platform: 'YouTube' });
    expect(imageUrl).toBe('https://i.ytimg.com/vi/1/hqdefault.jpg');
    expect(isYoutube).toBe(true);
  });
});
