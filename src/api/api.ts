import { LOCALE_I18N } from '~/constants/locales'

export const BASE_API_URL = 'https://api.themoviedb.org/3/'
export const BASE_API_URL_V4 = 'https://api.themoviedb.org/4/'

const defaultHeaders = {
  Accept: 'application/json',
  Authorization: `Bearer ${process.env.EXPO_PUBLIC_API_KEY}`,
  'Content-Type': 'application/json',
}

const defaultParams: Record<string, string> = {
  language: LOCALE_I18N,
}

function buildUrl(baseURL: string, path: string, params?: Record<string, unknown>): string {
  const base = baseURL.replace(/\/+$/, '')
  const cleanPath = path.replace(/^\/+/, '')
  const url = new URL(`${base}/${cleanPath}`)

  const allParams = { ...defaultParams, ...params }
  for (const [key, value] of Object.entries(allParams)) {
    if (value !== undefined && value !== null) {
      url.searchParams.set(key, String(value))
    }
  }

  return url.toString()
}

function createApi(baseURL: string) {
  return {
    delete<T>(path: string, options?: { data?: unknown; params?: Record<string, unknown> }) {
      return request<T>(baseURL, 'DELETE', path, options?.data, options?.params)
    },
    get<T>(path: string, options?: { params?: Record<string, unknown> }) {
      return request<T>(baseURL, 'GET', path, undefined, options?.params)
    },
    post<T>(path: string, body?: unknown, options?: { params?: Record<string, unknown> }) {
      return request<T>(baseURL, 'POST', path, body, options?.params)
    },
  }
}

async function request<T>(
  baseURL: string,
  method: string,
  path: string,
  body?: unknown,
  params?: Record<string, unknown>
): Promise<{ data: T }> {
  const url = buildUrl(baseURL, path, params)
  const response = await fetch(url, {
    body: body !== undefined && body !== null ? JSON.stringify(body) : undefined,
    headers: defaultHeaders,
    method,
  })

  if (!response.ok) {
    const errorData = await response.json().catch(() => null)
    const error = new Error(`HTTP ${response.status}`) as Error & {
      response: { data: unknown }
      status: number
    }
    error.status = response.status
    error.response = { data: errorData }
    throw error
  }

  const contentType = response.headers.get('content-type')
  const data: T =
    response.status === 204 || !contentType?.includes('application/json')
      ? (null as T)
      : await response.json()
  return { data }
}

export const api = createApi(BASE_API_URL)
export const apiV4 = createApi(BASE_API_URL_V4)
