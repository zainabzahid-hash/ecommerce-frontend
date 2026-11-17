import axios from 'axios'
import { ApiError } from './apiError.js'

// one axios instance for the whole app
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: { 'Content-Type': 'application/json' },
})

// runs before EVERY request
api.interceptors.request.use((config) => {
  // later: attach the auth token here
  return config
})

// runs after EVERY response
api.interceptors.response.use(
  // success: return only the body, so callers get { data, meta } directly
  (response) => response.data,
  // failure: turn any error into an ApiError with a readable message
  (error) =>
    Promise.reject(
      new ApiError(
        error.response?.data?.message || error.message || 'Something went wrong',
        { status: error.response?.status, data: error.response?.data },
      ),
    ),
)

export default api