import { ApiError } from './apiError.js'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''

export async function apiRequest(path, options = {}) {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers: {
      ...(options.body && !(options.body instanceof FormData)
        ? { 'Content-Type': 'application/json' }
        : {}),
      ...options.headers,
    },
  })

  const contentType = response.headers.get('content-type') ?? ''
  const data = contentType.includes('application/json')
    ? await response.json()
    : await response.text()

  if (!response.ok) {
    throw new ApiError(data?.message ?? response.statusText, {
      status: response.status,
      data,
    })
  }

  return data
}
