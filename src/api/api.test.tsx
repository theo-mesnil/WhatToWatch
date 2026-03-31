import { api, apiV4, BASE_API_URL, BASE_API_URL_V4 } from '~/api/api'

const mockFetch = jest.fn()
global.fetch = mockFetch

beforeEach(() => {
  mockFetch.mockReset()
})

describe('api', () => {
  describe('get', () => {
    test('should call fetch with correct url and method', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ id: 1, title: 'Test' }),
        ok: true,
      })

      const { data } = await api.get('movie/123')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`${BASE_API_URL}movie/123`),
        expect.objectContaining({
          headers: expect.objectContaining({
            Authorization: expect.any(String),
          }),
          method: 'GET',
        })
      )
      expect(data).toEqual({ id: 1, title: 'Test' })
    })

    test('should include default language param', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({}),
        ok: true,
      })

      await api.get('movie/123')

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).toContain('language=')
    })

    test('should merge custom params', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({}),
        ok: true,
      })

      await api.get('movie/123', { params: { page: 2, region: 'US' } })

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).toContain('page=2')
      expect(calledUrl).toContain('region=US')
    })

    test('should skip null and undefined params', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({}),
        ok: true,
      })

      await api.get('movie/123', { params: { page: null, region: undefined } })

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).not.toContain('page')
      expect(calledUrl).not.toContain('region')
    })
  })

  describe('post', () => {
    test('should send JSON body', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ success: true }),
        ok: true,
      })

      const body = { favorite: true, media_id: 1 }
      const { data } = await api.post('account/1/favorite', body)

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`${BASE_API_URL}account/1/favorite`),
        expect.objectContaining({
          body: JSON.stringify(body),
          method: 'POST',
        })
      )
      expect(data).toEqual({ success: true })
    })

    test('should not send body when undefined', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({}),
        ok: true,
      })

      await api.post('auth/request_token')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          body: undefined,
          method: 'POST',
        })
      )
    })

    test('should include params', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({}),
        ok: true,
      })

      await api.post('account/1/favorite', {}, { params: { session_id: 'abc' } })

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).toContain('session_id=abc')
    })
  })

  describe('delete', () => {
    test('should send DELETE request with body', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ success: true }),
        ok: true,
      })

      const { data } = await api.delete('auth/access_token', {
        data: { access_token: 'token123' },
      })

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining(`${BASE_API_URL}auth/access_token`),
        expect.objectContaining({
          body: JSON.stringify({ access_token: 'token123' }),
          method: 'DELETE',
        })
      )
      expect(data).toEqual({ success: true })
    })
  })

  describe('error handling', () => {
    test('should throw on non-ok response with status and error data', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({ status_message: 'Not Found' }),
        ok: false,
        status: 404,
      })

      try {
        await api.get('movie/999')
        fail('Should have thrown')
      } catch (error) {
        expect(error.message).toBe('HTTP 404')
        expect(error.status).toBe(404)
        expect(error.response).toEqual({ data: { status_message: 'Not Found' } })
      }
    })

    test('should handle non-JSON error response', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => {
          throw new Error('not json')
        },
        ok: false,
        status: 500,
      })

      try {
        await api.get('movie/999')
        fail('Should have thrown')
      } catch (error) {
        expect(error.message).toBe('HTTP 500')
        expect(error.status).toBe(500)
        expect(error.response).toEqual({ data: null })
      }
    })
  })

  describe('apiV4', () => {
    test('should use v4 base URL', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({}),
        ok: true,
      })

      await apiV4.get('auth/request_token')

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).toContain(BASE_API_URL_V4)
    })
  })

  describe('url building', () => {
    test('should handle path with leading slash', async () => {
      mockFetch.mockResolvedValueOnce({
        json: async () => ({}),
        ok: true,
      })

      await api.get('/movie/123')

      const calledUrl = mockFetch.mock.calls[0][0]
      expect(calledUrl).toContain(`${BASE_API_URL}movie/123`)
      expect(calledUrl).not.toContain('//movie')
    })
  })
})
