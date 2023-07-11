import axios from 'axios'

import { API_URL } from '../ constants'
import { AuthResponse } from '../models/response/AuthResponse'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('token') as string)}`
  return config
})

$api.interceptors.response.use(
  (config) => {
    return config
  },
  async (error) => {
    const originalRequest = error.config
    if (error.response.status == 401 && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true
      try {
        const response = await axios.post<AuthResponse>(`${API_URL}/auth/refresh-tokens`, {refreshToken: JSON.parse(localStorage.getItem('auth') as string)})
        localStorage.setItem('auth', JSON.stringify(response.data.tokens.refresh.token))
        return $api.request(originalRequest)
      } catch (e) {
        console.log('Not Authorized')
      }
    }
    throw error
  },
)

export default $api
